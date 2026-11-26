# QA and Release Evidence (`QA.md`)

Review date: `2026-11-27` (Asia/Taipei). Synthetic inputs only. No real patient data was used, collected, or committed.

## 1. Literature & Evidence Verification

- PubMed E-utilities (`esearch` / `esummary`) verified all 20 primary citations (PMIDs/DOIs).
- `pdf_triage.js` verified **15/15** downloaded PDFs in `D:\secondbrain\Zotero\ft_cache\stroke_classification\` as `TextBased` (confidence `1.00`, 0 failures), supplemented by 2 PMC full-text XMLs (`ARCADIA_2024`, `Lavallee_2023`) and 2 abstracts + 1 metadata entry cross-verified in full text (`ASCO_2009` deltas in `Amarenco_2013`; `ESUS_2014` Table 1 in `Hart_2017`; `AHA_Cancer_2026` CRIS rules in `Gon_2026`).
- Reverse numerical & criteria audit against `EVIDENCE_REGISTRY.md` caught and refined two edge rules (`mitral_stenosis` AF-dependency in TOAST 1993 Table 3; `bioprosthetic_valve` C2 in ASCOD 2013 Table 2).

## 2. Unit Tests & Static Build

- `node --test tests/*.test.js`: **27/27 PASS** (`85.7 ms`).
- `node scripts/build.mjs` & `node scripts/build.mjs --check`: **PASS** (`docs/` matches root source allowlist + `.nojekyll`).

## 3. Local Runtime & Multi-Device Visual QA

Executed `scripts/browser-qa.cjs` via Playwright Chromium against `http://127.0.0.1:8792/`:

- **Functional PASS:** All 5 synthetic vignettes, dynamic PFO/cancer subfield toggling, reset/reload clearing, zero uncaught JS errors.
- **Network & Privacy PASS:** `0` additional network requests on input interactions, same-origin GET assets only (`12` initial asset requests), `localStorage: 0`, `sessionStorage: 0`, `cookie: ""`, `serviceWorker: false`.
- **Multi-Device Responsive Layout PASS (all screenshots visually inspected):**
  - Desktop `1440×1100`: 2-column sticky layout, clean typography.
  - Tablet portrait `768×1024`: `overflow: false`, `minFont: 12px`.
  - Mobile landscape `844×390`: `overflow: false`, `minFont: 12px`.
  - Mobile portrait `390×844` (including scrolled result dashboard & card-reflow comparison table): `overflow: false`, `minFont: 12px`.
  - Mobile narrow `320×740`: `overflow: false`, `minFont: 12px`.

## 4. Four-Stage Security Review (`web-app-security-review`)

| Stage | Verdict / Evidence | Findings and Disposition |
|---|---|---|
| A — Source | PASS for static local computation. Pure DOM (`createElement` + `textContent`) in `app.js`; allowlist validation in `calculator.js`. `scan_webapp.py` reported 0 secrets, 0 client endpoints, 0 `innerHTML` assignments. | No S1/S2 finding. |
| B — Transport | Local loopback HTTP 200; production target (GitHub Pages) provides HTTPS. Meta CSP (`default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'`) and `Referrer-Policy: no-referrer` embedded in `index.html`. | S4 residual: static hosting omits HTTP response headers (`X-Frame-Options`, `X-Content-Type-Options`, HTTP `CSP`). |
| C — Storage / Public Surface | Zero backend, database, or upload endpoint. `.gitignore` committed first; `qa/`, `*.pdf`, `*.csv`, `*.xlsx` excluded. | No patient data or credentials in git history. |
| D — Governance | Public notice states browser-only local computation, research/clinical decision-support scope, non-official status, and prohibition of identifiable patient data. | Collecting identifiable clinical records (Taiwan PDPA §6) is out of scope and prohibited without a new controlled backend, IRB, and security review. |

**Release decision: CONDITIONAL — approved as a browser-only clinical/research classification calculator within this reviewed scope; NOT approved to collect identifiable patient records.**

## 5. Live Publication (`2026-11-27`)

- Public repository: <https://github.com/a7662888/ischemic-stroke-subtyping-zh-TW>
- Public application: <https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/>
- Deployed commit: `d2ed0f7` (`main:/docs`, `https_enforced: true`); GitHub Actions `CI` (`45873480775`) & `pages-build-deployment` (`45873474504`) both `completed success`.
- Live Playwright QA against public URL: **PASS** (`768×1024`, `844×390`, `390×844`, `320×740`, `0` overflow, `minFont: 12px`, `0` storage/cookies, `0` JS errors). Live screenshots visually inspected (`qa/live/`).
- Live passive scanner (`scan_webapp.py --tier 2 --repo a7662888/ischemic-stroke-subtyping-zh-TW`): HTTP 200, `Strict-Transport-Security: max-age=31556952`, 0 secrets, 0 client endpoints, 0 `innerHTML`, repo `PUBLIC`. Static-host residual header limitations accepted and documented in `SECURITY.md`.
- Public asset bytes independently compared with local `docs/` assets (**6/6 MATCH**):

| Asset | SHA-256 |
|---|---|
| `index.html` | `222482ef3cc27f03a11f2a6ff5cb97a8bbd075317a3700cf0cf1484d2dfa695c` |
| `styles.css` | `8f98e64b48edf201cab7fe246d264f3c53d60cd7d3a03435dd23c2db1431cc07` |
| `app.js` | `c4d4447064dafb41b54d4243c9c4d1462efe8a50a3402ff07ba379637ea52e45` |
| `calculator.js` | `7509c2769da55accb4bd8d699c0dd2a6f0ac1f8b669454387b9f0db6bd1ee0f5` |
| `data.js` | `b46f44da35cadc2fc6e814f572d76a766e56f3d4f93eea8580202162f61a2690` |
| `favicon.svg` | `ac70b2c17fe27177f030c0e8615b80ec34a21a57e7e0e47104b868b85abb428c` |
