# 攝影作品集網站

風景／旅拍攝影師個人作品集網站，極簡黑白質感風格，內含作品集展示、接案服務介紹、合作流程與聯繫表單。

純靜態網站，建議以 **Netlify** 免費託管；之後可自行替換文案與照片，不必改架構。

## 資料夾結構

```
portfolio-project/
├── index.html          <- 網站主檔案
├── netlify.toml        <- Netlify 部署設定
├── assets/
│   └── images/         <- 把你的照片放在這裡
├── .gitignore
└── README.md
```

## 如何預覽

用瀏覽器打開 `index.html` 就能看到完整網站（雙擊即可，或右鍵「開啟方式」選瀏覽器）。

---

## 自行替換文案與照片（之後隨時可做）

### 1. 替換個人資訊

用文字編輯器打開 `index.html`，搜尋所有 `{{ }}` 標記，改成真實資訊，例如：

- `{{ 你的名字 }}` → 本名或攝影師名稱（含 SEO meta、頁尾）
- `{{ your@email.com }}` → 聯絡信箱（聯絡區塊的 mailto 連結）
- `{{ yourhandle }}` → Instagram 帳號
- `{{ 2019 }}`、`{{ 2026 }}` → 年份
- `{{ https://你的網域/assets/images/og.jpg }}` → 社群分享圖的完整網址（上線後再填）
- 作品標題與地點座標可自行改成真實拍攝地點

改完存檔 → 若已接 Netlify，`git push` 後網站會自動更新。

### 2. 替換照片

把照片放進 `assets/images/`，在 `index.html` 搜尋 `class="ph"`（共 6 處：1 張肖像 + 5 張作品），將 placeholder：

```html
<div class="ph"><span class="ph-label">作品照片 01...</span></div>
```

換成：

```html
<img src="assets/images/你的照片檔名.jpg" class="ph-img" alt="說明文字">
```

比例已預設（橫幅 16:9／直幅 4:5／寬幅 21:9），照片會自動裁切填滿。建議：

- 使用 JPEG 或 WebP
- 單張盡量控制在約 200–500 KB（網頁用，不必放原圖）
- 另準備一張約 1200×630 的 `og.jpg` 供社群分享（對應上方 og:image）

### 3. 聯絡表單（Formspree）

表單已改為 POST 到 Formspree，訪客送出後你會在註冊信箱收到通知。

1. 到 [formspree.io](https://formspree.io) 免費註冊，建立一個 form
2. 複製 endpoint，例如 `https://formspree.io/f/xxxxxxxx`
3. 在 `index.html` 搜尋 `YOUR_FORM_ID`，換成你的 ID（`xxxxxxxx` 那段）
4. 首次送出測試後，依 Formspree 指示驗證信箱即可

聯絡區塊的 Email 連結仍是 `mailto:`，方便訪客直接寫信；表單則走 Formspree。

---

## 上線發布（Netlify）

### 方式 A：GitHub + Netlify（建議，之後改檔會自動部署）

1. 在 GitHub 建立新 repo，把本專案推上去：
   ```bash
   git remote add origin https://github.com/你的帳號/你的repo.git
   git push -u origin main
   ```
2. 登入 [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project**
3. 選該 GitHub repo；Publish directory 維持 `.`（已寫在 `netlify.toml`）
4. Deploy 完成後會得到 `https://xxxx.netlify.app`

### 方式 B：拖曳部署（最快試一次）

到 Netlify **Sites** → 把整個專案資料夾拖進部署區即可。之後若要長期維護，仍建議改用方式 A。

### 綁定自己的網域（可之後再做）

Netlify → 該站 **Domain management** → **Add a domain**，依指示改 DNS。HTTPS 會自動啟用。

---

## 上線前檢查清單

- [ ] 搜尋並替換所有重要的 `{{ }}`（至少：名字、信箱、Instagram）
- [ ] 替換 Formspree 的 `YOUR_FORM_ID`
- [ ] （可選）放入肖像與作品照片
- [ ] （可選）準備 `assets/images/og.jpg` 並更新 og:image 為完整網址
- [ ] 推到 GitHub → Netlify 部署成功
- [ ] 用手機與電腦各測一次表單送出

---

## 架構說明

這是純靜態單頁，**不需要** Node、資料庫或自架伺服器。流量與表單分別由 Netlify CDN 與 Formspree 處理；之後只改內容即可，不必重構。
