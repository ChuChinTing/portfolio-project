# 攝影作品集網站

風景／旅拍攝影師個人作品集網站。純靜態託管於 Netlify，並附 **Decap CMS 內容後台**（瀏覽器登入後即可改文案與上傳照片）。

線上網站：https://lustrous-quokka-b08086.netlify.app  
後台網址：https://lustrous-quokka-b08086.netlify.app/admin/

## 資料夾結構

```
portfolio-project/
├── index.html              <- 前台頁面
├── js/content.js           <- 載入 content/site.json
├── content/site.json       <- 所有可編輯內容（後台會改這個檔）
├── admin/
│   ├── index.html          <- CMS 後台入口
│   └── config.yml          <- 後台欄位設定
├── assets/images/          <- 上傳的照片
├── netlify.toml
└── README.md
```

---

## 第一次啟用後台（必做）

後台程式已就緒，但還要在 Netlify 開通登入才能用：

### 1. 開啟 Identity

1. 打開 [Netlify 專案](https://app.netlify.com/projects/lustrous-quokka-b08086)
2. **Project configuration** → **Identity** → **Enable Identity**
3. Registration preferences 建議選 **Invite only**（只有你能登入）

### 2. 開啟 Git Gateway

同一頁往下找到 **Services** → **Git Gateway** → **Enable Git Gateway**  
（讓後台能把修改寫回 GitHub）

### 3. 邀請自己當編輯

1. Identity → **Invite users**
2. 輸入你的 Email，送出邀請
3. 到信箱點連結設定密碼
4. 開啟 https://lustrous-quokka-b08086.netlify.app/admin/ 登入

### 4. 開始編輯

登入後點 **網站內容 → 全站文案與作品**，可改：

- 名字、Email、Instagram、地區
- Hero／關於我文案與統計數字
- 作品標題、座標、照片上傳
- 服務與合作流程
- Formspree 表單 ID

按 **Publish** 後，Netlify 會自動重新部署，約 1 分鐘後前台更新。

---

## 聯絡表單（Formspree）

1. 到 [formspree.io](https://formspree.io) 建立表單，取得 ID（例如 `xxxxxxxx`）
2. 在後台「Formspree 表單 ID」欄位填入即可（也可直接改 `content/site.json`）

---

## 本機預覽

不要用雙擊 `index.html`（瀏覽器會擋 JSON 載入）。請在專案目錄執行：

```bash
python3 -m http.server 8080
```

然後開啟 http://localhost:8080

本機測試後台可另開終端：

```bash
npx decap-server
```

並在 http://localhost:8080/admin/ 使用（需 `config.yml` 內已有 `local_backend: true`）。

---

## 部署

已接 GitHub → Netlify。推送 `main` 即會自動部署：

```bash
git add .
git commit -m "你的說明"
git push
```

### 綁定自己的網域

Netlify → **Domain management** → **Add a domain**。
