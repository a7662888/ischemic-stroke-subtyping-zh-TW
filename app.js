import {
  VERSION,
  PRIMARY_SOURCES,
  CARDIAC_SOURCES,
  OTHER_ETIOLOGIES,
  EXAMPLES
} from './data.js';
import { classifyStroke, formatPlainTextSummary } from './calculator.js';

const $ = id => document.getElementById(id);
const form = $('classification-form');

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}

// Populate cardiac & other etiology checklists safely
function buildChecklists() {
  const cardiacBox = $('cardiac-checklist');
  for (const item of CARDIAC_SOURCES) {
    const label = el('label', null, 'check-item');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'cardiacSources';
    cb.value = item.id;
    label.append(cb, el('span', item.labelZh));
    cardiacBox.append(label);
  }

  const otherBox = $('other-checklist');
  for (const item of OTHER_ETIOLOGIES) {
    const label = el('label', null, 'check-item');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'otherEtiologies';
    cb.value = item.id;
    label.append(cb, el('span', item.labelZh));
    otherBox.append(label);
  }
}

// Populate example selector
function buildExamples() {
  const sel = $('example-select');
  for (const ex of EXAMPLES) {
    const opt = el('option', ex.title);
    opt.value = ex.id;
    sel.append(opt);
  }
}

// Populate citations list
function buildCitations() {
  const list = $('citations-list');
  for (const src of PRIMARY_SOURCES) {
    const li = document.createElement('li');
    const title = el('strong', src.short);
    const cit = el('p', `${src.citation} PMID: ${src.pmid} · DOI: ${src.doi} — ${src.role}`);
    const link = el('a', 'PubMed ↗');
    link.href = src.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    cit.append(' ', link);
    li.append(title, cit);
    list.append(li);
  }
}

// Add data-label attributes to reference tables for mobile card reflow
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
  for (const node of document.querySelectorAll('.pfo-sub')) {
    node.hidden = !hasPfo;
  }
  const hasCancer = raw.activeCancer === 'yes';
  for (const node of document.querySelectorAll('.cancer-sub')) {
    node.hidden = !hasCancer;
  }
}

let lastResult = null;

function render() {
  const raw = readFormState();
  toggleDynamicSubfields(raw);
  const res = classifyStroke(raw);
  lastResult = res;

  // 1. TOAST
  $('toast-label').textContent = `${res.toast.labelZh} [${res.toast.code}]`;
  $('toast-reason').textContent = res.toast.reasons.join(' ');

  // 2. MGH CCS
  $('ccs-5').textContent = `${res.ccs.subtype5} (${res.ccs.confidence})`;
  $('ccs-8-16').textContent = `8-Subtype: ${res.ccs.subtype8} ｜ 16-Subtype: ${res.ccs.subtype16}`;
  const phenoBox = $('ccs-pheno');
  phenoBox.replaceChildren();
  const phenoLabels = [
    ['LAA', res.ccs.phenotypic.laa],
    ['CE', res.ccs.phenotypic.ce],
    ['SAO', res.ccs.phenotypic.sao],
    ['Other', res.ccs.phenotypic.other]
  ];
  for (const [name, status] of phenoLabels) {
    const pill = el('span', `${name}: ${status}`, `pheno-pill${status !== 'absent' ? ' active' : ''}`);
    phenoBox.append(pill);
  }

  // 3. ASCOD
  const ascodBox = $('ascod-strip');
  ascodBox.replaceChildren();
  const gradeDesc = { 1: '致病', 2: '未定', 3: '附帶', 0: '無', 9: '未全' };
  for (const letter of ['A', 'S', 'C', 'O', 'D']) {
    const g = res.ascod.details[letter].grade;
    const badge = el('div', `${letter}${g}`, `ascod-badge grade-${g}`);
    badge.append(el('small', gradeDesc[g]));
    ascodBox.append(badge);
  }
  const ascoNote = res.ascod.ascoDeltaNotes.length > 0
    ? `ASCO (2009) 對照：${res.ascod.ascoCode}（${res.ascod.ascoDeltaNotes.join(' ')}）`
    : `ASCO (2009) 對照：${res.ascod.ascoCode}`;
  $('asco-compat').textContent = ascoNote;

  // 4. Modern Extensions
  const esusPrefix = res.modern.esus.status === 'met'
    ? 'ESUS 符合'
    : res.modern.esus.status === 'incomplete'
      ? 'ESUS 待補檢查'
      : 'ESUS 不適用';
  $('esus-box').textContent = `${esusPrefix}：${res.modern.esus.reason}`;

  const pfoBox = $('pfo-box');
  pfoBox.replaceChildren();
  if (res.modern.pfo.applicable) {
    pfoBox.hidden = false;
    const p = res.modern.pfo;
    pfoBox.append(
      el('strong', `RoPE 分數：${p.ropeScore} / 10${p.ageKnown ? '' : '（未選年齡層，暫以 0 分計）'} ｜ PASCAL：${p.pascalEffect.zh}`),
      el('p', `歸因分率 ${p.afBand.af} · 2 年復發率 ${p.afBand.rec2y} · 封堵效果 ${p.pascalEffect.hr}。${p.note}`)
    );
  } else {
    pfoBox.hidden = true;
  }

  const flagsList = $('modern-flags');
  flagsList.replaceChildren();
  for (const f of res.modern.flags) {
    flagsList.append(el('li', `${f.title}：${f.detail}`));
  }

  const workupList = $('missing-workup');
  workupList.replaceChildren();
  for (const w of res.modern.missingWorkup) {
    workupList.append(el('li', `建議補齊：${w}`));
  }

  // 5. Audit Trail
  const audit = $('audit-content');
  audit.replaceChildren();

  const addAuditGroup = (title, lines) => {
    const grp = el('div', null, 'audit-group');
    grp.append(el('strong', title));
    for (const line of lines) grp.append(el('p', line));
    audit.append(grp);
  };

  addAuditGroup('MGH CCS 決策樹軌跡', res.ccs.trace);
  addAuditGroup('ASCOD 各軸推論', ['A', 'S', 'C', 'O', 'D'].map(k => `${k}${res.ascod.details[k].grade}: ${res.ascod.details[k].notes.join(' ')}`));
  addAuditGroup('TOAST (1993) 判定', res.toast.reasons);
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
  $('example-note').textContent = `已載入教學範例：${ex.title} — ${ex.subtitle}`;
  $('example-note').hidden = false;
  // Open cardiac/other panels if example uses them
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

$('copy-summary').addEventListener('click', async () => {
  if (!lastResult) return;
  const text = formatPlainTextSummary(lastResult);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    }
    $('copy-feedback').hidden = false;
    setTimeout(() => { $('copy-feedback').hidden = true; }, 2500);
  } catch {
    $('copy-feedback').textContent = '瀏覽器未允許剪貼簿寫入，請於推論依據區手動複製。';
    $('copy-feedback').hidden = false;
  }
});

// Clear browser-restored values on reload / back navigation (zero persistence)
window.addEventListener('pageshow', () => {
  form.reset();
  $('example-select').value = '';
  $('example-note').hidden = true;
  render();
});

$('version').textContent = VERSION;
buildChecklists();
buildExamples();
buildCitations();
prepareMobileTables();
render();
