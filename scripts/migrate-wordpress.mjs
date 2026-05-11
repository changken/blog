import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://changken.org/wp-json/wp/v2';
const SITE_BASE = 'https://changken.org';
const ASSET_BASE = 'https://assets.changken.org';
const OUT_DIR = path.resolve('src/content/blog');
const IMAGE_DIR = path.resolve('public/uploads/wp');
const MANIFEST_PATH = path.resolve('src/content/blog/wp-migration-manifest.json');

const CURATED_SLUGS = new Set([
	'aws-certified-cloud-practitioner-%e9%80%9a%e9%81%8e',
	'azure-fundamental-az-900-pass',
	'aws-saa-c03-pass',
	'microsoft-sc-900-pass',
	'aws-aif-c01-pass',
	'aws-dva-passed',
	'%e9%96%8b%e7%ae%b1%e6%8a%80%e5%98%89-gigabyte-g5-mf-e2tw333sh-%e9%9b%bb%e7%ab%b6%e7%ad%86%e9%9b%bb',
	'%e9%96%8b%e7%ae%b1-%e5%8d%81%e9%8a%93-team-mp33-2tb-pcie-gen3x4-ssd',
	'computer-hardware-gpu',
	'%e6%b7%b1%e5%ba%a6%e5%ad%b8%e7%bf%92%e7%9a%84%e9%96%8b%e5%a7%8b',
]);

const KEEP_CATEGORY_NAMES = new Set([
	'AWS',
	'Azure',
	'加密貨幣',
	'電腦硬體',
	'筆電',
	'機器學習深度學習',
	'心得',
	'股票',
]);

const args = new Set(process.argv.slice(2));
const migrateAll = args.has('--all');
const dryRun = args.has('--dry-run');
const useRemoteAssets = args.has('--remote-assets') || process.env.WP_MIGRATION_REMOTE_ASSETS === '1';

async function fetchJson(url) {
	const res = await fetch(url, {
		headers: {
			'User-Agent': 'changken-blog-migration/1.0',
		},
	});

	if (!res.ok) {
		throw new Error(`Fetch failed ${res.status}: ${url}`);
	}

	return res.json();
}

async function fetchAll(endpoint, params = {}) {
	const results = [];
	for (let page = 1; ; page += 1) {
		const url = new URL(`${API_BASE}/${endpoint}`);
		url.searchParams.set('per_page', '100');
		url.searchParams.set('page', String(page));
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.set(key, value);
		}

		const res = await fetch(url, {
			headers: {
				'User-Agent': 'changken-blog-migration/1.0',
			},
		});

		if (res.status === 400 && page > 1) break;
		if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);

		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) break;

		results.push(...data);

		const totalPages = Number(res.headers.get('x-wp-totalpages') ?? '0');
		if (totalPages && page >= totalPages) break;
	}

	return results;
}

function decodeHtml(value) {
	return String(value ?? '')
		.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
		.replace(/&#x([a-f\d]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

function stripHtml(value) {
	return decodeHtml(value)
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function yamlString(value) {
	return JSON.stringify(decodeHtml(value));
}

function normalizeSlug(slug) {
	const decoded = decodeURIComponent(slug);
	return decoded
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 90);
}

function postFileName(post) {
	const date = post.date.slice(0, 10);
	const slug = normalizeSlug(post.slug) || String(post.id);
	return `${date}-${slug}.md`;
}

function shouldKeepPost(post, categoryMap) {
	if (migrateAll) return true;
	if (CURATED_SLUGS.has(post.slug.toLowerCase())) return true;

	const categories = post.categories.map((id) => categoryMap.get(id)?.name).filter(Boolean);
	return categories.some((name) => KEEP_CATEGORY_NAMES.has(name)) && Number(post.date.slice(0, 4)) >= 2020;
}

function collectImageUrls(html) {
	const urls = new Set();
	for (const match of html.matchAll(/<(?:img|source)\b[^>]+?\s(?:src|srcset|data-orig-file|data-medium-file|data-large-file)=["']([^"']+)["']/gi)) {
		for (const part of match[1].split(',')) {
			const url = decodeHtml(part.trim().split(/\s+/)[0]);
			if (url) urls.add(url);
		}
	}

	for (const match of html.matchAll(/https?:\/\/[^\s"'<>)]*\.(?:png|jpe?g|gif|webp)(?:\?[^\s"'<>)]*)?/gi)) {
		urls.add(decodeHtml(match[0]));
	}

	return [...urls].filter((url) => {
		try {
			const parsed = new URL(url, SITE_BASE);
			return /\.(?:png|jpe?g|gif|webp)$/i.test(parsed.pathname);
		} catch {
			return false;
		}
	});
}

function localImagePath(imageUrl) {
	const parsed = new URL(imageUrl, SITE_BASE);
	let pathname = parsed.pathname.replace(/^\//, '');
	if (parsed.hostname === 'i0.wp.com') {
		pathname = pathname
			.replace(/^cdn\.changken\.org\//, '')
			.replace(/^changkenblog\.s3\.ap-east-2\.amazonaws\.com\//, '');
	}

	const pathParts =
		parsed.hostname === 'cdn.changken.org' ||
		parsed.hostname === 'changkenblog.s3.ap-east-2.amazonaws.com' ||
		parsed.hostname === 'i0.wp.com'
			? pathname.split('/')
			: [parsed.hostname, ...pathname.split('/')];
	const safeParts = pathParts
		.map((part) => decodeURIComponent(part))
		.map((part) => part.replace(/[<>:"\\|?*]/g, '-'))
		.filter(Boolean);
	const filePath = path.join(IMAGE_DIR, ...safeParts);
	const objectKey = safeParts.map(encodeURIComponent).join('/');
	const publicPath = useRemoteAssets ? `${ASSET_BASE}/${objectKey}` : `/uploads/wp/${objectKey}`;
	return { filePath, publicPath };
}

async function downloadImage(imageUrl) {
	const { filePath, publicPath } = localImagePath(imageUrl);
	if (useRemoteAssets) return publicPath;

	let res;
	try {
		res = await fetch(imageUrl, {
			headers: {
				'User-Agent': 'changken-blog-migration/1.0',
			},
		});
	} catch (error) {
		console.warn(`WARN image fetch failed: ${imageUrl} (${error.cause?.code ?? error.message})`);
		return null;
	}

	if (!res.ok) {
		console.warn(`WARN image ${res.status}: ${imageUrl}`);
		return null;
	}

	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, Buffer.from(await res.arrayBuffer()));
	return publicPath;
}

async function localizeImages(html, imageCache) {
	let output = html;
	const urls = collectImageUrls(html);

	for (const url of urls) {
		const absoluteUrl = new URL(url, SITE_BASE).toString();
		if (!imageCache.has(absoluteUrl)) {
			imageCache.set(absoluteUrl, await downloadImage(absoluteUrl));
		}

		const publicPath = imageCache.get(absoluteUrl);
		if (!publicPath) continue;

		for (const candidate of new Set([
			url,
			absoluteUrl,
			url.replaceAll('&', '&amp;'),
			absoluteUrl.replaceAll('&', '&amp;'),
			url.replaceAll('&', '&#038;'),
			absoluteUrl.replaceAll('&', '&#038;'),
		])) {
			output = output.split(candidate).join(publicPath);
		}
	}

	return output;
}

function buildMarkdown(post, html, categoryMap, tagMap) {
	const title = decodeHtml(post.title.rendered);
	const description = stripHtml(post.excerpt.rendered || html).slice(0, 180);
	const categories = post.categories.map((id) => categoryMap.get(id)?.name).filter(Boolean);
	const tags = post.tags.map((id) => tagMap.get(id)?.name).filter(Boolean);
	const source = post.link || `${SITE_BASE}/${post.id}`;

	return `---
title: ${yamlString(title)}
description: ${yamlString(description || title)}
pubDate: ${yamlString(post.date.slice(0, 10))}
updatedDate: ${yamlString((post.modified || post.date).slice(0, 10))}
---

<!--
source: ${source}
wordpressId: ${post.id}
categories: ${categories.join(', ')}
tags: ${tags.join(', ')}
-->

${html.trim()}
`;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(IMAGE_DIR, { recursive: true });

	const [categories, tags, posts] = await Promise.all([
		fetchAll('categories', { _fields: 'id,name,slug,count' }),
		fetchAll('tags', { _fields: 'id,name,slug,count' }),
		fetchAll('posts', {
			_fields: 'id,date,modified,slug,link,title,excerpt,content,categories,tags',
		}),
	]);

	const categoryMap = new Map(categories.map((category) => [category.id, category]));
	const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
	const selectedPosts = posts.filter((post) => shouldKeepPost(post, categoryMap));
	const imageCache = new Map();
	const manifest = [];

	console.log(`Fetched ${posts.length} posts. Migrating ${selectedPosts.length} posts.`);

	for (const post of selectedPosts) {
		const fileName = postFileName(post);
		const filePath = path.join(OUT_DIR, fileName);
		const localizedHtml = await localizeImages(post.content.rendered, imageCache);
		const markdown = buildMarkdown(post, localizedHtml, categoryMap, tagMap);

		const categoriesForPost = post.categories.map((id) => categoryMap.get(id)?.name).filter(Boolean);
		manifest.push({
			id: post.id,
			title: decodeHtml(post.title.rendered),
			date: post.date,
			source: post.link,
			output: path.relative(process.cwd(), filePath),
			categories: categoriesForPost,
			tags: post.tags.map((id) => tagMap.get(id)?.name).filter(Boolean),
		});

		if (!dryRun) {
			await writeFile(filePath, markdown, 'utf8');
		}
		console.log(`${dryRun ? 'DRY' : 'OK'} ${fileName}`);
	}

	if (!dryRun) {
		await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
	}

	console.log(`Images downloaded: ${[...imageCache.values()].filter(Boolean).length}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
