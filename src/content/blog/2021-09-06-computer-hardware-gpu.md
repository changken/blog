---
title: "[電腦硬體]GPU顯示卡"
description: "電腦硬體系列文章的首篇就先獻給GPU顯示卡，我想先寫顯示卡的文章是因為最近GPU &hellip; 更多內容 [電腦硬體]GPU顯示卡 ›"
pubDate: "2021-09-06"
updatedDate: "2022-04-05"
---

<!--
source: https://changken.org/1543/computer-hardware-gpu/
wordpressId: 1543
categories: 電腦, 電腦硬體
tags: 電腦硬體, 顯示卡
-->

<figure class="wp-block-image size-large wp-duotone-333-ccc-1"><img data-recalc-dims="1" decoding="async" src="https://assets.changken.org/computer-hardware/gpu/1.jpg" alt=""/><figcaption>圖1. 一張幸運的空氣rtx 3070</figcaption></figure>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-large"><img data-recalc-dims="1" decoding="async" src="https://assets.changken.org/computer-hardware/gpu/2.jpg" alt=""/><figcaption>圖2. rtx 2070</figcaption></figure>
</div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-large"><img data-recalc-dims="1" decoding="async" src="https://assets.changken.org/computer-hardware/gpu/3.jpg" alt=""/><figcaption>圖3. gtx 1050ti</figcaption></figure>
</div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-large"><img data-recalc-dims="1" decoding="async" src="https://assets.changken.org/computer-hardware/gpu/4.jpg" alt=""/><figcaption>圖4. gtx 1060 6G</figcaption></figure>
</div>
</div>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" decoding="async" src="https://assets.changken.org/computer-hardware/gpu/5.jpg" alt=""/><figcaption>圖5. gtx 750ti 一代神卡</figcaption></figure>



<p></p>
</div></div>
</div></div>



<p>電腦硬體系列文章的首篇就先獻給GPU顯示卡，我想先寫顯示卡的文章是因為最近GPU瘋狂缺貨，原因是加密貨幣日漸高升，而造成顯示卡挖礦是有利可圖的產業，許多POW機制的加密貨幣可以使用AMD、Nvidia顯卡來挖取，而造成礦工加價收購顯示卡，黃牛則是跟著哄抬GPU價格，電腦商家又因為上游賣出顯卡時需要搭配CPU、主機板等電腦零件，而讓顯卡變得一項炙手可熱的「<strong>理財產品</strong>」。</p>



<p>顯示卡一直以來都是電腦硬體的熱門零件，因為他關係到一台電腦能不能跑3D運算，不只玩遊戲會用得到顯示卡，深度學習也會需要<strong>Nvidia cuda</strong>的硬體資源來進行加速，挖礦也是需要顯示卡的平行運算，其原理不外乎就是爆算hash，進而求得開頭為00的sha256 hash值，不懂得加密幣的朋友就當挖礦是<strong>使用窮舉暴力法來求取答案，是一項很耗費能源的運算方式。</strong></p>



<p>元歸正傳，顯示卡主要分為兩大陣營，一派是Nvidia，另一派則是AMD。</p>



<!--more-->



<h2 class="wp-block-heading">Nvidia桌機顯示卡列表:</h2>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>等級</td><td>顯示卡型號</td><td>VRAM</td><td>VRAM世代</td><td>架購</td><td>MSRP價格(你買不到的價格)</td><td>說明</td><td>解析度</td></tr><tr><td>泰坦</td><td>3090ti</td><td>24G</td><td>GDDR6X</td><td></td><td>64999</td><td>泰坦等級顯卡，比90強7~10%，公耗單卡可以突破500w</td><td>4k~8k</td></tr><tr><td>旗艦</td><td>3090</td><td>24G</td><td>GDDR6X</td><td></td><td>46,900</td><td>旗艦顯卡，大概就是需要專業深度學習、3D建模、攻頂遊戲玩家等才會買的。</td><td>4k~8k、4k 開光追+dlss 60fps</td></tr><tr><td></td><td>3080ti</td><td>12G</td><td>GDDR6X </td><td></td><td>36,900</td><td>通常會另稱3090 12GB，跟3090性能相差無幾。</td><td>4K 60fps</td></tr><tr><td>高階</td><td>3080</td><td>10G</td><td>GDDR6X </td><td></td><td>21,900</td><td>3080算是一個價性比還不錯的卡，很值得購買。</td><td>4K入門</td></tr><tr><td></td><td>3070ti</td><td>8G</td><td>GDDR6X </td><td></td><td>18,900</td><td>3070ti的加強版，比3070強一點，2k上很穩，4k入門算是可以摸得到邊。</td><td>2k為主~4k</td></tr><tr><td>中高階</td><td>3070</td><td>8G</td><td>GDDR6</td><td></td><td>15,900</td><td>3070算是2k級別的卡</td><td>2k</td></tr><tr><td></td><td>3060ti</td><td>8G</td><td>GDDR6 </td><td></td><td>12,900</td><td>3060ti，CP值高的卡，效能跟3070差沒多少，並且價格比3070便宜幾千，2k144 ok!</td><td>2k</td></tr><tr><td>中階</td><td>3060</td><td>12G</td><td>GDDR6 </td><td></td><td>10,900</td><td>3060的效能大概介於2060 super~2070之間，跟2070的性能差不多，差別強在光追~</td><td>1080p</td></tr><tr><td>中低階</td><td>3050</td><td>8G</td><td>GDDR6</td><td>安培ampere</td><td>7990</td><td>3050效能大概在1660s左右，略輸2060 10%，在新架構的助力之下rtx dlss都會比2060還要好</td><td>1080p</td></tr><tr><td>以下為舊世代中階</td><td>2060</td><td>12G</td><td>GDDR6</td><td></td><td></td><td>老黃2060 remark，12G除了拿來挖礦不曉得還有啥用</td><td>1080p</td></tr><tr><td></td><td>2060</td><td>6G</td><td>GDDR6 </td><td></td><td></td><td>舊世代的光追入門卡</td><td>1080p</td></tr><tr><td></td><td>1660 super</td><td>6G</td><td>GDDR6 </td><td>圖靈turing</td><td></td><td>舊世代的turing卡，挖礦神卡，90w功耗可以達到30~32mhs，礦工很愛這款卡~</td><td>1080p</td></tr></tbody></table><figcaption>如有錯誤惠請留言~</figcaption></figure>



<h3 class="wp-block-heading">nvidia桌機顯卡型號的查看教學</h3>



<p>很簡單，舉例來說 3080ti，30指的是<strong>顯卡世代</strong>，數字越大表示越新，而80則是顯卡的<strong>性能等級</strong>，數字越大效能越強，至於ti的部分則是顯卡<strong>是否為加強版</strong>，有這個後綴代表性能越好。</p>



<p>此外nvidia在20世代時有出過super版，它的性能大概介於<strong>ti > super > 沒有後綴</strong>之間，因此也算是老黃(nvidia執行長兼創辦人)的<strong>精湛刀法</strong>(我們會戲稱老黃的性能分級，是他從泰坦級顯卡一路閹割到低階顯卡的精湛功夫)。</p>



<h3 class="wp-block-heading">nv筆電獨顯型號的查看教學</h3>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>位階</td><td>型號</td><td>說明</td></tr><tr><td></td><td>3080ti</td><td></td></tr><tr><td>旗艦</td><td>3080</td><td></td></tr><tr><td></td><td>3070ti</td><td></td></tr><tr><td>高階</td><td>3070</td><td></td></tr><tr><td>中階</td><td>3060</td><td>以上可以考慮看看</td></tr><tr><td>低階</td><td>3050ti</td><td>以下不太推薦，跟3060有10%價差，性能差了50%</td></tr><tr><td></td><td>3050</td><td></td></tr></tbody></table><figcaption> 如有錯誤惠請留言~ </figcaption></figure>



<p>大約會輸桌機版一些，並且30系這代有功耗上限的問題，因此有<strong>滿血版、殘血版</strong>的區別，功耗給得足夠的話有機會下位階滿血版獨顯可以戰上位階殘血獨顯!</p>



<h2 class="wp-block-heading">AMD桌機顯示卡列表:</h2>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>等級</td><td>顯示卡型號</td><td>VRAM</td><td>VRAM世代</td><td>架構</td><td>MSRP價格(你買不到的價格)</td><td>說明</td></tr><tr><td>旗艦</td><td>Radeon 6900xt</td><td>16G</td><td></td><td></td><td>31,290</td><td>效能大概在3080~3080ti</td></tr><tr><td>高階</td><td>Radeon 6800xt</td><td>16G</td><td></td><td></td><td>24,590</td><td>效能略低6900xt</td></tr><tr><td></td><td>Radeon 6800</td><td>16G</td><td></td><td></td><td>18,290</td><td>效能介於3070~3080</td></tr><tr><td>中高階</td><td>Radeon 6700xt</td><td>12G</td><td></td><td></td><td>22,900</td><td>效能介於3060ti~3070</td></tr><tr><td></td><td>Radeon 6600xt</td><td>8G</td><td></td><td></td><td>12,490</td><td>效能高於3060，不開光追下+開fsr可以摸到3060ti。<br>與1660 super同樣是挖礦神卡，可以在50w變態功耗之下達到32mhs算力，礦工們的禁臠。</td></tr><tr><td>中階</td><td>Radeon 6600</td><td>8G</td><td></td><td></td><td>10000</td><td>效能略低3060</td></tr><tr><td>低階</td><td>Radeon 6500xt</td><td>4G</td><td>以上皆為GDDR6</td><td>RDNA 2</td><td>7990</td><td>算了吧</td></tr></tbody></table><figcaption> 如有錯誤惠請留言~ </figcaption></figure>



<h3 class="wp-block-heading">Amd桌機顯卡型號的查看教學</h3>



<p>舉例來說 6900xt，6開頭為世代，<strong>數字越大越新</strong>，而900則是顯卡性能，<strong>數字越大性能越好</strong>，xt後綴則是是否為加強版，<strong>有的話性能會比沒有的還要來得強</strong>。</p>



<h2 class="wp-block-heading">依照每個人不同的需求來挑選顯卡</h2>



<h3 class="wp-block-heading"> 1.遊戲玩家: </h3>



<p><strong>要看你想要玩哪個解析度的遊戲?</strong> 遊戲效能要不要全開? 要不要開光追? 要不要開個DLSS or FSR? </p>



<p>如果是1080p 應該拿3060 or 6600xt(6600)都不錯，2k的話應該就要拿3060ti~3070ti or 6700xt ~ 6800等級的顯卡，4k的話3080~3090 or 6800xt~6900xt，如果要光追的話請拿nvidia顯卡，amd現在的光追才剛開始，開光追之餘請記得dlss or fsr也開下去，讓fps飆升!!</p>



<h3 class="wp-block-heading"> 2.深度學習</h3>



<p>一律拿nvidia顯卡，amd跟你無緣，<strong>而且請特別注重vram大小，它攸關你能不能跑這個模型</strong>，cuda數的多寡決定運算時間的長短，<strong>請記得要拿大vram的顯卡</strong>，例如3060、3080ti、3090、3090ti等，我會建議沒有摳摳的研究者拿3060，畢竟12G vram也算夠用了，也很夠跑一些中型的模型，有摳摳的則一律建議攻頂3090ti，24g vram非常夠你跑大型網路，打比賽也很夠用，必要時上rtx a6000。</p>



<h3 class="wp-block-heading"> 3.挖礦玩家</h3>



<p><strong>如果有考慮eth 2.0風險的話，請拿nvidia顯卡</strong>，如果只挖eth主流幣的話，可以考慮amd radeon 6600xt顯卡，挖礦神卡礦老闆財力一定可以加錢買卡的，不然請加錢買nv未鎖算力顯卡，因為有鎖算力的既便解鎖70%算力也不太划算，畢竟你要考慮功耗的問題，如果是挖cfx、rvn、ergo等小幣的話，便可以考慮nv lhr顯卡，畢竟鎖算力<strong>好像</strong>影響ethash的部分比較大，其他不是ethash的算法則<strong>好像</strong>還好。</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>2022.4.5更新</p><cite>lhr可以搞eth+ton雙挖，基本上不無小補，基本上目前有消息說要6月份上eth pos+難度炸彈，還有年底準備發表40系，據說4060打平3080，4070打平3090，4090是3090的雙倍性能，還有6月份的挖礦收益會變成現在的10%，所以現在很多商家開始開放單購，以及礦工黃牛開始大量出貨顯卡及礦卡。</cite></blockquote>



<p><strong><span class="has-inline-color has-vivid-red-color">PS: 投資有賺有賠，挖礦前請自行做好功課，本文章並沒有推薦挖礦的意思，也不鼓勵挖礦，盈虧自負!</span></strong></p>



<h3 class="wp-block-heading"> 4.專業3D建模、繪圖用戶</h3>



<p>請直接考慮nvidia或amd專業繪圖卡</p>



<h2 class="wp-block-heading">購買策略</h2>



<p>現在顯卡要能夠MSRP(官方指導價)單買買入，跟作夢是差不多的道理，因此我的購買策略可以分為幾類人士:</p>



<h3 class="wp-block-heading">1.不急等等黨</h3>



<p>封城不急! 我就是時間多且摳摳少，策略就是<strong>請努力等下去</strong>，等待礦難發生時，等等黨才是真的大獲全勝之日!</p>



<p><strong><span class="has-inline-color has-vivid-red-color">推薦去EVGA大哥那邊排隊，到2021.9.30之前可以成為菁英會員! <a href="https://tw.evga.com/" target="_blank" rel="noreferrer noopener">https://tw.evga.com/</a></span></strong></p>



<h3 class="wp-block-heading">2.有特殊運算需求黨</h3>



<p>有需要就買! 顯卡目前的價格只會變貴，很難跌價，並且此類人士通常都有一定的摳摳+運算deadline，快買吧! 你的時間緊迫~~</p>



<h3 class="wp-block-heading">3.黃牛+礦工挖礦黨</h3>



<p>請密切觀察加密幣走勢，還有要多評估lhr有無解鎖算力的可能，礦工黨建議幣低點收卡且開挖，黃牛黨建議幣低點買卡，一有破解消息or幣漲則可以慢慢價高出貨。</p>



<p><strong><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">PS: 投資有賺有賠，挖礦、黃牛前請自行做好功課，本文章並沒有推薦挖礦、搞黃牛的意思，也不鼓勵挖礦、黃牛，盈虧自負!</mark></strong></p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>2022.4.5更新</p><cite>我的建議是一般遊戲玩家全部當40系等等黨，不要輕易接盤礦卡，除非殺到msrp的5折。<br>特殊運算需求黨(剛需黨)，一樣有需求就趕快單買。至於礦工黃牛黨你自己自求多福吧!</cite></blockquote>



<p></p>

<div style="font-size: 0px; height: 0px; line-height: 0px; margin: 0; padding: 0; clear: both;"></div>
