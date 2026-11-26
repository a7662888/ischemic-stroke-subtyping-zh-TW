# Deployment

Owner: a7662888. User approved public repository and GitHub Pages in this chat on 2026-11-27.

- Repository: https://github.com/a7662888/ischemic-stroke-subtyping-zh-TW
- Website: https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/
- Architecture: static HTML/CSS/ES modules; no backend, process, environment variables, secrets, or database.
- Build: `node scripts/build.mjs`; publish `main:/docs` with GitHub Pages.
- Validation: `node --test tests/*.test.js`, `node scripts/build.mjs --check`, local and live browser checks, `QA.md`.
- Rollback: revert the offending commit, rebuild `docs/`, and push. For urgent removal, disable GitHub Pages in repository settings. No submitted user-data store exists.
- Public scope: interface, documented literature parameters, and independent classification engine. No member-only content or patient inputs.
- Residual hosting limitations: static provider connection metadata and HTTP security headers, documented in `SECURITY.md` and `QA.md`.
