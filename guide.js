// © 2026 Pei-Hao Chen, MD (陳培豪醫師), Mackay Memorial Hospital. All rights reserved.
// Non-commercial clinical and academic use only; see LICENSE.
import { VERSION, PRIMARY_SOURCES, ATLAS_CASES } from './data.js';
import { getInitialLang, syncLanguage, renderAuthorNotice } from './site-meta.js';

const $ = id => document.getElementById(id);
let currentLang = 'zh';
let currentFilter = 'all';

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}

const GUIDE_CONTENT = {
  zh: {
    docTitle: '缺血性腦中風分型系統詳細說明書與真實影像圖譜 · TOAST / MGH CCS / ASCOD',
    wordmarkTitle: '缺血性腦中風分型說明書與影像圖譜',
    wordmarkSub: 'TOAST · MGH CCS · ASCOD · 實證圖譜',
    navBack: '← 返回分型計算器',
    navModern: '現代延伸',
    navAtlas: '真實影像圖譜',
    navRefs: '文獻 DOI',
    langToggle: 'English',
    h1: '缺血性腦中風病因分型系統詳細說明書與真實神經影像圖譜',
    lead: '本說明書彙整各主要分型系統之原文演算法、競爭病因裁決樹、心因性與影像閾值差異，並收錄 8 組經 CC BY 4.0 開放授權之真實臨床 MRI-DWI、CTA、MRA、HR-VWI 與 DSA 影像。',
    atlasTitle: '五、真實腦部與腦血管臨床影像圖譜（CC BY 4.0 授權實證案例）',
    atlasLead: '點擊任一影像可放大檢視細節。所有影像均來自同儕審查開放取用期刊，附原始 DOI 與 PubMed 連結。',
    fAll: '全部 (8)',
    fBrain: '腦部實質影像 (DWI/MRI)',
    fVascular: '腦血管影像 (CTA/MRA/DSA)',
    refsTitle: '六、完整實證文獻與影像出處（附 DOI 與 PubMed 超連結）',
    refsLead: '所有文獻均於 2026-11-27 經 PubMed E-utilities 核實 PMID 與 DOI。',
    footerLeft: '缺血性腦中風電腦化病因分型系統 · 詳細說明書與影像圖譜',
    footerRight: '僅供學術與臨床決策參考 · 影像依各自 CC BY 4.0 授權標示出處',
    sections: [
      {
        id: 'toast',
        title: '一、TOAST 分型系統（Adams et al., Stroke 1993）',
        intro: 'TOAST（Trial of Org 10172 in Acute Stroke Treatment）為全球最廣泛使用之傳統五大病因分型，依臨床特徵與輔助檢查區分確定度為 Probable 或 Possible。',
        cards: [
          {
            heading: '五大主型與核心門檻',
            bullets: [
              '1. 大動脈粥樣硬化 (LAA)：同側主要腦動脈或皮質分枝 >50% 狹窄或阻塞；具皮質/小腦功能障礙，或腦幹/皮質下梗塞 >1.5 cm，且須排除心因性栓塞。',
              '2. 心因性栓塞 (CE)：區分高風險（Probable：機械瓣膜、MS 併 AF、AF [非 lone AF]、左心房/心室血栓、病竇症候群、近期 MI <4 週、擴張型心肌病變、無收縮 LV 節段、心房黏液瘤、感染性心內膜炎）與中風險（Possible：MVP、MAC、無 AF 之 MS、LA smoke、ASA、PFO、心房撲動、lone AF、生物瓣膜、NBTE、CHF、LV 低收縮、MI >4 週–6 月）。',
              '3. 小血管阻塞 (SVO / Lacune)：典型小洞症候群且無皮質功能障礙；CT/MRI 正常或深部/腦幹病灶 <1.5 cm；無心因性來源且同側大動脈狹窄 ≤50%。',
              '4. 其他確定病因 (OD)：非動脈硬化血管病變（含動脈剝離）、高凝血狀態、血液疾病。',
              '5. 未確定病因 (UD)：細分為 (a) 兩種以上病因（例如 AF 合併 >50% 狹窄，或中風險心臟來源合併其他可能原因）、(b) 陰性評估、(c) 檢查不完整。'
            ]
          },
          {
            heading: '臨床限制與現代演進背景',
            bullets: [
              '當患者同時存在頸動脈狹窄與心房顫動時，TOAST 強制歸入 UD，導致大型研究中有 30–40% 個案落入未確定型。',
              '1993 年採 CT 時代之 <1.5 cm 閾值，對於急性 MRI-DWI 上 15–20 mm 之穿通枝梗塞或 <50% 不穩定潰瘍斑塊均無法妥善歸類。'
            ]
          }
        ]
      },
      {
        id: 'ccs',
        title: '二、MGH CCS / SSS-TOAST 電腦化因果分型（Ay et al., 2005–2007; Arsava 2010）',
        intro: '麻省總醫院（MGH）團隊先於 2005 年提出實證導向之 SSS-TOAST，並於 2007 年開發網頁自動化演算法 Causative Classification of Stroke (CCS)，將多病因未確定率壓低至約 4–6%，跨中心信度 κ 達 0.79–0.90。',
        tree: [
          { step: '路徑 A（綠色）｜僅 1 個 Evident 機制', desc: '直接判定該機制為 Evident（5/8/16 亞型皆確立）。' },
          { step: '路徑 B（紅色）｜≥2 個 Evident 機制競爭', desc: '套用各機制之 Probable 條件（LAA：近 1 月同側 TIA/TMB、近乎阻塞或內分水嶺梗塞；CE：全身性栓塞或無血管病變之多血管區梗塞；SAO：近 1 週刻板小洞 TIA 或典型小洞症候群；Other：明確 14–30 天時間關聯）。若僅 1 個符合 Probable → 勝出為 Probable；若 0 個或 ≥2 個符合 → Undetermined-Unclassified。' },
          { step: '路徑 C（黑色）｜0 個 Evident 機制', desc: '跳過 Probable，檢查 Possible 條件（低/不確定風險心因性來源、<50% 斑塊合併近期反覆事件、或缺少完整檢查之 Evident 發現）。僅 1 個 → Possible；≥2 個 → Unclassified；0 個 → 依檢查完整度與栓塞影像特徵細分為 Incomplete evaluation、Cryptogenic embolism 或 Other cryptogenic。' }
        ],
        cards: [
          {
            heading: '相對傳統 TOAST 之四大關鍵升級',
            bullets: [
              '心因性來源改以「年或單次初發中風風險 ≥2%」劃界：心房撲動、生物性瓣膜、NBTE 升級為高風險；新增 LVEF ≤28% 陳舊 MI、LVEF ≤30% 心衰竭與乳頭狀彈力纖維瘤；移除二尖瓣脫垂 (MVP) 與單純室壁運動異常。',
              '小動脈阻塞 (SAO) 依 MRI-DWI 放寬至 <20 mm，但要求穿通枝起源處無母動脈病變（局部斑塊、剝離、血管炎）。',
              'CCS 2007 明確將「<50% 狹窄但合併斑塊潰瘍或血栓」升級納入 Evident LAA。',
              '同時輸出 Causative（單一最可能致病分類：5 / 8 / 16 亞型）與 Phenotypic（各自獨立呈現各軸向異常）。'
            ]
          }
        ]
      },
      {
        id: 'ascod',
        title: '三、ASCOD (2013) 與 ASCO (2009) 表型分級系統（Amarenco et al.）',
        intro: 'ASCOD 揚棄「強制單一病因」框架，對每位患者平行評估五大疾病軸向：A（動脈硬化）、S（小血管病變）、C（心臟病變）、O（其他原因）、D（動脈剝離），並給予 1 / 2 / 3 / 0 / 9 分級。',
        cards: [
          {
            heading: '五大分級定義 (1 / 2 / 3 / 0 / 9)',
            bullets: [
              'Grade 1（潛在致病）：疾病存在且可直接解釋本次中風（如 A1：50–99% 狹窄或 <50% 合併腔內血栓或主動脈弓可移動血栓；C1：AF >60 秒、EF <35%、PFO 合併發病前 DVT/PE；D1：證實動脈剝離）。',
              'Grade 2（因果未定）：如 A2（30–49% 狹窄或 ≥4 mm 主動脈斑塊無血栓）、S2（單發近期 <15 mm 小洞且無慢性 SVD 或反覆 TIA）、C2（PFO+ASA、或雙側多區梗塞但無直接 C1 病灶）、D2（疑似剝離或供血動脈 FMD）。',
              'Grade 3（附帶存在、不太可能致病）：如 A3（<30% 斑塊、對側狹窄、CAD/PAD 病史，或「雙側跨區 DWI 梗塞時 50–99% 狹窄降級」）、S3（非小洞中風併見 Fazekas III 白質病變）、C3（孤立 PFO、<60 秒短暫 AF、MAC、鈣化性 AS）。',
              'Grade 0 / Grade 9：完成最低必要檢查且陰性評為 0；檢查不足以排除評為 9（例如缺顱內外血管影像 A9、缺腦影像 S9、<60 歲無 A1/A2/S1/C1/O1 且未作脂肪抑制 T1/DSA 排除剝離評為 D9）。'
            ]
          },
          {
            heading: 'ASCO (2009) → ASCOD (2013) 三大改版重點',
            bullets: [
              '新增獨立 D 欄（Dissection），不再將動脈剝離混於 O 欄。',
              '顯著狹窄門檻由 2009 年之 ≥70% 調降為臨床通用之 ≥50%。',
              '取消原 A/B/C 診斷證據等級字母，直接整合進 Grade 0 與 Grade 9，並於 C 欄新增心因性多區腦梗塞影像型態。'
            ]
          }
        ]
      },
      {
        id: 'modern',
        title: '四、2014–2026 現代實證臨床延伸判讀',
        intro: '涵蓋傳統 TOAST 與 2013 ASCOD 尚未完全納編之最新隨機對照試驗與 AHA/ASA 共識標準。',
        cards: [
          {
            heading: 'ESUS、RoPE / PASCAL、SyNC、Carotid Web、ARCADIA 與 AHA 2026 CRIS',
            bullets: [
              'ESUS (Hart 2014/2017)：非小洞梗塞（>1.5 cm CT 或 >2.0 cm DWI）、無 ≥50% 狹窄、無主要心源性栓塞、無他因，且須完成 ≥24 小時心律監測。NAVIGATE/RE-SPECT ESUS 顯示不可對未篩選 ESUS 一律使用 DOAC。',
              'RoPE (2013) & PASCAL (2021)：結合 10 分 RoPE（年齡、無 HTN/DM/吸菸/既往中風、皮質梗塞）與高風險 PFO 解剖（大右向左分流 >20 氣泡或 ASA ≥10 mm）。Probable PASCAL 封堵效果最顯著（HR 0.10, 95% CI 0.03–0.35）；Unlikely 則無益處且增加 AF 風險（HR 1.14）。',
              'SyNC (Goyal 2020) & Carotid Web (Mac Grory 2021)：針對 <50% 非狹窄但具潰瘍/出血/血栓/>3 mm 斑塊，以及 CTA 球部後壁頸動脈蹼進行獨立警示。',
              'ARCADIA (2024)：證實僅具心房心肌病變生物標記而無確診 AF 者，Apixaban 未優於 Aspirin。',
              'AHA CRIS (Navi 2026 / Gon 2026)：活動性癌症合併 NBTE/DIC 歸為 Probable CRIS；轉移/進展期癌症合併隱源性中風及高 D-dimer 或多區梗塞歸為 Possible CRIS，1 年死亡風險顯著較高（3 個月存活率僅 37.5% vs 89.2%）。'
            ]
          }
        ]
      }
    ]
  },
  en: {
    docTitle: 'Detailed Classification Manual & Real Neuroimaging Atlas · TOAST / MGH CCS / ASCOD',
    wordmarkTitle: 'Stroke Classification Manual & Imaging Atlas',
    wordmarkSub: 'TOAST · MGH CCS · ASCOD · Real Clinical Scans',
    navBack: '← Back to Classifier',
    navModern: 'Modern Extensions',
    navAtlas: 'Imaging Atlas',
    navRefs: 'References (DOI)',
    langToggle: '繁體中文',
    h1: 'Ischemic Stroke Etiologic Classification Manual & Real Clinical Neuroimaging Atlas',
    lead: 'Comprehensive reference covering primary published algorithms, competing-mechanism decision trees, cardiac/imaging cutoffs, and 8 CC BY 4.0 peer-reviewed clinical brain & cerebrovascular scans (MRI-DWI, CTA, MRA, HR-VWI, DSA).',
    atlasTitle: '5. Real Brain & Cerebrovascular Imaging Atlas (CC BY 4.0 Verified Cases)',
    atlasLead: 'Click any scan to zoom. Every figure is sourced from peer-reviewed open-access literature with clickable DOI and PubMed links.',
    fAll: 'All (8)',
    fBrain: 'Brain Parenchyma (DWI/MRI)',
    fVascular: 'Cerebrovascular (CTA/MRA/DSA)',
    refsTitle: '6. Complete Verified References (Clickable DOI & PubMed)',
    refsLead: 'All PMIDs and DOIs verified on 2026-11-27 via PubMed E-utilities.',
    footerLeft: 'Computerized Ischemic Stroke Classification · Detailed Manual & Atlas',
    footerRight: 'For academic & clinical decision-support only · Images licensed under CC BY 4.0',
    sections: [
      {
        id: 'toast',
        title: '1. TOAST Classification System (Adams et al., Stroke 1993)',
        intro: 'TOAST (Trial of Org 10172 in Acute Stroke Treatment) remains the most widely cited 5-subtype etiologic framework, stratifying diagnoses into Probable or Possible.',
        cards: [
          {
            heading: 'Five Subtypes & Core Cutoffs',
            bullets: [
              '1. Large-artery atherosclerosis (LAA): >50% stenosis or occlusion of a major brain or branch cortical artery; cortical/cerebellar deficit or brainstem/subcortical infarct >1.5 cm; cardioembolism excluded.',
              '2. Cardioembolism (CE): High-risk (Probable: mechanical valve, MS with AF, AF [other than lone AF], LA/LAA or LV thrombus, sick sinus syndrome, MI <4 wks, dilated cardiomyopathy, akinetic LV segment, atrial myxoma, infective endocarditis) vs Medium-risk (Possible: MVP, MAC, MS without AF, LA smoke, ASA, PFO, atrial flutter, lone AF, bioprosthetic valve, NBTE, CHF, hypokinetic LV, MI 4 wks–6 mo).',
              '3. Small-vessel occlusion (SVO / Lacune): Classical lacunar syndrome without cortical dysfunction; normal CT/MRI or deep/brainstem lesion <1.5 cm; no CE and no >50% ipsilateral LAA.',
              '4. Other determined etiology (OD): Nonatherosclerotic vasculopathies (including dissection), hypercoagulable states, hematologic disorders.',
              '5. Undetermined etiology (UD): (a) ≥2 causes identified (e.g., AF + >50% stenosis, or medium-risk CE + another cause), (b) negative evaluation, or (c) incomplete evaluation.'
            ]
          },
          {
            heading: 'Key Limitations',
            bullets: [
              'Forces all patients with ≥2 coexisting etiologies into Undetermined, inflating UD to 30–40% in modern cohorts.',
              'The 1993 <1.5 cm CT-era lacunar cutoff and >50% stenosis rule do not capture 15–20 mm DWI lacunes or <50% ulcerated plaques.'
            ]
          }
        ]
      },
      {
        id: 'ccs',
        title: '2. MGH CCS / SSS-TOAST (Ay et al., 2005–2007; Arsava 2010)',
        intro: 'Developed at Massachusetts General Hospital, SSS-TOAST (2005) and its automated web algorithm CCS (2007) reduce undetermined-unclassified rates to ~4–6% with international κ = 0.79–0.90.',
        tree: [
          { step: 'Green Path | Exactly 1 Evident Mechanism', desc: 'Assigned directly as Evident across 5-, 8-, and 16-subtype tiers.' },
          { step: 'Red Path | ≥2 Competing Evident Mechanisms', desc: 'Applies Probable rules (LAA: ipsilateral TIA/TMB ≤1 mo, near-occlusion, or internal watershed/multiple same-territory infarcts; CE: systemic embolism or multi-territory infarcts without vessel disease; SAO: stereotypic lacunar TIAs ≤1 wk or classical lacunar syndrome; Other: 14–30 day temporal link). Exactly 1 Probable → wins as Probable; 0 or ≥2 Probable → Undetermined–Unclassified.' },
          { step: 'Black Path | 0 Evident Mechanisms', desc: 'Skips Probable and checks Possible rules (low/uncertain cardiac risk, <50% plaque with recurrent events, or Evident mechanism with incomplete workup). 1 Possible → Possible; ≥2 → Unclassified; 0 → Incomplete evaluation, Cryptogenic embolism, or Other cryptogenic.' }
        ],
        cards: [
          {
            heading: 'Major Upgrades Over Legacy TOAST',
            bullets: [
              '2% primary annual/one-time stroke risk boundary for cardiac sources: atrial flutter, bioprosthetic valves, and NBTE promoted to High-risk; chronic MI with EF ≤28%, CHF with EF ≤30%, and papillary fibroelastoma added; MVP and wall motion abnormalities removed.',
              'Small-artery occlusion expanded to <20 mm on DWI in penetrating-artery territory without parent-artery pathology.',
              'CCS 2007 upgrades <50% stenosis WITH plaque ulceration or thrombosis to Evident LAA.',
              'Outputs both Causative (5/8/16-subtype) and Phenotypic (independent mechanism presence) profiles.'
            ]
          }
        ]
      },
      {
        id: 'ascod',
        title: '3. ASCOD (2013) & ASCO (2009) Phenotyping (Amarenco et al.)',
        intro: 'ASCOD grades all five coexisting phenotypes independently: A (Atherosclerosis), S (Small-vessel disease), C (Cardiac), O (Other), and D (Dissection), using grades 1 / 2 / 3 / 0 / 9.',
        cards: [
          {
            heading: 'Grading Architecture (1 / 2 / 3 / 0 / 9)',
            bullets: [
              'Grade 1 (Potentially causal): A1 (50–99% stenosis, <50% with endoluminal thrombus, or mobile aortic arch thrombus), S1 (<15 mm lacune PLUS older lacunes/Fazekas III/microbleeds/état criblé/recent TIAs), C1 (AF >60s, EF <35%, PFO + preceding DVT/PE), O1, D1.',
              'Grade 2 (Uncertain causality): A2 (30–49% stenosis or ≥4 mm aortic plaque without mobile thrombus), S2 (isolated single <15 mm lacune without chronic SVD), C2 (PFO+ASA or bihemispheric/multi-territory pattern without C1), O2, D2.',
              'Grade 3 (Unlikely causal, disease present): A3 (<30% plaque, non-supplying stenosis, CAD/PAD, or 50–99% stenosis downgraded by bihemispheric DWI), S3 (chronic SVD in non-lacunar stroke), C3 (isolated PFO, AF <60s, MAC, calcific AS), O3, D3.',
              'Grade 0 / Grade 9: 0 = absent after minimum workup; 9 = incomplete workup (e.g., A9 if extra- or intracranial missing; D9 if age <60 without A1/A2/S1/C1/O1 and no fat-sat MRI/DSA).'
            ]
          },
          {
            heading: 'ASCO (2009) → ASCOD (2013) Key Changes',
            bullets: [
              'Added independent D domain for Dissection (previously under O).',
              'Lowered significant carotid/intracranial stenosis cutoff from 70% to 50%.',
              'Removed separate diagnostic evidence letters (A/B/C), folding workup completeness into Grades 0 and 9.'
            ]
          }
        ]
      },
      {
        id: 'modern',
        title: '4. Modern 2014–2026 Evidence Extensions',
        intro: 'Incorporates landmark randomized trials and consensus definitions published after TOAST (1993) and ASCOD (2013).',
        cards: [
          {
            heading: 'ESUS, RoPE/PASCAL, SyNC, Carotid Web, ARCADIA & AHA 2026 CRIS',
            bullets: [
              'ESUS (Hart 2014/2017): Non-lacunar infarct (>1.5 cm CT or >2.0 cm DWI), <50% stenosis, no major cardioembolic source, no other cause, plus ≥24h rhythm monitoring. NAVIGATE/RE-SPECT ESUS proved empiric DOAC is not superior to aspirin in unselected ESUS.',
              'RoPE (2013) & PASCAL (2021): Combines 10-pt RoPE with high-risk PFO features (shunt >20 bubbles or ASA ≥10 mm). Closure HR = 0.10 (Probable), 0.38 (Possible), 1.14 (Unlikely, with +4.41% AF risk).',
              'SyNC (Goyal 2020) & Carotid Web (Mac Grory 2021): Flags <50% plaques with vulnerable morphology and posterior bulb shelf-like intimal webs.',
              'ARCADIA (2024): Empirical apixaban was not superior to aspirin in atrial cardiopathy without documented AF.',
              'AHA CRIS (Navi 2026 / Gon 2026): Active cancer + NBTE/DIC = Probable CRIS; metastatic/progressive cancer + cryptogenic stroke + high D-dimer or multi-territory DWI = Possible CRIS (3-mo survival 37.5% vs 89.2%).'
            ]
          }
        ]
      }
    ]
  }
};

function renderGuide() {
  const t = GUIDE_CONTENT[currentLang];
  const isEn = currentLang === 'en';
  document.documentElement.lang = isEn ? 'en' : 'zh-Hant-TW';
  document.title = t.docTitle;

  $('g-wordmark-title').textContent = t.wordmarkTitle;
  $('g-wordmark-sub').textContent = t.wordmarkSub;
  $('g-nav-back').textContent = t.navBack;
  $('g-nav-modern').textContent = t.navModern;
  $('g-nav-atlas').textContent = t.navAtlas;
  $('g-nav-refs').textContent = t.navRefs;
  $('g-nav-feedback').textContent = isEn ? 'Feedback' : '錯誤回報 / 建議';
  $('lang-toggle').textContent = t.langToggle;
  $('lang-toggle').setAttribute('aria-pressed', isEn ? 'true' : 'false');
  $('g-version').textContent = VERSION;
  $('g-h1').textContent = t.h1;
  $('g-lead').textContent = t.lead;
  $('g-atlas-title').textContent = t.atlasTitle;
  $('g-atlas-lead').textContent = t.atlasLead;
  $('f-all').textContent = t.fAll;
  $('f-brain').textContent = t.fBrain;
  $('f-vascular').textContent = t.fVascular;
  $('g-refs-title').textContent = t.refsTitle;
  $('g-refs-lead').textContent = t.refsLead;
  $('g-footer-left').textContent = t.footerLeft;
  $('g-footer-right').textContent = t.footerRight;
  syncLanguage(currentLang);
  renderAuthorNotice(currentLang, VERSION, `index.html${isEn ? '?lang=en' : ''}#feedback`);

  // Render §1-§4
  const secHost = $('guide-sections');
  secHost.replaceChildren();
  for (const sec of t.sections) {
    const section = el('section', null, 'guide-section');
    section.id = sec.id;
    section.append(el('h2', sec.title), el('p', sec.intro, 'section-lead'));

    if (sec.tree) {
      const treeWrap = el('div', null, 'decision-tree');
      sec.tree.forEach((node, idx) => {
        const box = el('div', null, `tree-node tree-${idx}`);
        box.append(el('strong', node.step), el('p', node.desc));
        treeWrap.append(box);
      });
      section.append(treeWrap);
    }

    for (const card of sec.cards) {
      const box = el('div', null, 'guide-card');
      box.append(el('h3', card.heading));
      const ul = document.createElement('ul');
      for (const b of card.bullets) ul.append(el('li', b));
      box.append(ul);
      section.append(box);
    }
    secHost.append(section);
  }

  renderAtlas();
  renderReferences();
}

function renderAtlas() {
  const isEn = currentLang === 'en';
  const grid = $('atlas-grid');
  grid.replaceChildren();
  const filtered = currentFilter === 'all' ? ATLAS_CASES : ATLAS_CASES.filter(c => c.category === currentFilter);

  for (const item of filtered) {
    const card = el('article', null, 'atlas-card');
    const imgBtn = el('button', null, 'atlas-img-btn');
    imgBtn.type = 'button';
    imgBtn.setAttribute('aria-label', `${isEn ? 'Zoom image: ' : '放大檢視：'}${isEn ? item.titleEn : item.titleZh}`);
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = isEn ? item.titleEn : item.titleZh;
    img.loading = 'lazy';
    imgBtn.append(img);
    imgBtn.addEventListener('click', () => openLightbox(item));

    const body = el('div', null, 'atlas-body');
    const metaRow = el('div', null, 'atlas-meta-row');
    metaRow.append(el('span', item.modality, 'atlas-badge'), el('span', item.license, 'atlas-license'));
    body.append(
      metaRow,
      el('h3', isEn ? item.titleEn : item.titleZh),
      el('p', isEn ? item.findingsEn : item.findingsZh, 'atlas-findings'),
      el('p', isEn ? item.mappingEn : item.mappingZh, 'atlas-mapping')
    );

    const srcP = el('p', `${item.sourceCitation} (${item.pmcid}) `, 'atlas-src');
    const doiA = el('a', `DOI: ${item.doi} ↗`, 'ref-link');
    doiA.href = `https://doi.org/${item.doi}`;
    doiA.target = '_blank';
    doiA.rel = 'noopener noreferrer';
    const pmidA = el('a', `PMID: ${item.pmid} ↗`, 'ref-link');
    pmidA.href = `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`;
    pmidA.target = '_blank';
    pmidA.rel = 'noopener noreferrer';
    srcP.append(doiA, ' · ', pmidA);
    body.append(srcP);

    card.append(imgBtn, body);
    grid.append(card);
  }
}

function openLightbox(item) {
  const isEn = currentLang === 'en';
  $('lb-title').textContent = isEn ? item.titleEn : item.titleZh;
  $('lb-img').src = item.img;
  $('lb-img').alt = isEn ? item.titleEn : item.titleZh;
  $('lb-caption').textContent = isEn ? item.findingsEn : item.findingsZh;

  const srcP = $('lb-source');
  srcP.replaceChildren(`${item.sourceCitation} (${item.pmcid}, ${item.license}) — `);
  const doiA = el('a', `DOI: ${item.doi} ↗`, 'ref-link');
  doiA.href = `https://doi.org/${item.doi}`;
  doiA.target = '_blank';
  doiA.rel = 'noopener noreferrer';
  srcP.append(doiA);

  $('atlas-lightbox').showModal();
}

function renderReferences() {
  const isEn = currentLang === 'en';
  const list = $('g-citations-list');
  list.replaceChildren();

  for (const src of PRIMARY_SOURCES) {
    const li = document.createElement('li');
    const title = el('strong', src.short);
    const cit = el('p', `${src.citation} — ${isEn ? src.roleEn : src.role} `);
    const doiA = el('a', `DOI: ${src.doi} ↗`, 'ref-link');
    doiA.href = `https://doi.org/${src.doi}`;
    doiA.target = '_blank';
    doiA.rel = 'noopener noreferrer';
    const pmidA = el('a', `PMID: ${src.pmid} ↗`, 'ref-link');
    pmidA.href = src.url;
    pmidA.target = '_blank';
    pmidA.rel = 'noopener noreferrer';
    cit.append(doiA, ' · ', pmidA);
    li.append(title, cit);
    list.append(li);
  }

  for (const c of ATLAS_CASES) {
    const li = document.createElement('li');
    const title = el('strong', `[Atlas] ${isEn ? c.titleEn : c.titleZh}`);
    const cit = el('p', `${c.sourceCitation} (${c.pmcid}, ${c.license}) `);
    const doiA = el('a', `DOI: ${c.doi} ↗`, 'ref-link');
    doiA.href = `https://doi.org/${c.doi}`;
    doiA.target = '_blank';
    doiA.rel = 'noopener noreferrer';
    const pmidA = el('a', `PMID: ${c.pmid} ↗`, 'ref-link');
    pmidA.href = `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`;
    pmidA.target = '_blank';
    pmidA.rel = 'noopener noreferrer';
    cit.append(doiA, ' · ', pmidA);
    li.append(title, cit);
    list.append(li);
  }
}

$('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  renderGuide();
});

for (const btn of document.querySelectorAll('.filter-btn')) {
  btn.addEventListener('click', () => {
    currentFilter = btn.getAttribute('data-filter');
    for (const b of document.querySelectorAll('.filter-btn')) {
      b.classList.toggle('active', b === btn);
    }
    renderAtlas();
  });
}

$('lb-close').addEventListener('click', () => $('atlas-lightbox').close());
$('atlas-lightbox').addEventListener('click', e => {
  if (e.target === $('atlas-lightbox')) $('atlas-lightbox').close();
});

currentLang = getInitialLang();
renderGuide();
