# 🔐 加密工具 (Encryption Tool)

一個功能強大的網頁加密工具，支援多種編碼格式的雙向轉換和雜湊計算。基於 Next.js 15 和 TypeScript 建構，提供現代化的使用者介面和完整的錯誤處理機制。

## ✨ 功能特色

### 🔄 編碼格式支援
- **Base64** - 常用於資料傳輸和儲存
- **URL 編碼** - 網址參數和查詢字串編碼
- **HTML 實體** - 網頁內容安全編碼
- **十六進位** - 二進位資料的十六進位表示

### 🔐 雜湊演算法
- **SHA256** - 安全雜湊演算法 256 位元
- **MD5** - 訊息摘要演算法 5
- **SHA1** - 安全雜湊演算法 1

### 🎯 核心功能
- ✅ **雙向轉換** - 支援編碼和解碼操作
- ✅ **即時轉換** - 快速處理大量文字
- ✅ **一鍵複製** - 方便複製轉換結果
- ✅ **錯誤處理** - 完整的錯誤提示機制
- ✅ **響應式設計** - 支援桌面和行動裝置
- ✅ **深色模式** - 自動適應系統主題
- ✅ **TypeScript** - 完整的型別安全

## 🚀 快速開始

### 環境需求
- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun 套件管理器

### 安裝與執行

1. **安裝依賴套件**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   # 或
   bun install
   ```

2. **啟動開發伺服器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   # 或
   bun dev
   ```

3. **開啟瀏覽器**
   訪問 [http://localhost:3000](http://localhost:3000) 查看應用程式

## 📖 使用說明

### 基本操作
1. 在左側輸入框中輸入要轉換的文字
2. 選擇所需的編碼類型或雜湊演算法
3. 選擇「編碼」或「解碼」模式（雜湊演算法僅支援編碼）
4. 點擊「轉換」按鈕
5. 在右側查看結果，並可一鍵複製

### 支援的轉換類型

| 格式 | 編碼 | 解碼 | 說明 |
|------|------|------|------|
| Base64 | ✅ | ✅ | 常用於資料傳輸 |
| URL 編碼 | ✅ | ✅ | 網址參數編碼 |
| HTML 實體 | ✅ | ✅ | 網頁內容編碼 |
| 十六進位 | ✅ | ✅ | 二進位資料表示 |
| SHA256 | ✅ | ❌ | 安全雜湊演算法 |
| MD5 | ✅ | ❌ | 訊息摘要演算法 |
| SHA1 | ✅ | ❌ | 安全雜湊演算法 |

## 🛠️ 技術架構

### 前端技術
- **Next.js 15** - React 全端框架
- **TypeScript** - 型別安全的 JavaScript
- **Tailwind CSS** - 實用優先的 CSS 框架
- **React Hooks** - 狀態管理和生命週期

### 核心功能
- **Web Crypto API** - 瀏覽器原生加密 API
- **Client-side Processing** - 所有處理都在瀏覽器端完成
- **Error Handling** - 完整的錯誤處理機制
- **Responsive Design** - 響應式使用者介面

## 📁 專案結構

```
src/
├── app/
│   ├── layout.tsx          # 根布局元件
│   ├── page.tsx            # 主頁面元件
│   └── globals.css         # 全域樣式
└── lib/
    └── encryption.ts       # 編碼轉換工具函數
```

## 🔧 開發指令

```bash
# 開發模式
npm run dev

# 建置專案
npm run build

# 啟動生產伺服器
npm run start

# 程式碼檢查
npm run lint
```

## 🌐 部署

### Vercel 部署
最簡單的部署方式是使用 [Vercel Platform](https://vercel.com/new)：

1. 將專案推送到 GitHub
2. 在 Vercel 中匯入專案
3. 自動部署完成

### 其他平台
此專案也可以部署到任何支援 Next.js 的平台：
- Netlify
- AWS Amplify
- Railway
- 自建伺服器

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案！

## 📄 授權

此專案採用 MIT 授權條款。

## 🔗 相關連結

- [Next.js 官方文件](https://nextjs.org/docs)
- [TypeScript 官方文件](https://www.typescriptlang.org/docs)
- [Tailwind CSS 官方文件](https://tailwindcss.com/docs)