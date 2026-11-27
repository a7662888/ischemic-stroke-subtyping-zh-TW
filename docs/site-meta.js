// © 2026 Pei-Hao Chen, MD (陳培豪醫師), Mackay Memorial Hospital. All rights reserved.
// Non-commercial clinical and academic use only; see LICENSE.
//
// Shared author notice, language persistence (?lang=en) and the feedback form.
// The feedback form never transmits anything itself: it composes an e-mail and
// hands it to the visitor's own mail client (mailto:), so the page keeps its
// zero-network, connect-src 'none' / form-action 'none' guarantees.

const MAIL_USER = 'a7662888';
const MAIL_DOMAIN = 'gmail.com';
const feedbackAddress = () => `${MAIL_USER}@${MAIL_DOMAIN}`;

export const SITE_URL = 'https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/';
export const REPO_URL = 'https://github.com/a7662888/ischemic-stroke-subtyping-zh-TW';

const NOTICE = {
  zh: {
    author: '設計與實作：馬偕紀念醫院 陳培豪醫師',
    rights: '© 2026 陳培豪 版權所有。本網站之程式碼、中英文說明、介面設計與教學案例限臨床與學術非營利使用；轉載、改作、嵌入其他系統、引用於出版品或任何商業用途，請先來信告知並取得作者書面授權。',
    scope: '本工具為作者個人學術作品，不代表馬偕紀念醫院官方立場；所依據之 TOAST、MGH CCS、ASCOD 等分型準則著作權屬原作者，臨床影像依各自 CC BY 4.0 授權標示出處。',
    citeLabel: '建議引用格式：',
    cite: version => `Chen PH. Computerized Ischemic Stroke Etiologic Subtyping System (TOAST / MGH CCS / ASCOD), ${version}. 2026. ${SITE_URL}`,
    license: '完整授權條款（LICENSE）',
    feedback: '錯誤回報與建議'
  },
  en: {
    author: 'Designed and developed by Pei-Hao Chen, MD, Mackay Memorial Hospital, Taiwan',
    rights: '© 2026 Pei-Hao Chen. All rights reserved. The source code, bilingual explanatory text, interface design and teaching vignettes are licensed for non-commercial clinical and academic use only. Redistribution, modification, embedding in other systems, reproduction in publications or any commercial use requires prior written permission from the author.',
    scope: 'This is the author\'s personal academic work and does not represent the official position of Mackay Memorial Hospital. The underlying TOAST, MGH CCS and ASCOD criteria remain the work of their original authors; clinical images are credited under their respective CC BY 4.0 licences.',
    citeLabel: 'Suggested citation: ',
    cite: version => `Chen PH. Computerized Ischemic Stroke Etiologic Subtyping System (TOAST / MGH CCS / ASCOD), ${version}. 2026. ${SITE_URL}`,
    license: 'Full licence terms (LICENSE)',
    feedback: 'Report an error or suggestion'
  }
};

// ---------------------------------------------------------------------------
// Language persistence across index.html <-> guide.html (no storage APIs)
// ---------------------------------------------------------------------------
export function getInitialLang() {
  try {
    return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export function syncLanguage(lang) {
  try {
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url);
  } catch {
    /* file:// or sandboxed contexts: language still works for this page */
  }
  for (const link of document.querySelectorAll('a[data-lang-link]')) {
    const [path, hash] = link.getAttribute('data-lang-link').split('#');
    link.href = `${path}${lang === 'en' ? '?lang=en' : ''}${hash ? `#${hash}` : ''}`;
  }
}

// ---------------------------------------------------------------------------
// Author / licence notice (rendered into <div id="author-notice">)
// ---------------------------------------------------------------------------
export function renderAuthorNotice(lang, version, feedbackHref) {
  const box = document.getElementById('author-notice');
  if (!box) return;
  const t = NOTICE[lang] || NOTICE.zh;
  const mk = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (text) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  };
  box.replaceChildren();
  box.append(mk('strong', t.author, 'author-name'));
  box.append(mk('p', t.rights));
  box.append(mk('p', t.scope));
  const cite = mk('p', null, 'author-cite');
  cite.append(mk('span', t.citeLabel), mk('code', t.cite(version)));
  box.append(cite);
  const links = mk('p', null, 'author-links');
  const lic = mk('a', `${t.license} ↗`);
  lic.href = `${REPO_URL}/blob/main/LICENSE`;
  lic.target = '_blank';
  lic.rel = 'noopener noreferrer';
  const fb = mk('a', t.feedback);
  fb.href = feedbackHref;
  links.append(lic, ' · ', fb);
  box.append(links);
}

// ---------------------------------------------------------------------------
// Feedback form (index.html #feedback)
// ---------------------------------------------------------------------------
const FB = {
  zh: {
    title: '錯誤回報與改進建議',
    lead: '發現分型結果與原始文獻不符、文字錯誤、版面問題，或有功能建議，歡迎回報給作者。',
    privacy: '本網站不會傳送任何資料。按下「以電子郵件寄出」後，會開啟您裝置上的郵件程式並帶入內容，由您確認後自行寄出。請勿填寫病人姓名、病歷號、身分證字號、出生日期等可識別個資。',
    typeLabel: '回報類型',
    types: {
      bug: '程式錯誤 / 分型結果有誤',
      rule: '分型規則或文獻出處疑義',
      suggestion: '功能或介面建議',
      wording: '翻譯、用語或錯字',
      other: '其他'
    },
    areaLabel: '相關部分',
    areas: {
      any: '不限 / 整體',
      toast: 'TOAST',
      ccs: 'MGH CCS / SSS-TOAST',
      ascod: 'ASCOD / ASCO',
      modern: '現代延伸（ESUS、PFO、SyNC、CRIS）',
      guide: '說明書與影像圖譜',
      ui: '介面、手機版或雙語'
    },
    msgLabel: '內容說明',
    msgPlaceholder: '例如：選擇 A 與 B 後，CCS 顯示為…，但依 Ay 2007 Table 2 應為…',
    attachLabel: '附上目前畫面的去識別化分型摘要（方便作者重現問題）',
    phiWarn: '內容似乎含有身分證字號、病歷號、電話或完整日期等可能識別個人之資訊，請刪除後再寄出。',
    phiConfirm: '我已確認內容不含任何可識別病人之資訊',
    send: '以電子郵件寄出',
    copy: '複製內容',
    empty: '請先填寫內容說明。',
    opened: '已嘗試開啟郵件程式。若沒有反應，請按「複製內容」，再貼到郵件寄給：',
    long: '內容較長，部分郵件程式可能截斷；建議改按「複製內容」後貼上寄出至：',
    copied: '已複製。請貼到郵件中寄給：',
    copyFail: '無法自動複製，請手動選取上方內容寄給：',
    issues: '亦可於 GitHub Issues 公開回報（公開可見，切勿貼上任何病例資料）↗',
    subject: (type, ver) => `[腦中風分型工具回報] ${type}（${ver}）`,
    bodyHeads: { type: '回報類型', area: '相關部分', msg: '內容說明', summary: '目前分型摘要（去識別化）', env: '環境資訊' }
  },
  en: {
    title: 'Report an Error or Suggest an Improvement',
    lead: 'Found a classification that disagrees with the source literature, a typo, a layout problem, or have a feature idea? Please let the author know.',
    privacy: 'This website transmits nothing. "Send by e-mail" opens the mail app on your device with the message pre-filled; you review and send it yourself. Do not include patient names, chart numbers, ID numbers, dates of birth or any other identifiable information.',
    typeLabel: 'Report type',
    types: {
      bug: 'Bug / incorrect classification',
      rule: 'Rule or citation question',
      suggestion: 'Feature or interface suggestion',
      wording: 'Translation, wording or typo',
      other: 'Other'
    },
    areaLabel: 'Related section',
    areas: {
      any: 'General',
      toast: 'TOAST',
      ccs: 'MGH CCS / SSS-TOAST',
      ascod: 'ASCOD / ASCO',
      modern: 'Modern extensions (ESUS, PFO, SyNC, CRIS)',
      guide: 'Manual and image atlas',
      ui: 'Interface, mobile or bilingual display'
    },
    msgLabel: 'Description',
    msgPlaceholder: 'e.g., With A and B selected, CCS shows …, but per Ay 2007 Table 2 it should be …',
    attachLabel: 'Attach the current de-identified classification summary (helps reproduce the issue)',
    phiWarn: 'The text appears to contain an ID number, chart number, phone number or full date that could identify a person. Please remove it before sending.',
    phiConfirm: 'I confirm the message contains no patient-identifiable information',
    send: 'Send by e-mail',
    copy: 'Copy message',
    empty: 'Please enter a description first.',
    opened: 'Your mail app should now open. If nothing happens, use "Copy message" and send it to:',
    long: 'The message is long and some mail apps may truncate it; consider "Copy message" and paste it into an e-mail to:',
    copied: 'Copied. Paste it into an e-mail to:',
    copyFail: 'Automatic copy failed; please select the text manually and send it to:',
    issues: 'Or report publicly on GitHub Issues (publicly visible — never post case data) ↗',
    subject: (type, ver) => `[Stroke Subtyping Tool] ${type} (${ver})`,
    bodyHeads: { type: 'Type', area: 'Section', msg: 'Description', summary: 'Current classification summary (de-identified)', env: 'Environment' }
  }
};

// Patterns that suggest identifiable data: Taiwan national ID / ARC, long digit runs
// (chart numbers), Taiwan mobile numbers, full calendar dates.
const PHI_PATTERNS = [
  /\b[A-Z][1289]\d{8}\b/i,
  /\d{7,}/,
  /\b09\d{2}[-\s]?\d{3}[-\s]?\d{3}\b/,
  /\b(19|20)\d{2}[/.-]\d{1,2}[/.-]\d{1,2}\b/,
  /\b\d{2,3}[/.-]\d{1,2}[/.-]\d{1,2}\b/
];
export function looksIdentifiable(text) {
  // Citations are expected in feedback: ignore PMIDs, DOIs and URLs before screening.
  const cleaned = String(text)
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\b10\.\d{4,9}\/\S+/g, ' ')
    .replace(/PMID[:：\s]*\d+/gi, ' ');
  return PHI_PATTERNS.some(re => re.test(cleaned));
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '-1000px';
  document.body.append(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

export function initFeedback({ getLang, getVersion, getSummary }) {
  const $ = id => document.getElementById(id);
  const form = $('feedback-form');
  if (!form) return () => {};
  const status = $('fb-status');
  const phiBox = $('fb-phi');
  const phiConfirm = $('fb-phi-confirm');

  const setStatus = (msg, withAddress) => {
    status.replaceChildren(msg);
    if (withAddress) {
      const addr = document.createElement('strong');
      addr.textContent = ` ${feedbackAddress()}`;
      status.append(addr);
    }
    status.hidden = false;
  };

  const compose = () => {
    const lang = getLang();
    const t = FB[lang];
    const type = $('fb-type').value;
    const area = $('fb-area').value;
    const msg = $('fb-message').value.trim();
    const h = t.bodyHeads;
    const parts = [
      `${h.type}: ${t.types[type]}`,
      `${h.area}: ${t.areas[area]}`,
      '',
      `${h.msg}:`,
      msg
    ];
    if ($('fb-attach').checked) parts.push('', `${h.summary}:`, getSummary());
    parts.push(
      '',
      `${h.env}: ${getVersion()} · ${lang} · ${window.innerWidth}×${window.innerHeight} · ${navigator.userAgent}`
    );
    return { subject: t.subject(t.types[type], getVersion()), body: parts.join('\n'), msg };
  };

  const checkPhi = () => {
    const flagged = looksIdentifiable($('fb-message').value);
    phiBox.hidden = !flagged;
    if (!flagged) phiConfirm.checked = false;
    return flagged;
  };
  $('fb-message').addEventListener('input', () => {
    checkPhi();
    status.hidden = true;
  });

  const guard = () => {
    const t = FB[getLang()];
    const { msg } = compose();
    if (!msg) {
      setStatus(t.empty, false);
      $('fb-message').focus();
      return false;
    }
    if (checkPhi() && !phiConfirm.checked) {
      phiConfirm.focus();
      return false;
    }
    return true;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!guard()) return;
    const t = FB[getLang()];
    const { subject, body } = compose();
    const href = `mailto:${feedbackAddress()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(href.length > 1900 ? t.long : t.opened, true);
    window.location.href = href;
  });

  $('fb-copy').addEventListener('click', async () => {
    if (!guard()) return;
    const t = FB[getLang()];
    const { subject, body } = compose();
    const ok = await copyText(`${subject}\n\n${body}`);
    setStatus(ok ? t.copied : t.copyFail, true);
  });

  const applyLang = lang => {
    const t = FB[lang];
    $('fb-title').textContent = t.title;
    $('fb-lead').textContent = t.lead;
    $('fb-privacy').textContent = t.privacy;
    $('fb-type-label').textContent = t.typeLabel;
    $('fb-area-label').textContent = t.areaLabel;
    $('fb-message-label').textContent = t.msgLabel;
    $('fb-message').placeholder = t.msgPlaceholder;
    $('fb-attach-label').textContent = t.attachLabel;
    $('fb-phi-text').textContent = t.phiWarn;
    $('fb-phi-confirm-label').textContent = t.phiConfirm;
    $('fb-send').textContent = t.send;
    $('fb-copy').textContent = t.copy;
    $('fb-issues').textContent = t.issues;
    for (const opt of $('fb-type').options) opt.textContent = t.types[opt.value];
    for (const opt of $('fb-area').options) opt.textContent = t.areas[opt.value];
    status.hidden = true;
  };
  applyLang(getLang());
  return applyLang;
}
