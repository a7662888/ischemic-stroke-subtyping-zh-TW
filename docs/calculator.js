// © 2026 Pei-Hao Chen, MD (陳培豪醫師), Mackay Memorial Hospital. All rights reserved.
// Non-commercial clinical and academic use only; see LICENSE.
import { CARDIAC_SOURCES, OTHER_ETIOLOGIES, ROPE_ATTRIBUTABLE, PASCAL_EFFECTS } from './data.js';

const ALLOWLISTS = {
  syndrome: new Set(['non_lacunar', 'lacunar', 'unclear']),
  yesNo: new Set(['yes', 'no']),
  ageBand: new Set(['unknown', '18', '30', '40', '50', '60', '70']),
  brainModality: new Set(['mri_dwi', 'ct_only', 'none']),
  infarctPattern: new Set([
    'deep_le15',
    'deep_15_20',
    'deep_gt20',
    'cortical_or_cerebellar',
    'borderzone_or_multiple_same',
    'multiple_same',
    'multi_territory',
    'none_visible'
  ]),
  chronicSvd: new Set(['severe_svd', 'mild_or_none', 'not_assessed']),
  vesselWorkup: new Set(['complete', 'extra_only', 'intra_only', 'none']),
  ipsiAtherosclerosis: new Set([
    'none',
    'plaque_lt30',
    'stenosis_30_49',
    'lt50_vulnerable',
    'stenosis_50_69',
    'stenosis_70_99',
    'occlusion_ath'
  ]),
  nonSupplyingAth: new Set(['none', 'cerebral_other', 'systemic_cad_pad']),
  aorticArch: new Set(['not_assessed', 'none', 'lt4mm', 'ge4mm_no_mobile', 'mobile_thrombus']),
  dissectionStatus: new Set(['none', 'definite_ipsi', 'probable_ipsi', 'incidental_other', 'not_evaluated']),
  pfoVenousThrombosis: new Set(['none', 'preceding', 'concomitant_not_preceding']),
  otherWorkup: new Set(['complete', 'incomplete']),
  otherCausality: new Set(['direct', 'uncertain', 'incidental'])
};

const CARDIAC_MAP = new Map(CARDIAC_SOURCES.map(c => [c.id, c]));
const OTHER_MAP = new Map(OTHER_ETIOLOGIES.map(o => [o.id, o]));

function pick(val, set, fallback) {
  return set.has(val) ? val : fallback;
}

export function normalizeInput(raw = {}) {
  const cardiacSources = Array.isArray(raw.cardiacSources)
    ? [...new Set(raw.cardiacSources.filter(id => CARDIAC_MAP.has(id)))]
    : [];
  const otherEtiologies = Array.isArray(raw.otherEtiologies)
    ? [...new Set(raw.otherEtiologies.filter(id => OTHER_MAP.has(id)))]
    : [];

  const inp = {
    syndrome: pick(raw.syndrome, ALLOWLISTS.syndrome, 'non_lacunar'),
    priorIpsilateralTia1m: pick(raw.priorIpsilateralTia1m, ALLOWLISTS.yesNo, 'no'),
    stereotypicLacunarTia1w: pick(raw.stereotypicLacunarTia1w, ALLOWLISTS.yesNo, 'no'),
    systemicEmbolism: pick(raw.systemicEmbolism, ALLOWLISTS.yesNo, 'no'),
    ageBand: pick(raw.ageBand, ALLOWLISTS.ageBand, 'unknown'),
    hypertension: pick(raw.hypertension, ALLOWLISTS.yesNo, 'no'),
    diabetes: pick(raw.diabetes, ALLOWLISTS.yesNo, 'no'),
    smoker: pick(raw.smoker, ALLOWLISTS.yesNo, 'no'),
    priorStrokeTia: pick(raw.priorStrokeTia, ALLOWLISTS.yesNo, 'no'),
    activeCancer: pick(raw.activeCancer, ALLOWLISTS.yesNo, 'no'),
    cancerAdvanced: pick(raw.cancerAdvanced, ALLOWLISTS.yesNo, 'no'),
    highDdimer: pick(raw.highDdimer, ALLOWLISTS.yesNo, 'no'),
    brainModality: pick(raw.brainModality, ALLOWLISTS.brainModality, 'mri_dwi'),
    infarctPattern: pick(raw.infarctPattern, ALLOWLISTS.infarctPattern, 'cortical_or_cerebellar'),
    chronicSvd: pick(raw.chronicSvd, ALLOWLISTS.chronicSvd, 'mild_or_none'),
    vesselWorkup: pick(raw.vesselWorkup, ALLOWLISTS.vesselWorkup, 'complete'),
    ipsiAtherosclerosis: pick(raw.ipsiAtherosclerosis, ALLOWLISTS.ipsiAtherosclerosis, 'none'),
    ipsiNearOcclusion: pick(raw.ipsiNearOcclusion, ALLOWLISTS.yesNo, 'no'),
    nonSupplyingAth: pick(raw.nonSupplyingAth, ALLOWLISTS.nonSupplyingAth, 'none'),
    aorticArch: pick(raw.aorticArch, ALLOWLISTS.aorticArch, 'not_assessed'),
    dissectionStatus: pick(raw.dissectionStatus, ALLOWLISTS.dissectionStatus, 'none'),
    carotidWeb: pick(raw.carotidWeb, ALLOWLISTS.yesNo, 'no'),
    angioCutoffOrRecanalization: pick(raw.angioCutoffOrRecanalization, ALLOWLISTS.yesNo, 'no'),
    cardiacEcg: pick(raw.cardiacEcg, ALLOWLISTS.yesNo, 'yes'),
    cardiacMonitoring24h: pick(raw.cardiacMonitoring24h, ALLOWLISTS.yesNo, 'no'),
    cardiacTte: pick(raw.cardiacTte, ALLOWLISTS.yesNo, 'yes'),
    cardiacTee: pick(raw.cardiacTee, ALLOWLISTS.yesNo, 'no'),
    cardiacSources,
    pfoHighRiskAnatomy: pick(raw.pfoHighRiskAnatomy, ALLOWLISTS.yesNo, 'no'),
    pfoVenousThrombosis: pick(raw.pfoVenousThrombosis, ALLOWLISTS.pfoVenousThrombosis, 'none'),
    otherWorkup: pick(raw.otherWorkup, ALLOWLISTS.otherWorkup, 'complete'),
    otherEtiologies,
    otherCausality: pick(raw.otherCausality, ALLOWLISTS.otherCausality, 'direct'),
    prothromboticContext: pick(raw.prothromboticContext, ALLOWLISTS.yesNo, 'no')
  };

  // Imaging-derived findings cannot exist without the corresponding study.
  // Without this guard, the default pattern ('cortical_or_cerebellar') or a stale
  // stenosis selection would silently drive TOAST LAA, CCS SAO and the RoPE cortical point.
  if (inp.brainModality === 'none') {
    inp.infarctPattern = 'none_visible';
    inp.chronicSvd = 'not_assessed';
  }
  if (inp.vesselWorkup === 'none') {
    inp.ipsiAtherosclerosis = 'none';
    inp.ipsiNearOcclusion = 'no';
    inp.carotidWeb = 'no';
    inp.angioCutoffOrRecanalization = 'no';
  }
  return inp;
}

export function hasEchocardiography(inp) {
  return inp.cardiacTte === 'yes' || inp.cardiacTee === 'yes';
}

function isIpsiLaaGe50(ath) {
  return ath === 'stenosis_50_69' || ath === 'stenosis_70_99' || ath === 'occlusion_ath';
}
function isMultiTerritory(pattern) {
  return pattern === 'multi_territory';
}
function isSmallDeepInfarct15(pattern) {
  return pattern === 'deep_le15';
}
function isSmallDeepInfarct20(pattern) {
  return pattern === 'deep_le15' || pattern === 'deep_15_20';
}
function isBasicWorkupComplete(inp) {
  return (
    inp.brainModality !== 'none' &&
    inp.vesselWorkup === 'complete' &&
    inp.cardiacEcg === 'yes' &&
    hasEchocardiography(inp)
  );
}

// ---------------------------------------------------------------------------
// 1. TOAST (Adams et al., Stroke 1993; PMID 7678184)
// ---------------------------------------------------------------------------
export function classifyTOAST(inp, lang = 'zh') {
  const isEn = lang === 'en';
  const reasons = [];
  const hasBrain = inp.brainModality !== 'none';
  const hasVessel = inp.vesselWorkup !== 'none';
  const hasCardiacEval = inp.cardiacEcg === 'yes' || inp.cardiacTte === 'yes' || inp.cardiacTee === 'yes';

  const laaStenosis = isIpsiLaaGe50(inp.ipsiAtherosclerosis);
  const laaImagingOk =
    inp.infarctPattern === 'cortical_or_cerebellar' ||
    inp.infarctPattern === 'borderzone_or_multiple_same' ||
    inp.infarctPattern === 'multiple_same' ||
    inp.infarctPattern === 'deep_gt20' ||
    inp.infarctPattern === 'deep_15_20';
  const laaPresent = laaStenosis && (laaImagingOk || inp.syndrome === 'non_lacunar');

  const selectedCardiac = inp.cardiacSources.map(id => CARDIAC_MAP.get(id)).filter(Boolean);
  const hasAnyAf = inp.cardiacSources.includes('af_sustained') || inp.cardiacSources.includes('af_brief_lone');
  const ceHigh = selectedCardiac.some(c =>
    c.id === 'mitral_stenosis' ? hasAnyAf : c.toastRisk === 'high'
  );
  const ceMed = selectedCardiac.some(c =>
    c.id === 'mitral_stenosis' ? !hasAnyAf : c.toastRisk === 'medium'
  );
  const cePresent = ceHigh || ceMed;

  const svoImagingOk = inp.infarctPattern === 'deep_le15' || inp.infarctPattern === 'none_visible';
  const svoCandidate = inp.syndrome === 'lacunar' && svoImagingOk;

  const hasDissection = inp.dissectionStatus === 'definite_ipsi' || inp.dissectionStatus === 'probable_ipsi';
  const hasOtherSpecific = inp.otherEtiologies.length > 0 && inp.otherCausality !== 'incidental';
  const odPresent = hasDissection || hasOtherSpecific;

  const causes = [];
  if (laaPresent) causes.push('LAA');
  if (cePresent) causes.push('CE');
  if (svoCandidate) causes.push('SVO');
  if (odPresent) causes.push('OD');

  if (causes.length >= 2) {
    reasons.push(
      isEn
        ? `Two or more potential causes identified (${causes.join(' + ')}); classified as Undetermined under TOAST.`
        : `符合兩種以上潛在病因 (${causes.join(' + ')})，依 TOAST 歸入未確定病因。`
    );
    return {
      code: 'UD-Multiple',
      labelZh: '未確定病因 — 兩種以上病因',
      labelEn: 'Undetermined (Two or more causes identified)',
      certainty: 'N/A',
      reasons
    };
  }

  if (causes.length === 1) {
    const c = causes[0];
    const complete = isBasicWorkupComplete(inp);
    if (c === 'LAA') {
      const certainty = complete ? 'Probable' : 'Possible';
      reasons.push(
        isEn
          ? 'Ipsilateral >50% atherosclerotic stenosis/occlusion with compatible non-lacunar syndrome or >1.5 cm infarct.'
          : '同側供血動脈 >50% 狹窄或阻塞，且符合非小洞臨床或 >1.5 cm 影像表現。'
      );
      return {
        code: 'LAA',
        labelZh: `大動脈粥樣硬化 (${certainty})`,
        labelEn: `Large-artery atherosclerosis (${certainty})`,
        certainty,
        reasons
      };
    }
    if (c === 'CE') {
      const certainty = ceHigh && complete ? 'Probable' : 'Possible';
      reasons.push(
        ceHigh
          ? (isEn ? 'High-risk cardioembolic source identified without competing etiology.' : '具高風險心因性栓塞來源且無其他競爭病因。')
          : (isEn ? 'Only medium-risk cardioembolic source(s) identified (TOAST Possible CE).' : '僅具中風險心因性栓塞來源（TOAST 定義為 Possible CE）。')
      );
      return {
        code: 'CE',
        labelZh: `心因性栓塞 (${certainty})`,
        labelEn: `Cardioembolism (${certainty})`,
        certainty,
        reasons
      };
    }
    if (c === 'SVO') {
      const certainty = complete && inp.infarctPattern === 'deep_le15' ? 'Probable' : 'Possible';
      reasons.push(
        isEn
          ? 'Classical lacunar syndrome with <1.5 cm deep/brainstem infarct (or negative early scan) and no CE or >50% LAA.'
          : '典型小洞症候群合併 <1.5 cm 深部梗塞（或早期影像陰性），且無心因性或 >50% 大動脈狹窄。'
      );
      return {
        code: 'SVO',
        labelZh: `小血管阻塞 / 小洞中風 (${certainty})`,
        labelEn: `Small-vessel occlusion (${certainty})`,
        certainty,
        reasons
      };
    }
    if (c === 'OD') {
      const certainty = complete ? 'Probable' : 'Possible';
      reasons.push(
        hasDissection
          ? (isEn ? 'Ipsilateral arterial dissection classified under Other determined etiology.' : '同側動脈剝離歸入其他確定病因。')
          : (isEn ? 'Specific rare etiology identified (vasculopathy, hypercoagulable, or hematologic disorder).' : '具明確罕見/特定病因（血管炎、高凝血或遺傳性病變等）。')
      );
      return {
        code: 'OD',
        labelZh: `其他確定病因 (${certainty})`,
        labelEn: `Other determined etiology (${certainty})`,
        certainty,
        reasons
      };
    }
  }

  if (!hasBrain || !hasVessel || !hasCardiacEval) {
    reasons.push(
      isEn
        ? 'Essential baseline diagnostic workup incomplete (brain imaging, vessel imaging, or cardiac evaluation missing).'
        : '缺少必要基礎檢查（腦部影像、血管影像或心臟評估未完成）。'
    );
    return {
      code: 'UD-Incomplete',
      labelZh: '未確定病因 — 檢查不完整',
      labelEn: 'Undetermined (Incomplete evaluation)',
      certainty: 'N/A',
      reasons
    };
  }

  reasons.push(
    isEn
      ? 'Baseline evaluation negative for TOAST thresholds (note: 15–20 mm deep infarcts or <50% plaques fall here in legacy TOAST).'
      : '已完成基礎評估但未發現符合 TOAST 閾值之確定病因（注意：15–20 mm 深部梗塞或 <50% 斑塊在傳統 TOAST 均落入此類）。'
  );
  return {
    code: 'UD-Negative',
    labelZh: '未確定病因 — 陰性評估',
    labelEn: 'Undetermined (Negative evaluation)',
    certainty: 'N/A',
    reasons
  };
}

// ---------------------------------------------------------------------------
// 2. MGH CCS / SSS-TOAST (Ay et al. 2005, 2007; Arsava et al. 2010)
// ---------------------------------------------------------------------------
export function classifyCCS(inp, lang = 'zh') {
  const isEn = lang === 'en';
  const trace = [];
  const complete = isBasicWorkupComplete(inp);

  const selectedCardiac = inp.cardiacSources.map(id => CARDIAC_MAP.get(id)).filter(Boolean);
  const selectedOthers = inp.otherEtiologies.map(id => OTHER_MAP.get(id)).filter(Boolean);

  const laaAnatomicEvident =
    (isIpsiLaaGe50(inp.ipsiAtherosclerosis) || inp.ipsiAtherosclerosis === 'lt50_vulnerable') &&
    !isMultiTerritory(inp.infarctPattern);
  const laaProbable =
    inp.priorIpsilateralTia1m === 'yes' ||
    inp.ipsiNearOcclusion === 'yes' ||
    inp.infarctPattern === 'borderzone_or_multiple_same';
  const laaPossibleOnly =
    inp.ipsiAtherosclerosis === 'stenosis_30_49' &&
    inp.priorIpsilateralTia1m === 'yes' &&
    inp.priorStrokeTia === 'yes';

  let laaLevel = 'none';
  if (laaAnatomicEvident) {
    laaLevel = complete ? (laaProbable ? 'evident_probable' : 'evident') : 'possible';
  } else if (laaPossibleOnly) {
    laaLevel = 'possible';
  }

  const ceHigh = selectedCardiac.some(c => c.ccsRisk === 'high');
  const ceLow =
    selectedCardiac.some(c => c.ccsRisk === 'low') ||
    inp.aorticArch === 'ge4mm_no_mobile' ||
    inp.aorticArch === 'mobile_thrombus';
  const ceProbable =
    inp.systemicEmbolism === 'yes' ||
    (isMultiTerritory(inp.infarctPattern) &&
      !isIpsiLaaGe50(inp.ipsiAtherosclerosis) &&
      inp.dissectionStatus !== 'definite_ipsi' &&
      selectedOthers.length === 0);

  let ceLevel = 'none';
  if (ceHigh) {
    ceLevel = complete ? (ceProbable ? 'evident_probable' : 'evident') : 'possible';
  } else if (ceLow) {
    ceLevel = 'possible';
  }

  const parentArteryPathology =
    isIpsiLaaGe50(inp.ipsiAtherosclerosis) ||
    inp.ipsiAtherosclerosis === 'lt50_vulnerable' ||
    inp.dissectionStatus === 'definite_ipsi';
  const saoEvident = isSmallDeepInfarct20(inp.infarctPattern) && !parentArteryPathology;
  const saoProbable = inp.stereotypicLacunarTia1w === 'yes' || inp.syndrome === 'lacunar';
  const saoPossibleOnly =
    inp.syndrome === 'lacunar' && (inp.brainModality === 'ct_only' || inp.infarctPattern === 'none_visible');

  let saoLevel = 'none';
  if (saoEvident) {
    saoLevel = complete ? (saoProbable ? 'evident_probable' : 'evident') : 'possible';
  } else if (saoPossibleOnly) {
    saoLevel = 'possible';
  }

  const dissectionEvident = inp.dissectionStatus === 'definite_ipsi';
  const otherDirect = selectedOthers.some(o => !o.isProthrombotic) && inp.otherCausality === 'direct';
  const prothromboticValid =
    selectedOthers.some(o => o.isProthrombotic) &&
    inp.otherCausality === 'direct' &&
    (inp.prothromboticContext === 'yes' ||
      inp.ageBand === '18' ||
      inp.ageBand === '30' ||
      inp.ageBand === '40' ||
      (!laaAnatomicEvident && !ceHigh && !saoEvident));

  const otherAnatomicEvident = dissectionEvident || otherDirect || prothromboticValid;
  const otherProbable =
    dissectionEvident ||
    selectedOthers.some(o => o.id === 'iatrogenic_procedure' || o.id === 'drug_induced');

  let otherLevel = 'none';
  if (otherAnatomicEvident) {
    otherLevel = complete ? (otherProbable ? 'evident_probable' : 'evident') : 'possible';
  }

  const phenotypic = {
    laa: laaLevel !== 'none' ? laaLevel.split('_')[0] : 'absent',
    ce: ceLevel !== 'none' ? ceLevel.split('_')[0] : 'absent',
    sao: saoLevel !== 'none' ? saoLevel.split('_')[0] : 'absent',
    other: otherLevel !== 'none' ? otherLevel.split('_')[0] : 'absent'
  };

  const evidentList = [];
  if (laaLevel.startsWith('evident')) evidentList.push({ key: 'LAA', zh: '大動脈粥樣硬化', en: 'Large-artery atherosclerosis', probable: laaProbable });
  if (ceLevel.startsWith('evident')) evidentList.push({ key: 'CE', zh: '心因性主動脈栓塞', en: 'Cardio-aortic embolism', probable: ceProbable });
  if (saoLevel.startsWith('evident')) evidentList.push({ key: 'SAO', zh: '小動脈阻塞', en: 'Small-artery occlusion', probable: saoProbable });
  if (otherLevel.startsWith('evident')) evidentList.push({ key: 'OTHER', zh: '其他病因', en: 'Other causes', probable: otherProbable });

  let subtype5 = '';
  let subtype8 = '';
  let subtype16 = '';
  let confidence = 'N/A';

  const fmtName = item => (isEn ? item.en : `${item.zh} (${item.en})`);

  if (evidentList.length === 1) {
    const win = evidentList[0];
    subtype5 = fmtName(win);
    subtype8 = subtype5;
    confidence = 'Evident';
    subtype16 = isEn ? `${win.en} — Evident` : `${win.zh} — Evident`;
    trace.push(
      isEn
        ? `Single Evident mechanism (${win.key}) identified; directly assigned Evident.`
        : `僅單一 Evident 機制 (${win.key})，依綠色路徑直接判定為 Evident。`
    );
  } else if (evidentList.length >= 2) {
    trace.push(
      isEn
        ? `${evidentList.length} competing Evident mechanisms (${evidentList.map(e => e.key).join(', ')}); entering Probable tie-breaking tree.`
        : `偵測到 ${evidentList.length} 個競爭之 Evident 機制 (${evidentList.map(e => e.key).join(', ')})，進入 Probable 權重決策樹。`
    );
    const probWinners = evidentList.filter(e => e.probable);
    if (probWinners.length === 1) {
      const win = probWinners[0];
      subtype5 = fmtName(win);
      subtype8 = subtype5;
      confidence = 'Probable';
      subtype16 = isEn ? `${win.en} — Probable` : `${win.zh} — Probable`;
      trace.push(
        isEn
          ? `Only ${win.key} met Probable clinical/imaging criteria and wins tie-breaking.`
          : `僅 ${win.key} 符合 Probable 臨床/影像條件，勝出並判定為 Probable。`
      );
    } else {
      subtype5 = isEn ? 'Undetermined' : '未確定病因 (Undetermined)';
      subtype8 = isEn ? 'Undetermined — Unclassified (competing causes)' : '未確定病因 — 未能分類 / 多重競爭病因 (Unclassified)';
      subtype16 = subtype8;
      trace.push(
        probWinners.length === 0
          ? (isEn ? 'No competing Evident mechanism met Probable criteria → Unclassified.' : '所有競爭之 Evident 機制皆未達 Probable 門檻，歸入 Unclassified。')
          : (isEn ? `Multiple mechanisms (${probWinners.map(p => p.key).join(', ')}) met Probable criteria → Unclassified.` : `多個競爭機制 (${probWinners.map(p => p.key).join(', ')}) 同時符合 Probable 條件，無法單一裁決，歸入 Unclassified。`)
      );
    }
  } else {
    const possibleList = [];
    if (laaLevel === 'possible') possibleList.push({ key: 'LAA', zh: '大動脈粥樣硬化', en: 'Large-artery atherosclerosis' });
    if (ceLevel === 'possible') possibleList.push({ key: 'CE', zh: '心因性主動脈栓塞', en: 'Cardio-aortic embolism' });
    if (saoLevel === 'possible') possibleList.push({ key: 'SAO', zh: '小動脈阻塞', en: 'Small-artery occlusion' });
    if (otherLevel === 'possible') possibleList.push({ key: 'OTHER', zh: '其他病因', en: 'Other causes' });

    if (possibleList.length === 1) {
      const win = possibleList[0];
      subtype5 = fmtName(win);
      subtype8 = subtype5;
      confidence = 'Possible';
      subtype16 = isEn ? `${win.en} — Possible` : `${win.zh} — Possible`;
      trace.push(
        isEn
          ? `Zero Evident mechanisms; single Possible mechanism (${win.key}) assigned.`
          : `無 Evident 機制；僅單一 Possible 機制 (${win.key}) 成立，判定為 Possible。`
      );
    } else if (possibleList.length >= 2) {
      subtype5 = isEn ? 'Undetermined' : '未確定病因 (Undetermined)';
      subtype8 = isEn ? 'Undetermined — Unclassified (multiple Possible)' : '未確定病因 — 未能分類 / 多重 Possible 病因 (Unclassified)';
      subtype16 = subtype8;
      trace.push(
        isEn
          ? `Zero Evident mechanisms, but ${possibleList.length} Possible mechanisms (${possibleList.map(p => p.key).join(', ')}) → Unclassified.`
          : `無 Evident 機制，但同時有 ${possibleList.length} 個 Possible 機制 (${possibleList.map(p => p.key).join(', ')})，歸入 Unclassified。`
      );
    } else {
      subtype5 = isEn ? 'Undetermined' : '未確定病因 (Undetermined)';
      const isCryptogenicEmbolism =
        inp.angioCutoffOrRecanalization === 'yes' || isMultiTerritory(inp.infarctPattern);
      if (!complete) {
        subtype8 = isEn ? 'Undetermined — Incomplete evaluation' : '未確定病因 — 檢查不完整 (Incomplete evaluation)';
        trace.push(isEn ? 'No Evident/Possible cause and baseline evaluation incomplete.' : '無 Evident/Possible 機制且基礎評估未完成，歸入 Incomplete evaluation。');
      } else if (isCryptogenicEmbolism) {
        subtype8 = isEn ? 'Undetermined — Cryptogenic embolism' : '未確定病因 — 隱源性栓塞 (Cryptogenic embolism)';
        trace.push(isEn ? 'Abrupt cutoff, complete recanalization, or multi-territory acute infarcts without vessel disease → Cryptogenic embolism.' : '無明確病因但具血管突然截斷/完全再通或多發性跨區急性梗塞，符合 Cryptogenic embolism。');
      } else {
        subtype8 = isEn ? 'Undetermined — Other cryptogenic' : '未確定病因 — 其他隱源性 (Other cryptogenic)';
        trace.push(isEn ? 'Complete workup with no Evident/Possible cause or embolic signature → Other cryptogenic.' : '已完成基礎評估且未發現 Evident/Possible 病因，歸入 Other cryptogenic。');
      }
      subtype16 = subtype8;
    }
  }

  return {
    subtype5,
    subtype8,
    subtype16,
    confidence,
    phenotypic,
    trace
  };
}

// ---------------------------------------------------------------------------
// 3. ASCOD (Amarenco et al., Cerebrovasc Dis 2013; PMID 23899749) & ASCO 2009
// ---------------------------------------------------------------------------
export function classifyASCOD(inp, lang = 'zh') {
  const isEn = lang === 'en';
  const details = {};
  const multiBihemispheric = isMultiTerritory(inp.infarctPattern);

  // --- A ---
  let gradeA = 0;
  const aNotes = [];
  if (inp.vesselWorkup !== 'complete') {
    if (isIpsiLaaGe50(inp.ipsiAtherosclerosis) && !multiBihemispheric) {
      gradeA = 1;
      aNotes.push(isEn ? 'Ipsilateral ≥50% stenosis/occlusion confirmed despite partial vessel coverage (A1).' : '雖血管檢查未涵蓋全部顱內外段，但已確認同側供血動脈 ≥50% 狹窄/阻塞。');
    } else if (inp.aorticArch === 'mobile_thrombus') {
      gradeA = 1;
      aNotes.push(isEn ? 'Mobile thrombus in the aortic arch (A1).' : '主動脈弓出現可移動血栓 (A1)。');
    } else if (inp.ipsiAtherosclerosis === 'lt50_vulnerable' && !multiBihemispheric) {
      gradeA = 1;
      aNotes.push(isEn ? 'Ipsilateral <50% stenosis with endoluminal thrombus/ulcerated complex plaque on the imaged segment (A1); remaining segments not assessed.' : '已檢查之同側動脈段見 <50% 狹窄合併腔內血栓/潰瘍性複雜斑塊 (A1)；其餘血管段尚未評估。');
    } else if (inp.ipsiAtherosclerosis === 'stenosis_30_49' || inp.aorticArch === 'ge4mm_no_mobile') {
      gradeA = 2;
      aNotes.push(isEn ? 'A2 finding on partial vessel imaging (30–49% stenosis or ≥4 mm aortic plaque); an A1 lesion in unimaged segments cannot be excluded.' : '部分血管影像已見 A2 病灶（30–49% 狹窄或 ≥4 mm 主動脈斑塊）；未檢查之血管段仍無法排除 A1 病灶。');
    } else {
      gradeA = 9;
      aNotes.push(isEn ? 'Both extra- and intracranial arterial assessments are required to rule out atherosclerosis (A9).' : '未同時完成顱外與顱內動脈評估 (A9)。');
    }
  } else {
    if (
      (isIpsiLaaGe50(inp.ipsiAtherosclerosis) && !multiBihemispheric) ||
      inp.ipsiAtherosclerosis === 'lt50_vulnerable' ||
      inp.aorticArch === 'mobile_thrombus'
    ) {
      gradeA = 1;
      if (inp.ipsiAtherosclerosis === 'lt50_vulnerable') {
        aNotes.push(isEn ? 'Ipsilateral <50% stenosis with endoluminal thrombus/ulcerated complex plaque (A1).' : '同側 <50% 狹窄合併腔內血栓/潰瘍性複雜斑塊 (A1)。');
      } else if (inp.aorticArch === 'mobile_thrombus') {
        aNotes.push(isEn ? 'Mobile thrombus in the aortic arch (A1).' : '主動脈弓可移動血栓 (A1)。');
      } else {
        aNotes.push(isEn ? 'Ipsilateral 50–99% stenosis or atherosclerotic occlusion without bihemispheric DWI lesions (A1).' : '同側供血動脈 50–99% 狹窄或動脈硬化阻塞，且非雙側跨區 DWI 梗塞 (A1)。');
      }
    } else if (inp.ipsiAtherosclerosis === 'stenosis_30_49' || inp.aorticArch === 'ge4mm_no_mobile') {
      gradeA = 2;
      aNotes.push(
        inp.ipsiAtherosclerosis === 'stenosis_30_49'
          ? (isEn ? 'Ipsilateral 30–49% (30–50%) atherosclerotic stenosis (A2).' : '同側供血動脈 30–49% (30–50%) 狹窄 (A2)。')
          : (isEn ? 'Aortic arch plaque ≥4 mm without mobile thrombus (A2).' : '主動脈弓斑塊 ≥4 mm 但無可移動血栓 (A2)。')
      );
    } else if (
      inp.ipsiAtherosclerosis === 'plaque_lt30' ||
      inp.aorticArch === 'lt4mm' ||
      inp.nonSupplyingAth !== 'none' ||
      (isIpsiLaaGe50(inp.ipsiAtherosclerosis) && multiBihemispheric)
    ) {
      gradeA = 3;
      if (isIpsiLaaGe50(inp.ipsiAtherosclerosis) && multiBihemispheric) {
        aNotes.push(isEn ? '50–99% stenosis downgraded to A3 when bihemispheric/multi-territory DWI lesions are present.' : '雙側/多血管區急性梗塞時，50–99% 動脈狹窄降級為 A3（不太可能單獨解釋全腦病灶）。');
      } else {
        aNotes.push(isEn ? 'Plaque <30%, aortic plaque <4 mm, non-supplying stenosis, or history of CAD/PAD (A3).' : '存在非供血動脈硬化、<30% 斑塊、<4 mm 主動脈斑塊或全身性動脈硬化病史 (A3)。');
      }
    } else {
      gradeA = 0;
      aNotes.push(isEn ? 'No extra- or intracranial atherosclerosis detected (A0).' : '顱內外血管影像未見動脈硬化病灶 (A0)。');
    }
  }
  details.A = { grade: gradeA, notes: aNotes };

  // --- S ---
  let gradeS = 0;
  const sNotes = [];
  if (inp.brainModality === 'none') {
    gradeS = 9;
    sNotes.push(isEn ? 'Brain MRI or CT not performed (S9).' : '未進行腦部 MRI 或 CT 影像檢查 (S9)。');
  } else if (isSmallDeepInfarct15(inp.infarctPattern)) {
    const hasChronicOrRecurrentSvd =
      inp.chronicSvd === 'severe_svd' || inp.priorIpsilateralTia1m === 'yes' || inp.stereotypicLacunarTia1w === 'yes';
    if (hasChronicOrRecurrentSvd) {
      gradeS = 1;
      sNotes.push(isEn ? 'Lacunar infarct <15 mm plus older lacunes, Fazekas III leukoaraiosis/microbleeds, or recent repeated TIAs (S1).' : '深部小梗塞 <15 mm 合併陳舊小洞、Fazekas III 白質病變/微出血或近期同區反覆 TIA (S1)。');
    } else {
      gradeS = 2;
      sNotes.push(isEn ? 'Per ASCOD 2013: an isolated recent <15 mm lacunar infarct without chronic SVD markers or repeated TIAs is graded S2.' : '依 ASCOD 2013 嚴格定義：單一近期深部小梗塞 (<15 mm) 若無其他慢性小血管病變或反覆 TIA，應評為 S2。');
    }
  } else if (inp.syndrome === 'lacunar' && inp.infarctPattern === 'none_visible') {
    gradeS = 2;
    sNotes.push(isEn ? 'Classical lacunar syndrome without visible acute lesion on MRI/CT (S2).' : '典型小洞臨床症候群但影像未見對應病灶 (S2)。');
  } else if (inp.chronicSvd === 'severe_svd') {
    gradeS = 3;
    sNotes.push(isEn ? 'Non-lacunar index stroke with incidental severe leukoaraiosis, old lacunes, or microbleeds (S3).' : '本次梗塞非小洞型，但影像併見嚴重白質病變、陳舊小洞或微出血 (S3)。');
  } else {
    gradeS = 0;
    sNotes.push(isEn ? 'Small-vessel disease not detected (S0).' : '未見小血管病變證據 (S0)。');
  }
  details.S = { grade: gradeS, notes: sNotes };

  // --- C ---
  const selectedCardiac = inp.cardiacSources.map(id => CARDIAC_MAP.get(id)).filter(Boolean);
  const cGrades = [];
  const cNotes = [];
  for (const c of selectedCardiac) {
    if (c.id === 'pfo') {
      if (inp.pfoVenousThrombosis === 'preceding') {
        cGrades.push(1);
        cNotes.push(isEn ? 'PFO + concomitant PE or proximal DVT preceding index stroke (C1).' : 'PFO 合併發病前已存在之近端 DVT 或肺栓塞 (C1)。');
      } else if (inp.pfoHighRiskAnatomy === 'yes' || inp.pfoVenousThrombosis === 'concomitant_not_preceding') {
        cGrades.push(2);
        cNotes.push(isEn ? 'PFO + ASA / large shunt or concomitant non-preceding VTE (C2).' : 'PFO 合併心房中隔瘤 (ASA)／大右向左分流或非先行性同步 VTE (C2)。');
      } else {
        cGrades.push(3);
        cNotes.push(isEn ? 'Isolated PFO without high-risk features or preceding VTE (C3).' : '孤立性 PFO 無高風險結構或先存靜脈栓塞 (C3)。');
      }
    } else if (typeof c.ascodGrade === 'number' && c.ascodGrade > 0) {
      cGrades.push(c.ascodGrade);
      cNotes.push(isEn ? `${c.labelEn} (C${c.ascodGrade}).` : `${c.labelZh} (C${c.ascodGrade})。`);
    }
  }
  if (!cGrades.includes(1) && (isMultiTerritory(inp.infarctPattern) || inp.systemicEmbolism === 'yes')) {
    cGrades.push(2);
    cNotes.push(isEn ? 'Bihemispheric/multi-territory infarct pattern or systemic embolism without direct C1 source (C2).' : '雙側或多血管區急性腦梗塞／全身性栓塞影像型態，但未見直接 C1 心源性病灶 (C2)。');
  }

  let gradeC = 0;
  if (cGrades.length > 0) {
    gradeC = Math.min(...cGrades);
  } else if (inp.cardiacEcg !== 'yes' || (inp.cardiacTte !== 'yes' && inp.cardiacTee !== 'yes')) {
    gradeC = 9;
    cNotes.push(isEn ? 'Incomplete cardiac workup: ECG or echocardiography missing (C9).' : '缺少完整心電圖或心臟超音波評估 (C9)。');
  } else {
    gradeC = 0;
    cNotes.push(isEn ? 'Cardiac pathology not detected (C0).' : '心臟檢查未見心因性栓塞來源 (C0)。');
  }
  details.C = { grade: gradeC, notes: cNotes };

  // --- O ---
  const selectedOthers = inp.otherEtiologies.map(id => OTHER_MAP.get(id)).filter(Boolean);
  let gradeO = 0;
  const oNotes = [];
  if (selectedOthers.length > 0) {
    if (inp.otherCausality === 'incidental') {
      gradeO = 3;
      oNotes.push(isEn ? 'Other systemic/rare disease present but judged unlikely causal (O3).' : '已記錄其他全身或罕見疾病，但判斷與本次中風無直接因果關聯 (O3)。');
    } else if (inp.otherCausality === 'uncertain') {
      gradeO = 2;
      oNotes.push(isEn ? 'Other cause present with uncertain causal link (O2).' : '其他病因與本次中風因果關聯未確定 (O2)。');
    } else {
      const mapped = selectedOthers.map(o => o.ascodGrade);
      gradeO = Math.min(...mapped);
      for (const o of selectedOthers) {
        oNotes.push(isEn ? `${o.labelEn} (ASCOD 2013: O${o.ascodGrade}).` : `${o.labelZh} (ASCOD 2013 評為 O${o.ascodGrade})。`);
      }
    }
  } else if (inp.otherWorkup === 'incomplete') {
    gradeO = 9;
    oNotes.push(isEn ? 'Insufficient workup to exclude other specific causes (O9).' : '尚未完成必要之其他病因鑑別檢查 (O9)。');
  } else {
    gradeO = 0;
    oNotes.push(isEn ? 'No other cause detected (O0).' : '未發現其他特定病因 (O0)。');
  }
  details.O = { grade: gradeO, notes: oNotes };

  // --- D ---
  let gradeD = 0;
  const dNotes = [];
  const isYoung = inp.ageBand === '18' || inp.ageBand === '30' || inp.ageBand === '40' || inp.ageBand === '50';
  const noGrade1Or2 = gradeA !== 1 && gradeA !== 2 && gradeS !== 1 && gradeC !== 1 && gradeO !== 1;
  if (inp.dissectionStatus === 'definite_ipsi') {
    gradeD = 1;
    dNotes.push(isEn ? 'Direct or indirect imaging proof of ipsilateral arterial dissection (D1).' : '直接或間接影像證實同側供血動脈剝離 (D1)。');
  } else if (inp.dissectionStatus === 'probable_ipsi') {
    gradeD = 2;
    dNotes.push(isEn ? 'Weak/indirect dissection evidence (e.g., painful Horner syndrome) or supplying-artery FMD (D2).' : '臨床高度懷疑動脈剝離（如疼痛性 Horner 症候群）或供血動脈 FMD (D2)。');
  } else if (inp.dissectionStatus === 'incidental_other') {
    gradeD = 3;
    dNotes.push(isEn ? 'Non-supplying arterial kinking, uncomplicated dolichoectasia, or non-supplying FMD (D3).' : '非供血動脈之動脈迂曲擴張或 FMD (D3)。');
  } else if (inp.dissectionStatus === 'not_evaluated' && isYoung && noGrade1Or2) {
    gradeD = 9;
    dNotes.push(isEn ? 'Age <60 yrs with no A1/A2/S1/C1/O1 and no fat-sat MRI or angiography within 15 days (D9).' : '年齡 <60 歲且無 A1/A2/S1/C1/O1 明確病因時，未執行脂肪抑制 T1 MRI 或血管攝影排除剝離 (D9)。');
  } else {
    gradeD = 0;
    dNotes.push(isEn ? 'No arterial dissection detected or suspected (D0).' : '無動脈剝離證據 (D0)。');
  }
  details.D = { grade: gradeD, notes: dNotes };

  const code = `A${gradeA} S${gradeS} C${gradeC} O${gradeO} D${gradeD}`;
  const ascoO = gradeD === 1 ? 1 : gradeO;
  const asco5069Downgrade = inp.ipsiAtherosclerosis === 'stenosis_50_69' && gradeA === 1;
  const ascoA = asco5069Downgrade ? 2 : gradeA;
  const ascoCode = `A${ascoA} S${gradeS} C${gradeC} O${ascoO}`;
  const ascoDeltaNotes = [];
  if (gradeD === 1) {
    ascoDeltaNotes.push(isEn ? 'ASCO 2009 lacked a D domain and classified dissection under O1.' : '2009 ASCO 無 D 欄，動脈剝離併入 O1。');
  }
  if (asco5069Downgrade) {
    ascoDeltaNotes.push(isEn ? 'ASCO 2009 used ≥70% for A1, so 50–69% stenosis was graded A2.' : '2009 ASCO 採 ≥70% 為 A1，50–69% 狹窄在 2009 版屬於 A2。');
  }

  return { code, details, ascoCode, ascoDeltaNotes };
}

// ---------------------------------------------------------------------------
// 4. Modern Evidence Extensions
// ---------------------------------------------------------------------------
export function evaluateModernExtensions(inp, ccs, lang = 'zh') {
  const isEn = lang === 'en';
  const selectedCardiac = inp.cardiacSources.map(id => CARDIAC_MAP.get(id)).filter(Boolean);
  const selectedOthers = inp.otherEtiologies.map(id => OTHER_MAP.get(id)).filter(Boolean);

  const nonLacunar =
    !isSmallDeepInfarct15(inp.infarctPattern) &&
    !(inp.brainModality === 'mri_dwi' && inp.infarctPattern === 'deep_15_20') &&
    inp.infarctPattern !== 'none_visible';
  const noGe50Stenosis = !isIpsiLaaGe50(inp.ipsiAtherosclerosis);
  const noMajorCardiac = !selectedCardiac.some(c => c.esusMajor);
  const noOtherSpecific =
    inp.dissectionStatus !== 'definite_ipsi' &&
    inp.dissectionStatus !== 'probable_ipsi' &&
    selectedOthers.filter(o => !o.isCancer).length === 0;
  const esusWorkupOk =
    inp.brainModality !== 'none' &&
    inp.vesselWorkup === 'complete' &&
    inp.cardiacEcg === 'yes' &&
    hasEchocardiography(inp) &&
    inp.cardiacMonitoring24h === 'yes';

  let esusStatus = 'not_met';
  let esusReason = '';
  if (inp.brainModality === 'none') {
    esusStatus = 'incomplete';
    esusReason = isEn
      ? 'Brain CT or MRI is required to confirm a non-lacunar infarct before ESUS can be assessed.'
      : '須先完成腦部 CT 或 MRI 確認為非小洞型梗塞，才能判定 ESUS。';
  } else if (!nonLacunar) {
    esusStatus = 'not_met';
    esusReason = isEn
      ? 'Does not meet non-lacunar infarct requirement (lacunar or no visible lesion).'
      : '不符合非小洞型梗塞條件（小洞中風或尚未見到梗塞病灶）。';
  } else if (!noGe50Stenosis || !noMajorCardiac || !noOtherSpecific) {
    esusStatus = 'not_met';
    esusReason = isEn
      ? 'Excluded by ≥50% stenosis, major-risk cardioembolic source, or other specific etiology.'
      : '已存在 ≥50% 動脈狹窄、主要高風險心源性栓塞或其他特定病因，不符合 ESUS 排除條件。';
  } else if (!esusWorkupOk) {
    esusStatus = 'incomplete';
    esusReason = isEn
      ? 'No major source found, but >24h cardiac rhythm monitoring or complete neurovascular/echo imaging is still pending.'
      : '目前無主要病因，但尚未完成 ESUS 必備之 >24 小時心律監測或完整血管/心臟影像。';
  } else {
    esusStatus = 'met';
    esusReason = isEn
      ? 'Meets Hart et al. (2014/2017) ESUS criteria; note NAVIGATE/RE-SPECT ESUS showed empiric DOAC was not superior to aspirin without targeted phenotyping.'
      : '符合 Hart et al. (2014/2017) ESUS 四項標準；需注意 NAVIGATE/RE-SPECT ESUS 顯示未篩選 ESUS 使用 DOAC 並未優於 Aspirin，應積極尋找潛在機制。';
  }

  const hasPfo = inp.cardiacSources.includes('pfo');
  let pfo = { applicable: false };
  if (hasPfo) {
    const agePointsMap = { '18': 5, '30': 4, '40': 3, '50': 2, '60': 1, '70': 0 };
    const ageKnown = inp.ageBand !== 'unknown';
    const agePts = ageKnown ? agePointsMap[inp.ageBand] : 0;
    const htnPts = inp.hypertension === 'no' ? 1 : 0;
    const dmPts = inp.diabetes === 'no' ? 1 : 0;
    const strokePts = inp.priorStrokeTia === 'no' ? 1 : 0;
    const smokePts = inp.smoker === 'no' ? 1 : 0;
    const corticalPts =
      inp.infarctPattern === 'cortical_or_cerebellar' ||
      inp.infarctPattern === 'multi_territory' ||
      inp.infarctPattern === 'multiple_same'
        ? 1
        : 0;
    const ropeScore = agePts + htnPts + dmPts + strokePts + smokePts + corticalPts;
    const afBand =
      ropeScore <= 3
        ? ROPE_ATTRIBUTABLE.low
        : ropeScore >= 9
          ? ROPE_ATTRIBUTABLE.high
          : ROPE_ATTRIBUTABLE[ropeScore];

    const highRope = ropeScore >= 7;
    const highRiskPfo = inp.pfoHighRiskAnatomy === 'yes';
    let pascalCat = 'Unlikely';
    if (highRope && highRiskPfo) pascalCat = 'Probable';
    else if (highRope || highRiskPfo) pascalCat = 'Possible';

    pfo = {
      applicable: true,
      ageKnown,
      ropeScore,
      afBand,
      pascalCategory: pascalCat,
      pascalEffect: PASCAL_EFFECTS[pascalCat],
      note:
        ccs.confidence === 'Evident' && !ccs.subtype5.includes('未確定') && !ccs.subtype5.includes('Undetermined')
          ? (isEn ? 'Note: Another Evident etiology is present; RoPE/PASCAL estimates incidental vs pathogenic PFO weight.' : '注意：本案另有顯著競爭病因，RoPE/PASCAL 僅供評估 PFO 附帶因果權重。')
          : (isEn ? 'Combines RoPE score with high-risk PFO anatomy (large shunt or ASA) to guide individualized closure.' : '結合 RoPE 分數與 PFO 高風險解剖 (大右向左分流或 ASA) 進行個體化封堵決策。')
    };
  }

  const flags = [];
  if (inp.ipsiAtherosclerosis === 'lt50_vulnerable' && !isMultiTerritory(inp.infarctPattern)) {
    flags.push({
      id: 'sync',
      title: isEn ? 'SyNC — Symptomatic Nonstenotic Carotid Disease (Goyal 2020)' : 'SyNC — 症狀性非狹窄性頸動脈疾病 (Goyal et al., 2020)',
      detail: isEn
        ? 'Ipsilateral <50% plaque with high-risk features (ulceration, IPH, thrombus, >3 mm) may drive artery-to-artery embolism.'
        : '同側 <50% 斑塊合併高風險不穩定特徵（潰瘍、出血、血栓或厚度 >3 mm），即使未達 50% 狹窄仍可能為動脈栓塞來源。'
    });
  }
  if (inp.carotidWeb === 'yes') {
    flags.push({
      id: 'carotid_web',
      title: isEn ? 'Carotid Web — Focal Intimal FMD (Mac Grory 2021)' : 'Carotid Web — 頸動脈蹼 (Mac Grory et al., 2021)',
      detail: isEn
        ? 'Posterior carotid bulb shelf-like membrane causes blood stasis and high recurrence on medical therapy alone.'
        : '內頸動脈球部後壁瓣狀纖維肌發育不良構造易造成血流滯留與反覆大血管栓塞，藥物單一治療復發率高。'
    });
  }
  if (inp.activeCancer === 'yes') {
    const hasNbteOrDic = selectedCardiac.some(c => c.id === 'nbte') || selectedOthers.some(o => o.id === 'hematologic');
    const isPossibleCris =
      inp.cancerAdvanced === 'yes' && (inp.highDdimer === 'yes' || isMultiTerritory(inp.infarctPattern));
    if (hasNbteOrDic) {
      flags.push({
        id: 'cris_probable',
        title: isEn ? 'AHA 2026 CRIS — Probable Cancer-Related Ischemic Stroke' : 'AHA 2026 CRIS — Probable 癌症相關缺血性中風',
        detail: isEn
          ? 'Active cancer with NBTE or DIC carries markedly elevated 1-year mortality (Navi 2026 / Gon 2026).'
          : '活動性癌症合併 NBTE 或 DIC 等癌症相關血栓病理證據，1 年死亡風險顯著升高 (Navi 2026 / Gon 2026)。'
      });
    } else if (isPossibleCris) {
      flags.push({
        id: 'cris_possible',
        title: isEn ? 'AHA 2026 CRIS — Possible Cancer-Related Ischemic Stroke' : 'AHA 2026 CRIS — Possible 癌症相關缺血性中風',
        detail: isEn
          ? 'Metastatic/progressive cancer with cryptogenic stroke + high D-dimer or multi-territory DWI infarcts.'
          : '轉移/進展期癌症合併隱源性中風及顯著 D-dimer 升高或多血管區梗塞，傳統 TOAST 常漏列為隱源性。'
      });
    } else {
      flags.push({
        id: 'cris_watch',
        title: isEn ? 'Active Cancer Context (CRIS Screening)' : '活動性癌症背景提示',
        detail: isEn
          ? 'Active cancer noted; check D-dimer and multi-territory DWI if no conventional etiology is established.'
          : '已標註活動性癌症；若無傳統明確病因，建議檢測 D-dimer 並評估是否符合 2026 AHA CRIS 分型。'
      });
    }
  }
  if (inp.cardiacSources.includes('atrial_cardiopathy') && !selectedCardiac.some(c => c.id === 'af_sustained' || c.id === 'af_brief_lone')) {
    flags.push({
      id: 'atrial_cardiopathy',
      title: isEn ? 'Atrial Cardiopathy Biomarkers (ARCADIA 2024)' : '心房心肌病變生物標記 (ARCADIA 2024)',
      detail: isEn
        ? 'ARCADIA showed empiric apixaban was not superior to aspirin without documented AF; prioritize prolonged rhythm monitoring.'
        : 'ARCADIA 隨機試驗顯示在無確診心房顫動時，經驗性 Apixaban 未優於 Aspirin；建議延長心律監測以偵測隱匿性 AF。'
    });
  }

  const missingWorkup = [];
  if (inp.brainModality === 'none') missingWorkup.push(isEn ? 'Brain imaging (CT or MRI-DWI)' : '尚未完成腦部影像 (CT 或 MRI-DWI)');
  if (inp.vesselWorkup !== 'complete') missingWorkup.push(isEn ? 'Complete extra- and intracranial vascular imaging (CTA/MRA/ultrasound)' : '尚未完成完整顱內＋顱外腦血管影像 (CTA/MRA/超音波)');
  if (inp.cardiacEcg !== 'yes') missingWorkup.push(isEn ? '12-lead ECG' : '尚未記錄 12 導程心電圖');
  if (inp.cardiacTte !== 'yes' && inp.cardiacTee !== 'yes') missingWorkup.push(isEn ? 'Transthoracic or transesophageal echocardiography (TTE/TEE)' : '尚未執行經胸或經食道心臟超音波 (TTE/TEE)');
  if (inp.cardiacMonitoring24h !== 'yes' && !selectedCardiac.some(c => c.id === 'af_sustained')) {
    missingWorkup.push(
      isEn
        ? '≥24h continuous cardiac rhythm monitoring (recommended by 2021 AHA/ASA Guideline)'
        : '尚未完成 ≥24 小時連續心律監測（AHA/ASA 2021 建議隱源性中風應追蹤延長心律監測）'
    );
  }

  return {
    esus: { status: esusStatus, reason: esusReason },
    pfo,
    flags,
    missingWorkup
  };
}

export function classifyStroke(raw = {}, lang = 'zh') {
  const input = normalizeInput(raw);
  const toast = classifyTOAST(input, lang);
  const ccs = classifyCCS(input, lang);
  const ascod = classifyASCOD(input, lang);
  const modern = evaluateModernExtensions(input, ccs, lang);
  return { lang, input, toast, ccs, ascod, modern };
}

export const TOOL_ATTRIBUTION = {
  zh: '— 產生工具：缺血性腦中風電腦化病因分型系統（馬偕紀念醫院 陳培豪醫師）https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/ ；僅供臨床與學術非營利參考，非醫療器材。',
  en: '— Generated by the Computerized Ischemic Stroke Etiologic Subtyping System (Pei-Hao Chen, MD, Mackay Memorial Hospital) https://a7662888.github.io/ischemic-stroke-subtyping-zh-TW/ ; for non-commercial clinical and academic reference only, not a medical device.'
};

export function formatPlainTextSummary(result, langOverride, version) {
  const lang = langOverride || result.lang || 'zh';
  const { toast, ccs, ascod, modern } = result;
  if (lang === 'en') {
    const lines = [
      '[Computerized Ischemic Stroke Etiologic Summary (De-identified)]',
      `1. TOAST (1993): ${toast.labelEn} [${toast.code}]`,
      '2. MGH CCS (2005–2010):',
      `   - 5-Subtype: ${ccs.subtype5} (${ccs.confidence})`,
      `   - 8-Subtype: ${ccs.subtype8}`,
      `   - 16-Subtype: ${ccs.subtype16}`,
      `   - Phenotypic: LAA=${ccs.phenotypic.laa} | CE=${ccs.phenotypic.ce} | SAO=${ccs.phenotypic.sao} | Other=${ccs.phenotypic.other}`,
      `3. ASCOD (2013): ${ascod.code} (ASCO 2009: ${ascod.ascoCode})`,
      `4. ESUS (2014/2017): ${modern.esus.status.toUpperCase()} — ${modern.esus.reason}`
    ];
    if (modern.pfo.applicable) {
      lines.push(`5. PFO / RoPE / PASCAL: RoPE=${modern.pfo.ropeScore}/10 (AF ${modern.pfo.afBand.af}), PASCAL=${modern.pfo.pascalCategory}`);
    }
    if (modern.flags.length > 0) {
      lines.push(`6. Modern Flags: ${modern.flags.map(f => f.title).join('; ')}`);
    }
    if (modern.missingWorkup.length > 0) {
      lines.push(`7. Pending Workup: ${modern.missingWorkup.join('; ')}`);
    }
    lines.push('', `${TOOL_ATTRIBUTION.en}${version ? ` (${version})` : ''}`);
    return lines.join('\n');
  }

  const lines = [
    '【缺血性腦中風電腦化病因分型摘要（去識別化）】',
    `1. TOAST (1993): ${toast.labelZh} [${toast.code}]`,
    `2. MGH CCS (2005–2010):`,
    `   - 5-Subtype: ${ccs.subtype5} (${ccs.confidence})`,
    `   - 8-Subtype: ${ccs.subtype8}`,
    `   - 16-Subtype: ${ccs.subtype16}`,
    `   - Phenotypic: LAA=${ccs.phenotypic.laa} | CE=${ccs.phenotypic.ce} | SAO=${ccs.phenotypic.sao} | Other=${ccs.phenotypic.other}`,
    `3. ASCOD (2013): ${ascod.code} (ASCO 2009 對照: ${ascod.ascoCode})`,
    `4. ESUS (2014/2017): ${modern.esus.status.toUpperCase()} — ${modern.esus.reason}`
  ];
  if (modern.pfo.applicable) {
    lines.push(
      `5. PFO / RoPE / PASCAL: RoPE=${modern.pfo.ropeScore}/10 (AF ${modern.pfo.afBand.af}), PASCAL=${modern.pfo.pascalCategory}`
    );
  }
  if (modern.flags.length > 0) {
    lines.push(`6. 現代文獻延伸標記: ${modern.flags.map(f => f.title).join('；')}`);
  }
  if (modern.missingWorkup.length > 0) {
    lines.push(`7. 建議補充檢查: ${modern.missingWorkup.join('；')}`);
  }
  lines.push('', `${TOOL_ATTRIBUTION.zh}${version ? `（${version}）` : ''}`);
  return lines.join('\n');
}
