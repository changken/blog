---
title: "AWS Certified CloudOps Engineer Associate 通過"
description: "分享 2026 年最新改版後的 AWS SOA-C03 考試心得，從 SysOps 轉型為 CloudOps 的維運實戰重點，包含監控、IaC 及自動化維運等核心服務準備建議。"
pubDate: "2026-05-11"
updatedDate: "2026-05-11"
heroImage: "https://assets.changken.org/aws-soa-pass/aws-soa-certs.jpg"
---

## 考試概況

上上個月 3/2，我又去考了 AWS SOA-C03 考試了。基本上考試體感比較簡單，不知道是不是因為我前面已經考了 CCP, SAA, AIF, DVA 的緣故，很多綜合情境題目都因為前面的經驗而變得熟悉了。

這次考試非常有感的是 AWS 官方將原本的 **SysOps Administrator** 正式更名為 **CloudOps Engineer**，這也反映在題目更專注於「自動化維運」而非單純的系統管理。

## 考試重點與轉變

這次的考試專注於 Performance、Monitoring、IaC 的章節，並且發現開始有 Container (ECS/EKS) 的題目出現了。其實我很贊成新改版題目的方向，雖然現職環境多半還是 ClickOps 或手動部署的老舊流水線，但如果不思進取，真的會被這個 AI 與雲端自動化的時代狠狠淘汰。

### 1. 維運優化與成本
雖然 Cost 的獨立 Domain 在架構上有所調整，但其實是被併入了維運優化 (Performance Optimization) 之中。考題不外乎問如何達成 meet requirement, least operational overhead, least modify 等。選題時記得要以 **Managed Service** 為主，如果要你寫一堆 Lambda 去接 SNS/SQS 或開 EC2 跑 Cron，通常不是最優解。

### 2. 監控與自動化補救
SOA 核心專注在 CloudFormation (含 StackSets), CDK, CloudWatch, CloudTrail, AWS Organizations 等服務。
*   **熱門情境**：整合 **IdP** (SAML, OpenID) 做 SSO 登入。
*   **IaC 實戰**：多帳號部署 IAM Role 或服務時，通常會用到 CloudFormation + StackSets。
*   **集中化監控**：CloudWatch Dashboard 的 **Cross-Account Cross-Region** 能力是考點，如何透過單一 Dashboard 監控整個 AWS Organization 下多帳號、多區域的指標 (Metrics)。
*   **Lambda 的「膠水」與「自定義腳本」角色**：雖然考試優先選擇原生 Managed Service，但當原生功能不足以應對特殊需求時，Lambda 就成了最重要的「自定義腳本」與「膠水」補位工具。不論是 EventBridge 觸發的自動化、Config 的自定義補救規則，還是 CloudWatch Logs 的即時處理，Lambda 都是實現自動化維運的最後一哩路。
*   **進階維運**：EC2 Auto Scaling 的 Warm Up 設定、CloudFormation 的 Drift 處理等。

### 3. 資料保護與災難復原 (DR)
這部分非常強調 **AWS Backup** 的中心化管理能力。
*   **服務整合**：現在 Aurora 和 DynamoDB 的備份與 Snapshot 已經深度整合進 AWS Backup。
*   **核心考點**：如何設定跨區域 (Cross-Region) 複製備份以符合災難復原需求，以及利用跨帳號 (Cross-Account) 備份來防止單一帳號被駭時資料被全刪。
*   **DynamoDB**：會考到 Point-in-Time Recovery (PITR) 的啟用情境。

### 4. 安全維運與 Systems Manager (SSM)
SSM 絕對是維運「老常客」，這部分考得很細：
*   **遠端管理**：**Session Manager** 是首選，因為它不需要開 Port 22/3389 就能連線。
    *   **私有子網 (Private Subnet) 重點**：在沒有 NAT Gateway 的環境下，Session Manager 需要建立 **VPC Endpoints (Interface Endpoints)** 才能與 SSM 服務溝通。
    *   **EC2 Instance Connect Endpoint**：這是一個較新的考點，讓你可以不用 Bastion Host 也不用公網 IP 就能連進私有子網的機器。
    *   **Serial Console**：針對無法正常開機（如 Kernel Panic）的 EC2 進行底層排錯。
*   **大規模部署**：利用 **Run Command** 執行指令或使用 **Patch Manager** 自動化套用更新補丁 (Patch)，這在管理大量 EC2 時非常重要。
*   **機密管理**：**Parameter Store** (存一般的 Env) vs. **Secrets Manager** (存需要自動輪轉 Rotation 的資料庫金鑰)，這兩者的差別是必考題。

### 5. 網路排錯與流量分析
說到網路不通，**VPC Flow Logs** 絕對是首選工具：
*   **排錯關鍵**：透過分析日誌中的 `REJECT` 或 `ACCEPT` 來判斷流量是在哪一層被擋掉的。
*   **SG vs NACL**：這是維運的基本功。**Security Group (SG)** 是具備狀態 (Stateful) 的，通常作用在實例層級；而 **Network ACL (NACL)** 是無狀態 (Stateless) 的，作用在子網層級。
*   **S3 Access Points**：這是管理大型 Bucket 權限的利器。當 Bucket Policy 太過複雜時，可以透過 Access Points 為不同團隊設定獨立的存取點，並能限制只能透過 **VPC** 存取，確保資料不流向公網。
*   **排錯情境**：如果看到 Request 是 `ACCEPT` 但 Response 卻沒回來，那通常就是 NACL 的 Inbound/Outbound 沒對稱設好。

### 6. 合規治理與健康監控
這一部分考驗你對「預防 (Preventative) 」與「偵測 (Detective) 」控制的理解差異：
*   **合規檢查 (偵測/補救)**：**AWS Config** 用來追蹤資源配置（例如：檢查 S3 是否加密、EBS 是否有 Snapshot）。它屬於 **偵測性** 工具，當發現不合規時可以觸發 Lambda 進行自動補救。
*   **權限防線 (預防)**：這是為了在事情發生前就擋下來。
    *   **SCP (Service Control Policies)**：Organization 層級的護欄，直接限制 Member Account 哪些服務「絕對不能用」。
    *   **Permissions Boundary**：用來限制 IAM User/Role 權限的最大邊界，防止開發人員自己給自己 Admin 權限。
    *   **IAM Policy**：包含 Identity-based (誰能做什麼) 與 Resource-based (資源讓誰用)，這是最細微的權限控制。
*   **關鍵差異**：考試會考你「如何防止某個動作發生」 (用 SCP/IAM) vs 「如何確保資源設定正確」 (用 AWS Config)。
*   **優化建議**：**Trusted Advisor** 提供成本、安全、效能等全方位的優化建議，甚至可以透過 API 串接自動化腳本來優化 Infra。
*   **狀態監控**：
    *   **AWS Service Health**：看 AWS 服務的全局狀態（例如最近中東節點受影響的公告）。
    *   **AWS Health Dashboard (Personal Health)**：這才是跟「你自己資源」有關的警示，如果是你的 EC2 所在的硬體出問題，這裡會跳通知。


## 準備教材與模擬考評析

我主要使用的資源是 Stephane Maarek 的課程，並搭配三家主流模擬考進行全方位的練習：

| 來源 | 分數 / 進度 | 課程/模擬考連結 |
| :--- | :--- | :--- |
| **Stephane Maarek (課程模擬)** | 61% | [課程連結](https://www.udemy.com/course/aws-certified-cloudops-associate/) |
| **Stephane Maarek (模擬考)** | 61%, 78%, 64%, 60% | [模擬考連結](https://www.udemy.com/course/practice-exams-aws-certified-cloudops-engineer/) |
| **Neal Davis (模擬考)** | 75%, 86%, 75%, 83%, 76% | [模擬考連結](https://www.udemy.com/course/aws-certified-cloudops-engineer-associate-aws-practice-exams/) |
| **Tutorial Dojo (模擬考)** | 75%, 72%, 78%, 81%, 76% | [模擬考連結](https://www.udemy.com/course/aws-certified-sysops-administrator-associate-practice-exams-soa-c02/) |

#### **個人體感與建議：**

*   **Tutorial Dojo (TD / Jon Bonso)**：
    **最貼近實戰深度**。其題目設計在「多服務綜合報錯」與「維運決策」的比例拿捏得非常到位，難度甚至比正式考試略高一些。非常適合在準備後期用來磨練應變能力與實戰感。
*   **Stephane Maarek**：
    **極致的技術細節補充**。Stephane 的題目設計非常詳盡，有時會挑戰一些具體的技術細節或參數設定。雖然練習時的分數可能不如預期、挫折感稍重，但這對於掃除知識盲點、打穩深層技術基本功非常有幫助。
*   **Neal Davis**：
    **循序漸進的觀念建立**。Neal Davis 的內容設計較為親民，著重於核心觀念的快速掃描。非常適合在準備初期用來建立信心，或是在最後階段用來快速複習基礎架構。

## 最終成績

**最終分數：809 分 (720 分通過)**

基本上要熟讀 AWS Monitoring 相關服務，並且理解各服務之間如何串接達成自動化維運，這張證照對理解 AWS 實戰維運非常有幫助。
