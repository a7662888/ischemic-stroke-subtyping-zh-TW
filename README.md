# 缺血性腦中風電腦化病因分型系統 · 繁體中文

依公開同儕審查文獻獨立實作之純瀏覽器缺血性腦中風病因分型工具（繁體中文附英文專有名詞）。非 Massachusetts General Hospital (MGH) 官方 CCS 網站、非 TOAST/ASCOD 官方軟體，亦非經認證之臨床醫療器材。

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
