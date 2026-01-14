# Gringotts
Gringotts 是一個去中心化的穩定幣鑄造協議，旨在將全球流動性引入台幣（TWD）生態系統。用戶可以透過存入 USDT 或 USDC，鑄造符合 ERC-3643 標準的 TWD 穩定幣，確保交易的安全與身分合規。

## 🚀 核心功能
- 合規鑄造： 採用 ERC-3643 (T-REX) 標準，確保所有代幣轉移均在已驗證的身分（Verified Identities）之間進行。
- 雙資產支持： 支持存入 USDT 或 USDC 作為抵押資產。
- Alchemy 深度整合： 利用 Alchemy 提供的高效能節點、Webhooks 與智慧合約索引，實現即時入金監控。
- 靈活贖回： 用戶可隨時將 TWD 穩定幣換回原始的加密資產並提領。

## 🛠 技術棧
區塊鏈網路： iSunCloud (EVM 相容鏈)
基礎設施： Alchemy
代幣規範： ERC-3643 (包含 Identity Registry 與 Claims Provider)
身分驗證： CAFECA 進行身分註冊與 AML 審核。

## ⚙️ 運作流程
1. 索取地址： 用戶請求唯一的入金地址。
2. 資產存入： 用戶向入金地址存入 USDT/USDC。
3. 驗證與觸發： Alchemy Webhooks 偵測入金並觸發後端驗證。
4. 合規鑄造： 協議確認用戶符合 ERC-3643 身分註冊後，鑄造穩定幣至用戶錢包。
5. 應用與贖回： 用戶可於生態系內使用穩定幣，或將其兌換回 USDT/USDC。

## ⚖️ 洗錢防制與合規聲明
本專案在設計上將法律合規作為核心考量：
1. ERC-3643 標準： 每一筆交易都會根據身分登錄系統進行驗證。只有通過身份證驗證的用戶才能持有或使用穩定幣。
2. 遵循當地法律： 用戶與營運者必須嚴格遵守當地的洗錢防制法 (AML) 及打擊資恐 (CTF)相關規範。
3. 實名驗證要求： 在生產環境中，必須整合受監管的 KYC 服務提供商，以確保協議的合法運行。
4. 本軟體部署者有責任確保所有營運行為符合當地金融牌照要求及洗錢防制申報義務。

## 快速部署
### 前置要求
- Node.js v24+
- Alchemy API Key
- 部署用的錢包私鑰

### 安裝
```Bash
git clone https://github.com/your-repo/Gringotts.git
cd Gringotts
npm install
```

### 環境設定
建立 .env 檔案
```env
ALCHEMY_API_KEY=您的API金鑰
NETWORK=isuncloud
PRIVATE_KEY=您的錢包私鑰
```

### 啟動
```shell
npm start
```

### 授權條款
本專案採用 MIT 授權條款，詳見 LICENSE 檔案。
