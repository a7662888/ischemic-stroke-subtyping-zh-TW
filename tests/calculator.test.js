import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyStroke, formatPlainTextSummary } from '../calculator.js';
import { EXAMPLES } from '../data.js';

const BASE_CLEAN = {
  syndrome: 'non_lacunar',
  priorIpsilateralTia1m: 'no',
  stereotypicLacunarTia1w: 'no',
  systemicEmbolism: 'no',
  ageBand: '60',
  hypertension: 'no',
  diabetes: 'no',
  smoker: 'no',
  priorStrokeTia: 'no',
  activeCancer: 'no',
  cancerAdvanced: 'no',
  highDdimer: 'no',
  brainModality: 'mri_dwi',
  infarctPattern: 'cortical_or_cerebellar',
  chronicSvd: 'mild_or_none',
  vesselWorkup: 'complete',
  ipsiAtherosclerosis: 'none',
  ipsiNearOcclusion: 'no',
  nonSupplyingAth: 'none',
  aorticArch: 'none',
  dissectionStatus: 'none',
  carotidWeb: 'no',
  angioCutoffOrRecanalization: 'no',
  cardiacEcg: 'yes',
  cardiacMonitoring24h: 'yes',
  cardiacTte: 'yes',
  cardiacTee: 'no',
  cardiacSources: [],
  pfoHighRiskAnatomy: 'no',
  pfoVenousThrombosis: 'none',
  otherWorkup: 'complete',
  otherEtiologies: [],
  otherCausality: 'direct',
  prothromboticContext: 'no'
};

test('1. Pure LAA (>=50% stenosis + cortical infarct)', () => {
  const res = classifyStroke({ ...BASE_CLEAN, ipsiAtherosclerosis: 'stenosis_70_99' });
  assert.equal(res.toast.code, 'LAA');
  assert.equal(res.toast.certainty, 'Probable');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /大動脈粥樣硬化/);
  assert.equal(res.ascod.code, 'A1 S0 C0 O0 D0');
  assert.equal(res.modern.esus.status, 'not_met');
});

test('2. 50-69% stenosis: ASCOD 2013 A1 vs ASCO 2009 A2 compatibility note', () => {
  const res = classifyStroke({ ...BASE_CLEAN, ipsiAtherosclerosis: 'stenosis_50_69' });
  assert.equal(res.ascod.code, 'A1 S0 C0 O0 D0');
  assert.equal(res.ascod.ascoCode, 'A2 S0 C0 O0');
  assert.ok(res.ascod.ascoDeltaNotes.some(n => n.includes('70%')));
});

test('3. Pure CE (AF >60s + cortical infarct)', () => {
  const res = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['af_sustained'] });
  assert.equal(res.toast.code, 'CE');
  assert.equal(res.toast.certainty, 'Probable');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /心因性主動脈栓塞/);
  assert.equal(res.ascod.code, 'A0 S0 C1 O0 D0');
});

test('4. Atrial flutter: TOAST Medium (Possible) vs CCS High (Evident) vs ASCOD C1', () => {
  const res = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['atrial_flutter'] });
  assert.equal(res.toast.code, 'CE');
  assert.equal(res.toast.certainty, 'Possible');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.equal(res.ascod.details.C.grade, 1);
});

test('5. Transient AF <60s: ASCOD C3 vs CCS High', () => {
  const res = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['af_brief_lone'] });
  assert.equal(res.ascod.details.C.grade, 3);
  assert.equal(res.toast.certainty, 'Possible');
});

test('6. Pure SVO <=15 mm WITH chronic SVD -> TOAST SVO, CCS Evident SAO, ASCOD S1', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    syndrome: 'lacunar',
    infarctPattern: 'deep_le15',
    chronicSvd: 'severe_svd'
  });
  assert.equal(res.toast.code, 'SVO');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /小動脈阻塞/);
  assert.equal(res.ascod.details.S.grade, 1);
});

test('7. Isolated deep infarct <=15 mm WITHOUT chronic SVD or recent TIAs -> ASCOD S2 (Amarenco 2013)', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    syndrome: 'lacunar',
    infarctPattern: 'deep_le15',
    chronicSvd: 'mild_or_none'
  });
  assert.equal(res.toast.code, 'SVO');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.equal(res.ascod.details.S.grade, 2);
});

test('8. Boundary 15-20 mm deep infarct on DWI -> TOAST UD-Negative vs CCS Evident SAO', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    syndrome: 'lacunar',
    infarctPattern: 'deep_15_20'
  });
  assert.equal(res.toast.code, 'UD-Negative');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /小動脈阻塞/);
});

test('9. Competing Evident causes: 80% ICA + AF + recent ipsilateral TIA -> TOAST UD-Multiple, CCS Probable LAA, ASCOD A1 C1', () => {
  const res = classifyStroke(EXAMPLES[0].data);
  assert.equal(res.toast.code, 'UD-Multiple');
  assert.equal(res.ccs.confidence, 'Probable');
  assert.match(res.ccs.subtype5, /大動脈粥樣硬化/);
  assert.equal(res.ascod.details.A.grade, 1);
  assert.equal(res.ascod.details.C.grade, 1);
});

test('10. Competing Evident causes WITHOUT tie-breaker -> CCS Unclassified', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    ipsiAtherosclerosis: 'stenosis_70_99',
    cardiacSources: ['af_sustained']
  });
  assert.equal(res.toast.code, 'UD-Multiple');
  assert.match(res.ccs.subtype8, /Unclassified/);
});

test('11. Evident AF + Possible PFO -> CCS Evident CE wins, ASCOD retains C1', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    cardiacSources: ['af_sustained', 'pfo']
  });
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /心因性主動脈栓塞/);
  assert.equal(res.ascod.details.C.grade, 1);
});

test('12. Bihemispheric multi-territory DWI with 50-99% stenosis -> ASCOD A3 + C2', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    infarctPattern: 'multi_territory',
    ipsiAtherosclerosis: 'stenosis_70_99'
  });
  assert.equal(res.ascod.details.A.grade, 3);
  assert.equal(res.ascod.details.C.grade, 2);
});

test('13. Cervical arterial dissection -> TOAST OD, CCS Evident Other, ASCOD D1, ASCO O1', () => {
  const res = classifyStroke(EXAMPLES[3].data);
  assert.equal(res.toast.code, 'OD');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /其他病因/);
  assert.equal(res.ascod.details.D.grade, 1);
  assert.equal(res.ascod.ascoCode, 'A0 S0 C0 O1');
});

test('14. PFO + RoPE + PASCAL all 4 quadrants', () => {
  // Quadrant 1: High RoPE (9) + High-risk PFO -> Probable
  const q1 = classifyStroke(EXAMPLES[1].data);
  assert.equal(q1.modern.pfo.ropeScore, 9);
  assert.equal(q1.modern.pfo.pascalCategory, 'Probable');
  assert.equal(q1.ascod.details.C.grade, 2);

  // Quadrant 2: High RoPE (9) + Low-risk PFO -> Possible
  const q2 = classifyStroke({ ...EXAMPLES[1].data, pfoHighRiskAnatomy: 'no' });
  assert.equal(q2.modern.pfo.ropeScore, 9);
  assert.equal(q2.modern.pfo.pascalCategory, 'Possible');
  assert.equal(q2.ascod.details.C.grade, 3);

  // Quadrant 3: Low RoPE (<7) + High-risk PFO -> Possible
  const q3 = classifyStroke({
    ...BASE_CLEAN,
    ageBand: '70',
    hypertension: 'yes',
    diabetes: 'yes',
    cardiacSources: ['pfo'],
    pfoHighRiskAnatomy: 'yes'
  });
  assert.ok(q3.modern.pfo.ropeScore < 7);
  assert.equal(q3.modern.pfo.pascalCategory, 'Possible');

  // Quadrant 4: Low RoPE (<7) + Low-risk PFO -> Unlikely
  const q4 = classifyStroke({
    ...BASE_CLEAN,
    ageBand: '70',
    hypertension: 'yes',
    diabetes: 'yes',
    cardiacSources: ['pfo'],
    pfoHighRiskAnatomy: 'no'
  });
  assert.equal(q4.modern.pfo.pascalCategory, 'Unlikely');
});

test('15. PFO + preceding DVT/PE -> ASCOD C1', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    cardiacSources: ['pfo'],
    pfoVenousThrombosis: 'preceding'
  });
  assert.equal(res.ascod.details.C.grade, 1);
});

test('16. ESUS met vs incomplete (<24h cardiac monitoring)', () => {
  const met = classifyStroke({ ...BASE_CLEAN });
  assert.equal(met.modern.esus.status, 'met');

  const inc = classifyStroke({ ...BASE_CLEAN, cardiacMonitoring24h: 'no' });
  assert.equal(inc.modern.esus.status, 'incomplete');
});

test('17. <50% vulnerable plaque -> TOAST UD-Negative, CCS 2007 Evident LAA, ASCOD A1, SyNC flag', () => {
  const res = classifyStroke(EXAMPLES[4].data);
  assert.equal(res.toast.code, 'UD-Negative');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.match(res.ccs.subtype5, /大動脈粥樣硬化/);
  assert.equal(res.ascod.details.A.grade, 1);
  assert.ok(res.modern.flags.some(f => f.id === 'sync'));
});

test('18. Carotid Web flag triggers cleanly', () => {
  const res = classifyStroke({ ...BASE_CLEAN, carotidWeb: 'yes' });
  assert.ok(res.modern.flags.some(f => f.id === 'carotid_web'));
});

test('19. AHA 2026 CRIS Probable (NBTE) and Possible (advanced cancer + high D-dimer + multi-territory)', () => {
  const prob = classifyStroke({
    ...BASE_CLEAN,
    activeCancer: 'yes',
    cardiacSources: ['nbte']
  });
  assert.ok(prob.modern.flags.some(f => f.id === 'cris_probable'));

  const poss = classifyStroke({
    ...BASE_CLEAN,
    activeCancer: 'yes',
    cancerAdvanced: 'yes',
    highDdimer: 'yes',
    infarctPattern: 'multi_territory'
  });
  assert.ok(poss.modern.flags.some(f => f.id === 'cris_possible'));
});

test('20. Atrial cardiopathy biomarker flag (ARCADIA 2024)', () => {
  const res = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['atrial_cardiopathy'] });
  assert.ok(res.modern.flags.some(f => f.id === 'atrial_cardiopathy'));
});

test('21. Cryptogenic Embolism in CCS (abrupt angiographic cutoff with complete workup)', () => {
  const res = classifyStroke({ ...BASE_CLEAN, angioCutoffOrRecanalization: 'yes' });
  assert.match(res.ccs.subtype8, /Cryptogenic embolism/);
});

test('22. Incomplete workup -> TOAST UD-Incomplete, CCS Incomplete evaluation, ASCOD 9s', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    brainModality: 'none',
    vesselWorkup: 'none',
    cardiacEcg: 'no',
    cardiacTte: 'no',
    otherWorkup: 'incomplete'
  });
  assert.equal(res.toast.code, 'UD-Incomplete');
  assert.match(res.ccs.subtype8, /Incomplete evaluation/);
  assert.equal(res.ascod.details.A.grade, 9);
  assert.equal(res.ascod.details.S.grade, 9);
  assert.equal(res.ascod.details.C.grade, 9);
  assert.equal(res.ascod.details.O.grade, 9);
});

test('23. Young patient (<60y) with no A1/A2/S1/C1/O1 and dissection not_evaluated -> ASCOD D9', () => {
  const res = classifyStroke({
    ...BASE_CLEAN,
    ageBand: '40',
    dissectionStatus: 'not_evaluated'
  });
  assert.equal(res.ascod.details.D.grade, 9);
});

test('24. Malformed / unknown enum inputs fall back safely without throwing', () => {
  const res = classifyStroke({
    syndrome: '<script>alert(1)</script>',
    ipsiAtherosclerosis: 'bogus',
    cardiacSources: ['not_real', 'af_sustained'],
    otherEtiologies: null
  });
  assert.equal(res.toast.code, 'CE');
  const txt = formatPlainTextSummary(res);
  assert.ok(!txt.includes('<script>'));
});

test('25. All 5 EXAMPLES run and produce non-empty plain text summary', () => {
  for (const ex of EXAMPLES) {
    const res = classifyStroke(ex.data);
    const txt = formatPlainTextSummary(res);
    assert.ok(txt.includes('TOAST'));
    assert.ok(txt.includes('MGH CCS'));
    assert.ok(txt.includes('ASCOD'));
  }
});

test('26. Mitral stenosis without AF -> TOAST Possible CE; with AF -> TOAST Probable CE', () => {
  const noAf = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['mitral_stenosis'] });
  assert.equal(noAf.toast.code, 'CE');
  assert.equal(noAf.toast.certainty, 'Possible');

  const withAf = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['mitral_stenosis', 'af_sustained'] });
  assert.equal(withAf.toast.code, 'CE');
  assert.equal(withAf.toast.certainty, 'Probable');
});

test('27. Bioprosthetic valve -> TOAST Possible CE, CCS Evident CE, ASCOD C2', () => {
  const res = classifyStroke({ ...BASE_CLEAN, cardiacSources: ['bioprosthetic_valve'] });
  assert.equal(res.toast.code, 'CE');
  assert.equal(res.toast.certainty, 'Possible');
  assert.equal(res.ccs.confidence, 'Evident');
  assert.equal(res.ascod.details.C.grade, 2);
});
