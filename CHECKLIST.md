# Project Checklist — Ischemic Stroke Subtyping Web App

- [x] Verify primary literature PMIDs/DOIs via PubMed E-utilities
- [x] Initialize git repository with `.gitignore` before any code
- [x] Complete batch full-text retrieval (`D:\secondbrain\Zotero\ft_cache\stroke_classification\`) & run `pdf_triage.js` (15/15 TextBased)
- [x] Extract verbatim criteria tables & tie-breaking rules into `EVIDENCE_REGISTRY.md` and `SOURCES.md`
- [x] Implement `data.js` & `calculator.js` (TOAST 1993, MGH CCS / SSS-TOAST 2005–2010, ASCOD 2013 / ASCO 2009, Modern 2014–2026 extensions)
- [x] Write & pass `tests/calculator.test.js` (`node --test tests/*.test.js` — 27/27 PASS)
- [x] Implement responsive UI (`index.html`, `styles.css`, `app.js`, `favicon.svg`) & `scripts/build.mjs`
- [x] Run multi-device Playwright visual & functional QA (`1440x1100`, `768x1024`, `844x390`, `390x844`, `320x740`) and inspect all screenshots
- [x] Run `web-app-security-review` (`scan_webapp.py`) and complete `QA.md`
- [x] Run reverse numerical/criteria audit against `EVIDENCE_REGISTRY.md`
- [ ] Publish Obsidian deliverable card (`vault_publish.py`)
- [ ] Present local build to user and await approval before any public GitHub Pages deployment
