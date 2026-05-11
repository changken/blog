import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

/**
 *  R2 銝撘
 * 
 * 撘 ( .env ):
 * R2_ACCOUNT_ID=你的帳號ID
 * R2_ACCESS_KEY_ID=你的KeyID
 * R2_SECRET_ACCESS_KEY=你的SecretKey
 * R2_BUCKET_NAME=你的Bucket名稱
 * R2_PUBLIC_DOMAIN=https://images.changken.org (選填)
 */

async function uploadToR2() {
    const filePath = process.argv[2];
    
    if (!filePath) {
        console.error("請提供檔案路徑，例如: node scripts/upload.mjs ./my-photo.jpg");
        process.exit(1);
    }

    const fileName = path.basename(filePath);
    const fileStream = fs.createReadStream(filePath);

    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });

    try {
        console.log(`正在上傳 ${fileName} 到 R2...`);
        await s3.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: fileStream,
            ContentType: getContentType(fileName),
        }));

        const publicUrl = process.env.R2_PUBLIC_DOMAIN 
            ? `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`
            : `https://pub-your-id.r2.dev/${fileName}`;

        console.log("\n 銝嚗");
        console.log(`瑼網址: ${publicUrl}`);
        console.log(`Markdown 語法: ![${fileName}](${publicUrl})`);

    } catch (err) {
        console.error("上傳失敗:", err);
    }
}

function getContentType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const mime = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
    };
    return mime[ext] || "application/octet-stream";
}

uploadToR2();
