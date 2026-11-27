import {
  VERSION,
  PRIMARY_SOURCES,
  CARDIAC_SOURCES,
  OTHER_ETIOLOGIES,
  EXAMPLES
} from './data.js';
import { GLOSSARY } from './glossary.js';
import { INDEX_I18N } from './i18n.js';
import { classifyStroke, formatPlainTextSummary } from './calculator.js';

const $ = id => document.getElementById(id);
const form = $('classification-form');

let currentLang = 'zh';
let lastResult = null;
let activeTipButton = null;
let pinnedByClick = false;

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}

// ---------------------------------------------------------------------------
// Interactive Glossary Popover (hover / focus / tap-safe, zero horizontal overflow)
// ---------------------------------------------------------------------------
const popover = $('glossary-popover');

function hidePopover() {
  popover.hidden = true;
  popover.replaceChildren();
  pinnedByClick = false;
  if (activeTipButton) {
    activeTipButton.setAttribute('aria-expanded', 'false');
    activeTipButton = null;
  }
}

function showPopover(btn, key, pinned = false) {
  const entry = GLOSSARY[key]?.[currentLang];
  if (!entry) return;
  if (activeTipButton && activeTipButton !== btn) {
    activeTipButton.setAttribute('aria-expanded', 'false');
  }
  activeTipButton = btn;
  pinnedByClick = pinned;
  btn.setAttribute('aria-expanded', 'true');

  popover.replaceChildren();
  const head = el('div', null, 'popover-head');
  head.append(el('strong', entry.title));
  const closeBtn = el('button', '✕', 'popover-close');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', currentLang === 'en' ? 'Close definition' : '關閉說明');
  closeBtn.addEventListener('click', hidePopover);
  head.append(closeBtn);

  const def = el('p', entry.def, 'popover-def');
  const crit = el('p', `${currentLang === 'en' ? 'Source: ' : '出處：'}${entry.criteria}`, 'popover-meta');
  const imp = el('p', `${currentLang === 'en' ? 'Classification impact: ' : '分型影響：'}${entry.impact}`, 'popover-impact');
  popover.append(head, def, crit, imp);

  popover.hidden = false;

  // Position safely inside viewport
  if (window.innerWidth < 700) {
    popover.style.left = '12px';
    popover.style.right = '12px';
    popover.style.width = 'auto';
    popover.style.top = `${Math.min(window.scrollY + window.innerHeight - popover.offsetHeight - 16, Math.max(window.scrollY + 12, btn.getBoundingClientRect().bottom + window.scrollY + 8))}px`;
  } else {
    popover.style.right = 'auto';
    popover.style.width = '340px';
    const rect = btn.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    if (left + 356 > window.innerWidth) {
      left = Math.max(12, window.innerWidth - 356);
    }
    let top = rect.bottom + window.scrollY + 8;
    if (rect.bottom + popover.offsetHeight + 16 > window.innerHeight && rect.top > popover.offsetHeight + 16) {
      top = rect.top + window.scrollY - popover.offsetHeight - 8;
    }
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }
}

function attachTipButton(parentEl, key) {
  if (!GLOSSARY[key]) return;
  const btn = el('button', 'ⓘ', 'info-tip');
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', currentLang === 'en' ? 'Show term definition' : '檢視名詞實證定義');
  btn.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover)').matches && !pinnedByClick) showPopover(btn, key, false);
  });
  btn.addEventListener('focus', () => {
    if (!pinnedByClick) showPopover(btn, key, false);
  });
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    if (pinnedByClick && activeTipButton === btn && !popover.hidden) hidePopover();
    else showPopover(btn, key, true);
  });
  parentEl.append(' ', btn);
}

function initStaticFieldTips() {
  for (const label of document.querySelectorAll('label[data-glossary]')) {
    attachTipButton(label, label.getAttribute('data-glossary'));
  }
}

document.addEventListener('click', e => {
  if (!popover.hidden && !popover.contains(e.target) && !e.target.classList.contains('info-tip')) {
    hidePopover();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !popover.hidden) hidePopover();
});

// ---------------------------------------------------------------------------
// Dynamic Builders (Checklists, Examples, Citations, Mobile Tables)
// ---------------------------------------------------------------------------
function buildChecklists() {
  const checkedCardiac = new Set(new FormData(form).getAll('cardiacSources'));
  const cardiacBox = $('cardiac-checklist');
  cardiacBox.replaceChildren();
  for (const item of CARDIAC_SOURCES) {
    const row = el('div', null, 'check-row');
    const label = el('label', null, 'check-item');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'cardiacSources';
    cb.value = item.id;
    cb.checked = checkedCardiac.has(item.id);
    label.append(cb, el('span', currentLang === 'en' ? item.labelEn : item.labelZh));
    row.append(label);
    attachTipButton(row, item.id);
    cardiacBox.append(row);
  }

  const checkedOther = new Set(new FormData(form).getAll('otherEtiologies'));
  const otherBox = $('other-checklist');
  otherBox.replaceChildren();
  for (const item of OTHER_ETIOLOGIES) {
    const row = el('div', null, 'check-row');
    const label = el('label', null, 'check-item');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'otherEtiologies';
    cb.value = item.id;
    cb.checked = checkedOther.has(item.id);
    label.append(cb, el('span', currentLang === 'en' ? item.labelEn : item.labelZh));
    row.append(label);
    attachTipButton(row, item.id);
    otherBox.append(row);
  }
}

function buildExamples() {
  const sel = $('example-select');
  const prev = sel.value;
  sel.replaceChildren();
  const defOpt = el('option', INDEX_I18N[currentLang].exampleDefault);
  defOpt.value = '';
  sel.append(defOpt);
  for (const ex of EXAMPLES) {
    const opt = el('option', currentLang === 'en' ? ex.titleEn : ex.title);
    opt.value = ex.id;
    sel.append(opt);
  }
  if (prev) sel.value = prev;
}

function buildCitations() {
  const list = $('citations-list');
  list.replaceChildren();
  for (const src of PRIMARY_SOURCES) {
    const li = document.createElement('li');
    const title = el('strong', src.short);
    const roleText = currentLang === 'en' ? src.roleEn : src.role;
    const cit = el('p', `${src.citation} — ${roleText} `);

    const doiLink = el('a', `DOI: ${src.doi} ↗`, 'ref-link');
    doiLink.href = `https://doi.org/${src.doi}`;
    doiLink.target = '_blank';
    doiLink.rel = 'noopener noreferrer';

    const pmidLink = el('a', `PMID: ${src.pmid} ↗`, 'ref-link');
    pmidLink.href = src.url;
    pmidLink.target = '_blank';
    pmidLink.rel = 'noopener noreferrer';

    cit.append(doiLink, ' · ', pmidLink);
    li.append(title, cit);
    list.append(li);
  }
}

function prepareMobileTables() {
  for (const table of document.querySelectorAll('.reference-table table')) {
    table.classList.add('mobile-cards');
    const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
    for (const tr of table.querySelectorAll('tbody tr')) {
      [...tr.children].forEach((td, idx) => {
        if (headers[idx]) td.setAttribute('data-label', headers[idx]);
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Language Switcher
// ---------------------------------------------------------------------------
function applyLanguage(lang) {
  currentLang = lang;
  hidePopover();
  const t = INDEX_I18N[lang];
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant-TW';
  document.title = t.docTitle;

  $('wordmark-title').textContent = t.wordmarkTitle;
  $('wordmark-sub').textContent = t.wordmarkSub;
  $('nav-assess').textContent = t.navAssess;
  $('nav-compare').textContent = t.navCompare;
  $('nav-manual').textContent = t.navManual;
  $('nav-sources').textContent = t.navSources;
  $('lang-toggle').textContent = t.langToggle;
  $('lang-toggle').setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');

  $('hero-h1').textContent = t.heroH1;
  $('hero-lead').textContent = t.heroLead;
  $('privacy-title').textContent = t.privacyTitle;
  $('privacy-p1').textContent = t.privacyP1;
  $('privacy-p2').textContent = t.privacyP2;
  $('form-heading').textContent = t.formHeading;
  $('reset').textContent = t.resetBtn;
  $('mobile-jump').textContent = t.mobileJump;
  $('result-heading').textContent = t.resultHeading;
  $('copy-summary').textContent = t.copyBtn;
  $('audit-summary').textContent = t.auditSummary;
  $('compare-title').textContent = t.compareTitle;
  $('compare-lead').textContent = t.compareLead;
  $('sources-title').textContent = t.sourcesTitle;
  $('sources-lead').textContent = t.sourcesLead;
  $('footer-left').textContent = t.footerLeft;
  $('footer-right').textContent = t.footerRight;
  $('cardiac-checklist-title').textContent = t.cardiacTitle;
  $('other-checklist-title').textContent = t.otherTitle;
  $('modern-tag').textContent = lang === 'en' ? '2014–2026 Modern Extensions' : '2014–2026 現代臨床延伸判讀';

  for (const link of document.querySelectorAll('.manual-mini-link')) {
    link.textContent = t.manualLinkShort;
  }

  for (const panel of document.querySelectorAll('.domain-panel')) {
    const idx = Number(panel.getAttribute('data-domain'));
    const d = t.domains[idx];
    if (d) {
      panel.querySelector('.domain-title').textContent = d.title;
      panel.querySelector('.domain-desc').textContent = d.desc;
    }
  }

  for (const fieldEl of document.querySelectorAll('.field[data-field]')) {
    const key = fieldEl.getAttribute('data-field');
    const meta = t.fields[key];
    if (!meta) continue;
    const lbl = fieldEl.querySelector('label');
    if (lbl) {
      const tip = lbl.querySelector('.info-tip');
      lbl.textContent = meta.label;
      if (tip) {
        tip.setAttribute('aria-label', lang === 'en' ? 'Show term definition' : '檢視名詞實證定義');
        lbl.append(' ', tip);
      }
    }
    const help = fieldEl.querySelector('.field-copy p');
    if (help) help.textContent = meta.help;
    const sel = fieldEl.querySelector('select');
    if (sel) {
      for (const opt of sel.options) {
        if (meta.opts[opt.value]) opt.textContent = meta.opts[opt.value];
      }
    }
  }

  buildChecklists();
  buildExamples();
  buildCitations();
  render();
}

// ---------------------------------------------------------------------------
// State & Rendering
// ---------------------------------------------------------------------------
function readFormState() {
  const fd = new FormData(form);
  const data = {};
  for (const [k, v] of fd.entries()) {
    if (k === 'cardiacSources' || k === 'otherEtiologies') continue;
    data[k] = v;
  }
  data.cardiacSources = fd.getAll('cardiacSources');
  data.otherEtiologies = fd.getAll('otherEtiologies');
  return data;
}

function toggleDynamicSubfields(raw) {
  const hasPfo = raw.cardiacSources.includes('pfo');
  for (const node of document.querySelectorAll('.pfo-sub')) node.hidden = !hasPfo;
  const hasCancer = raw.activeCancer === 'yes';
  for (const node of document.querySelectorAll('.cancer-sub')) node.hidden = !hasCancer;
}

function render() {
  const raw = readFormState();
  toggleDynamicSubfields(raw);
  const res = classifyStroke(raw, currentLang);
  lastResult = res;
  const t = INDEX_I18N[currentLang];
  const isEn = currentLang === 'en';

  $('toast-label').textContent = `${isEn ? res.toast.labelEn : res.toast.labelZh} [${res.toast.code}]`;
  $('toast-reason').textContent = res.toast.reasons.join(' ');

  $('ccs-5').textContent = `${res.ccs.subtype5} (${res.ccs.confidence})`;
  $('ccs-8-16').textContent = `8-Subtype: ${res.ccs.subtype8} ｜ 16-Subtype: ${res.ccs.subtype16}`;
  const phenoBox = $('ccs-pheno');
  phenoBox.replaceChildren();
  for (const [name, status] of [
    ['LAA', res.ccs.phenotypic.laa],
    ['CE', res.ccs.phenotypic.ce],
    ['SAO', res.ccs.phenotypic.sao],
    ['Other', res.ccs.phenotypic.other]
  ]) {
    phenoBox.append(el('span', `${name}: ${status}`, `pheno-pill${status !== 'absent' ? ' active' : ''}`));
  }

  const ascodBox = $('ascod-strip');
  ascodBox.replaceChildren();
  for (const letter of ['A', 'S', 'C', 'O', 'D']) {
    const g = res.ascod.details[letter].grade;
    const badge = el('div', `${letter}${g}`, `ascod-badge grade-${g}`);
    badge.append(el('small', t.gradeDesc[g]));
    ascodBox.append(badge);
  }
  const ascoLabel = isEn ? 'ASCO (2009) equivalent: ' : 'ASCO (2009) 對照：';
  $('asco-compat').textContent = res.ascod.ascoDeltaNotes.length > 0
    ? `${ascoLabel}${res.ascod.ascoCode} (${res.ascod.ascoDeltaNotes.join(' ')})`
    : `${ascoLabel}${res.ascod.ascoCode}`;

  $('esus-box').textContent = `${t.esusPrefix[res.modern.esus.status]}: ${res.modern.esus.reason}`;

  const pfoBox = $('pfo-box');
  pfoBox.replaceChildren();
  if (res.modern.pfo.applicable) {
    pfoBox.hidden = false;
    const p = res.modern.pfo;
    const title = isEn
      ? `RoPE Score: ${p.ropeScore} / 10${p.ageKnown ? '' : ' (age unspecified)'} | PASCAL: ${p.pascalEffect.en}`
      : `RoPE 分數：${p.ropeScore} / 10${p.ageKnown ? '' : '（未選年齡層，暫以 0 分計）'} ｜ PASCAL：${p.pascalEffect.zh}`;
    const body = isEn
      ? `Attributable fraction ${p.afBand.af} · 2-yr recurrence ${p.afBand.rec2y} · Closure ${p.pascalEffect.hr}. ${p.note}`
      : `歸因分率 ${p.afBand.af} · 2 年復發率 ${p.afBand.rec2y} · 封堵效果 ${p.pascalEffect.hr}。${p.note}`;
    pfoBox.append(el('strong', title), el('p', body));
  } else {
    pfoBox.hidden = true;
  }

  const flagsList = $('modern-flags');
  flagsList.replaceChildren();
  for (const f of res.modern.flags) {
    flagsList.append(el('li', `${f.title}: ${f.detail}`));
  }

  const workupList = $('missing-workup');
  workupList.replaceChildren();
  for (const w of res.modern.missingWorkup) {
    workupList.append(el('li', `${isEn ? 'Pending: ' : '建議補齊：'}${w}`));
  }

  const audit = $('audit-content');
  audit.replaceChildren();
  const addAuditGroup = (title, lines) => {
    const grp = el('div', null, 'audit-group');
    grp.append(el('strong', title));
    for (const line of lines) grp.append(el('p', line));
    audit.append(grp);
  };
  addAuditGroup(t.auditLabels.ccs, res.ccs.trace);
  addAuditGroup(t.auditLabels.ascod, ['A', 'S', 'C', 'O', 'D'].map(k => `${k}${res.ascod.details[k].grade}: ${res.ascod.details[k].notes.join(' ')}`));
  addAuditGroup(t.auditLabels.toast, res.toast.reasons);
}

function applyExample(exampleId) {
  const ex = EXAMPLES.find(e => e.id === exampleId);
  if (!ex) return;
  form.reset();
  for (const [key, val] of Object.entries(ex.data)) {
    if (key === 'cardiacSources' || key === 'otherEtiologies') {
      const set = new Set(val);
      for (const cb of form.querySelectorAll(`input[name="${key}"]`)) {
        cb.checked = set.has(cb.value);
      }
    } else if (form.elements[key]) {
      form.elements[key].value = val;
    }
  }
  const title = currentLang === 'en' ? ex.titleEn : ex.title;
  const sub = currentLang === 'en' ? ex.subtitleEn : ex.subtitle;
  $('example-note').textContent = `${currentLang === 'en' ? 'Loaded teaching vignette: ' : '已載入教學範例：'}${title} — ${sub}`;
  $('example-note').hidden = false;
  const panels = form.querySelectorAll('.domain-panel');
  if (ex.data.cardiacSources.length > 0 && panels[3]) panels[3].open = true;
  if (ex.data.otherEtiologies.length > 0 && panels[4]) panels[4].open = true;
  render();
}

form.addEventListener('submit', e => e.preventDefault());
form.addEventListener('change', () => {
  $('example-note').hidden = true;
  $('example-select').value = '';
  render();
});

$('example-select').addEventListener('change', e => {
  if (e.target.value) applyExample(e.target.value);
});

$('reset').addEventListener('click', () => {
  form.reset();
  $('example-select').value = '';
  $('example-note').hidden = true;
  render();
});

$('lang-toggle').addEventListener('click', () => {
  applyLanguage(currentLang === 'zh' ? 'en' : 'zh');
});

$('copy-summary').addEventListener('click', async () => {
  if (!lastResult) return;
  const t = INDEX_I18N[currentLang];
  const text = formatPlainTextSummary(lastResult, currentLang);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    }
    $('copy-feedback').textContent = t.copyOk;
    $('copy-feedback').hidden = false;
    setTimeout(() => { $('copy-feedback').hidden = true; }, 2500);
  } catch {
    $('copy-feedback').textContent = t.copyFail;
    $('copy-feedback').hidden = false;
  }
});

window.addEventListener('pageshow', () => {
  form.reset();
  $('example-select').value = '';
  $('example-note').hidden = true;
  render();
});

$('version').textContent = VERSION;
initStaticFieldTips();
buildChecklists();
buildExamples();
buildCitations();
prepareMobileTables();
render();
