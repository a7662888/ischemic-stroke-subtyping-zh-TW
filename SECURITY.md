# Privacy and Security Decisions

## Six Pre-Build Decisions (`web-app-build`)

1. **Minimum inputs:** Structured clinical syndrome, neuroimaging pattern/size, vascular imaging findings, cardiac workup/sources, and other etiologies only. No name, chart number, ID number, birthday, email, hospital, free text, file uploads, or real-patient records.
2. **Data location:** Current browser page memory only. No backend, API, cookies, `localStorage`, `sessionStorage`, URL parameters, service worker, analytics, or remote fonts/CDNs. The application makes zero network requests containing clinical inputs. Static hosting providers (e.g., GitHub Pages) process ordinary HTTP connection metadata (such as IP addresses).
3. **Who writes:** The user changes their current in-memory form. There is no remote read/write endpoint, database, or rate-limiting surface. Only repository maintainers can modify published static files.
4. **Never in version control:** Credentials, patient data, exports, logs, and local QA artifacts (`qa/`, `*.pdf`, `*.csv`, `*.xlsx`) are excluded via `.gitignore` from the very first commit. No CI step collects inputs or commits generated datasets.
5. **User notice:** The page clearly states browser-only local computation, research/clinical decision-support scope (not an official MGH/TOAST/ASCOD tool or certified medical device), and does not claim encrypted storage or absolute anonymity. No upload consent is requested because no upload exists.
6. **Retention and owner:** Application memory is cleared on page reload, `pageshow` navigation, or explicit reset. Browser/OS memory recovery and hosting access logs are outside application control. Repository owner controls deletion/rollback.

## Technical Controls

- Fixed allowlist validation in `calculator.js` for every enum and multi-select value.
- Pure DOM construction (`document.createElement` + `textContent`) in `app.js`; zero `innerHTML` or HTML parsing of user input.
- Strict Content Security Policy via HTML meta:
  `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'`
- `Referrer-Policy: no-referrer` via HTML meta; all external literature links use `rel="noopener noreferrer"`.
- Form submission prevented (`event.preventDefault()`) and blocked by `form-action 'none'`.
- Static-host limitation: GitHub Pages does not allow custom HTTP response headers (`X-Frame-Options`, `X-Content-Type-Options`, HTTP-header `CSP`); documented as residual S4 risk.

## Scope Boundary

Approved scope is a **public, browser-only clinical/research classification calculator**. It is **not approved** to collect, transmit, or store identifiable medical or research-participant records (Taiwan PDPA §6 special personal data).
