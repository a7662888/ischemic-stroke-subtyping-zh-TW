# 缺血性腦中風電腦化病因分型系統 · 繁體中文

依公開同儕審查文獻獨立實作之純瀏覽器缺血性腦中風病因分型工具（繁體中文附英文專有名詞）。非 Massachusetts General Hospital (MGH) 官方 CCS 網站、非 TOAST/ASCOD 官方軟體，亦非經認證之臨床醫療器材。

- 公開網址：<https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/>
- 分型說明書與真實影像圖譜：<https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/guide.html>
- GitHub Repository：<https://github.com/a7662888/ischemic-stroke-subtyping-zh-TW>

## 作者與授權

- 設計與實作：**馬偕紀念醫院 陳培豪醫師**（Pei-Hao Chen, MD, Mackay Memorial Hospital）。本工具為作者個人學術作品，不代表馬偕紀念醫院官方立場。
- © 2026 陳培豪 版權所有。限臨床與學術非營利使用；轉載、改作、嵌入其他系統、引用於出版品或商業用途，須事先取得作者書面授權。完整條款見 [LICENSE](LICENSE)。
- 建議引用：Chen PH. Computerized Ischemic Stroke Etiologic Subtyping System (TOAST / MGH CCS / ASCOD), v2.1.0. 2026. https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/
- 錯誤回報與建議：網站下方「錯誤回報 / 建議」表單（以使用者自己的郵件程式寄出，網站本身不傳送資料）。

## v2.1.0 修正與新增（2026-11-27 程式審查）

- **分型引擎修正**：僅做 TEE（未做 TTE）時，TOAST／CCS／ESUS 不再誤判為檢查不完整（與 ASCOD C 一致）；選「尚未執行腦部影像」或「尚未執行腦血管影像」時，梗塞型態、SVD、狹窄等欄位改為停用且不參與計算（先前預設值會悄悄影響 TOAST LAA、CCS SAO 與 RoPE 皮質分）；ASCOD A 在血管影像不完整時，已見之 A1／A2 病灶不再被蓋為 A9；ASCO 2009 對照僅在 50–69% 被評為 A1 時才降為 A2。
- **介面修正**：剪貼簿 API 不可用時「複製摘要」不再誤報成功（加入備援複製）；ⓘ 說明框滑鼠移開即關閉；中英文語言設定在計算器與說明書間以 `?lang=en` 延續。
- **新增**：錯誤回報／建議表單（含可識別個資偵測提醒）、作者與授權聲明、複製摘要自動附出處與版本、LICENSE。

## v2.0.0 功能升級
- **繁體中文 / English 雙語切換**：繁中採用台灣臨床神經學慣用語，英文採用 AHA/ASA 與國際中風醫學術語。
- **互動式名詞定義懸停/點擊說明 (`ⓘ`)**：涵蓋臨床症候群、腦部與血管影像閾值、全部 23 項心臟來源與 10 項少見病因。
- **獨立分頁詳細說明書與真實臨床神經影像圖譜 (`guide.html`)**：收錄 TOAST、MGH CCS 決策樹、ASCOD 與 2014–2026 現代延伸完整手冊，以及 8 組 CC BY 4.0 真實腦部 MRI-DWI、CTA、MRA、HR-VWI 與 DSA 影像（支援點擊放大與篩選）。
- **文獻 DOI / PMID 超連結**：每筆實證文獻與圖譜出處皆附可點擊之 `https://doi.org/...` 與 PubMed 連結。

## 涵蓋分型與實證架構

1. **TOAST (Adams et al., *Stroke* 1993; PMID `7678184`)**：五大主型與 Probable / Possible 分級、雙重病因歸入未確定型。
2. **MGH CCS / SSS-TOAST (Ay et al., *Ann Neurol* 2005 / *Stroke* 2007 / Arsava et al., *Neurology* 2010)**：實證權重 Evident / Probable / Possible、心因性 ≥2% 年風險門檻、5/8/16 亞型與 Phenotypic 輸出、競爭機制決策樹。
3. **ASCOD (Amarenco et al., *Cerebrovasc Dis* 2013; PMID `23899749`) & ASCO (2009)**：A-S-C-O-D 五軸平行分級 (`1/2/3/0/9`)，含 2009 版 70% 狹窄與動脈剝離歸於 O 之對照。
4. **2014–2026 現代臨床延伸判讀**：ESUS (Hart 2014/2017)、RoPE (Kent 2013) 與 PASCAL (Kent 2021)、SyNC (Goyal 2020)、Carotid Web (Mac Grory 2021)、Atrial Cardiopathy (ARCADIA 2024)、AHA 2026 Cancer-Related Ischemic Stroke (CRIS; Navi 2026 / Gon 2026)。

## 隱私與架構

- **純瀏覽器計算**：無後端、無 API、無 Cookie、`localStorage`、`sessionStorage`、Service Worker 或第三方字型/分析追蹤。
- **無可識別個資欄位**：不收姓名、病歷號、出生年月日、醫院、自由文字或檔案上傳。

## 本機預覽與測試

需透過本機 HTTP 伺服器載入 ES modules（勿直接雙擊 `index.html`）：

```powershell
py -3 -m http.server 8792 --bind 127.0.0.1
```

開啟 <http://127.0.0.1:8792/>。

```powershell
node --test tests/*.test.js
node scripts/build.mjs --check
```

## 檔案與文獻紀錄

- 實證檢索與原文規則萃取：[EVIDENCE_REGISTRY.md](EVIDENCE_REGISTRY.md)
- 文獻出處與實作決策：[SOURCES.md](SOURCES.md)
- 資安與隱私設計：[SECURITY.md](SECURITY.md)
- 測試與多裝置驗收紀錄：[QA.md](QA.md)
