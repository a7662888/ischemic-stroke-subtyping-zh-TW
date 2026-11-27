// © 2026 Pei-Hao Chen, MD (陳培豪醫師), Mackay Memorial Hospital. All rights reserved.
// Non-commercial clinical and academic use only; see LICENSE.
// Bilingual (zh-TW Taiwan medical terminology / English) clinical glossary
// Used for interactive hover/tap tooltips and the detailed manual (guide.html).

export const GLOSSARY = {
  // --- Clinical Presentation ---
  syndrome: {
    zh: {
      title: '臨床神經學症候群（Clinical Syndrome）',
      def: '依 Fisher 定義，典型小洞症候群包含：純運動性輕偏癱、純感覺性中風、感覺運動性中風、運動失調性輕偏癱、構音障礙－笨拙手症候群，且絕不可出現失語、半側忽略、視野缺損等皮質功能障礙。',
      criteria: 'TOAST 1993；SSS-TOAST 2005',
      impact: '缺乏皮質徵象且符合五大症候群之一，為 TOAST / CCS 診斷小血管阻塞（SVO/SAO）的重要臨床前提。'
    },
    en: {
      title: 'Clinical Neurological Syndrome',
      def: 'Classical lacunar syndromes (Fisher) include pure motor hemiparesis, pure sensory stroke, sensorimotor stroke, ataxic hemiparesis, and dysarthria–clumsy hand syndrome, strictly without cortical signs (aphasia, neglect, visual field cut).',
      criteria: 'TOAST 1993; SSS-TOAST 2005',
      impact: 'Supports Small-Vessel Occlusion (SVO/SAO) when paired with a deep penetrating-artery infarct.'
    }
  },
  priorIpsilateralTia1m: {
    zh: {
      title: '近期同側 TIA / 暫時性單眼盲（TMB）',
      def: '發病前 1 個月內發生於同一供血動脈支配區之短暫性腦缺血發作或單眼黑矇（amaurosis fugax）。',
      criteria: 'MGH CCS / SSS-TOAST Table 1',
      impact: '當同時存在競爭病因（如 LAA 合併 AF）時，CCS 將近期同側事件視為大動脈粥樣硬化（LAA）的 Probable 勝出條件；亦為 ASCOD S1 之輔助條件。'
    },
    en: {
      title: 'Recent Ipsilateral TIA / Transient Monocular Blindness',
      def: 'One or more TIAs, transient monocular blindness (amaurosis fugax), or prior strokes within the territory of the index artery within the preceding month.',
      criteria: 'MGH CCS / SSS-TOAST Table 1',
      impact: 'Qualifies LAA as "Probable" during CCS tie-breaking; repeated recent TIAs in the same territory also support ASCOD S1.'
    }
  },
  stereotypicLacunarTia1w: {
    zh: {
      title: '刻板型小洞 TIA（Capsular Warning Syndrome）',
      def: '發病前 1 週內反覆出現相同型態之短暫性純運動或感覺運動缺損，反映穿通枝動脈血流波動或即將閉塞。',
      criteria: 'Ay et al., Ann Neurol 2005 Table 1',
      impact: 'SSS-TOAST / MGH CCS 列為 Small-artery occlusion 的 Probable 佐證。'
    },
    en: {
      title: 'Stereotypic Lacunar TIAs (Within Past Week)',
      def: 'Recurrent, stereotypic lacunar TIAs (e.g., capsular warning syndrome) within 7 days prior to infarction, reflecting unstable penetrating-artery perfusion.',
      criteria: 'Ay et al., Ann Neurol 2005 Table 1',
      impact: 'Supports "Probable" Small-Artery Occlusion in SSS-TOAST / MGH CCS.'
    }
  },
  systemicEmbolism: {
    zh: {
      title: '全身性動脈栓塞（Systemic Embolism）',
      def: '影像或臨床證實同時或近期發生腎臟、脾臟、腸繫膜、視網膜或四肢周邊動脈急性栓塞。',
      criteria: 'Ay 2005 Table 1；Amarenco 2013 Table 2',
      impact: 'CCS 列為 Cardio-aortic embolism Probable 條件；ASCOD 2013 無直接 C1 病灶時評為 C2。'
    },
    en: {
      title: 'Objective Systemic Embolism',
      def: 'Clinical or imaging evidence of acute embolism to renal, splenic, mesenteric, retinal, or limb arteries.',
      criteria: 'Ay 2005 Table 1; Amarenco 2013 Table 2',
      impact: 'Qualifies Cardio-aortic Embolism as "Probable" in CCS; graded C2 in ASCOD if no direct C1 cardiac source is found.'
    }
  },
  activeCancer: {
    zh: {
      title: '活動性惡性腫瘤與 CRIS（Cancer-Related Ischemic Stroke）',
      def: '近 6 個月內接受抗癌治療、未治療或具遠端轉移之惡性腫瘤。腫瘤促凝物質可引發非細菌性血栓性心內膜炎（NBTE）、DIC 或跨區微栓塞。',
      criteria: 'AHA CRIS 2026 (Navi 2026 / Gon 2026)',
      impact: '傳統 TOAST 常誤歸為隱源性中風，ASCOD 2013 原列 O3；AHA 2026 新制將合併 NBTE/DIC 歸為 Probable CRIS，轉移/進展期合併高 D-dimer 或多區梗塞歸為 Possible CRIS。'
    },
    en: {
      title: 'Active Cancer & CRIS Classification',
      def: 'Malignancy treated within 6 months, untreated, or metastatic/progressive. Cancer-associated hypercoagulability can cause NBTE, DIC, or multi-territory arterial thromboembolism.',
      criteria: 'AHA CRIS 2026 (Navi 2026 / Gon 2026)',
      impact: 'Reclassifies many cryptogenic/TOAST-undetermined strokes into Probable (NBTE/DIC) or Possible CRIS (advanced cancer + high D-dimer or multi-territory DWI).'
    }
  },

  // --- Brain Imaging ---
  brainModality: {
    zh: {
      title: '腦部影像檢查模式（MRI-DWI vs CT）',
      def: 'MRI 擴散加權影像（DWI）對急性期點狀皮質微栓塞、後顱窩腦幹小洞及跨血管區病灶之敏感度遠高於非顯影電腦斷層（NCCT）。',
      criteria: 'SSS-TOAST 2005；ASCOD S9 規則',
      impact: '未執行任何腦部影像時，TOAST 歸入檢查不完整，ASCOD 評為 S9；僅作 CT 且陰性時，CCS 僅能判為 Possible SAO。'
    },
    en: {
      title: 'Brain Imaging Modality (MRI-DWI vs CT)',
      def: 'MRI Diffusion-Weighted Imaging (DWI) has markedly higher sensitivity than non-contrast CT for acute punctate cortical emboli, brainstem lacunes, and multi-territory infarcts.',
      criteria: 'SSS-TOAST 2005; ASCOD 2013',
      impact: 'No brain imaging triggers Incomplete Evaluation / ASCOD S9; negative CT with lacunar syndrome limits CCS SAO to Possible.'
    }
  },
  infarctPattern: {
    zh: {
      title: '急性梗塞型態與徑線閾值（15 mm vs 20 mm）',
      def: '深部基底核/腦幹穿通枝梗塞的最大徑閾值在不同系統有關鍵差異：TOAST 與 ASCOD 採 <15 mm；MGH CCS 與 ESUS (DWI) 放寬至 <20 mm（考量急性期 DWI 水腫擴張）。雙側前循環或前後循環同時出現急性梗塞（「三血管區徵象」）高度提示近端心源性或全身性高凝血栓塞。',
      criteria: 'TOAST (<15 mm) vs CCS (<20 mm) vs ASCOD (<15 mm)',
      impact: '15–20 mm 深部梗塞在 CCS 可達 Evident SAO，但在傳統 TOAST 會因超過 15 mm 而落入未確定型；多血管區梗塞則將 ASCOD 50–99% 狹窄降級為 A3 並觸發 C2。'
    },
    en: {
      title: 'Acute Infarct Pattern & Size Cutoffs (15 mm vs 20 mm)',
      def: 'Deep penetrating-artery lacunes use <15 mm in TOAST/ASCOD but <20 mm on MRI-DWI in MGH CCS and ESUS. Internal borderzone ("string of pearls") infarcts suggest hemodynamic LAA; simultaneous bihemispheric or anterior+posterior infarcts ("three-territory sign") suggest central embolism or cancer coagulopathy.',
      criteria: 'Adams 1993; Ay 2007; Amarenco 2013',
      impact: 'A 15–20 mm DWI deep infarct qualifies as Evident SAO in CCS but falls out of TOAST SVO; multi-territory DWI downgrades 50–99% stenosis to ASCOD A3.'
    }
  },
  chronicSvd: {
    zh: {
      title: '慢性腦小血管病變影像負荷（Chronic SVD Burden）',
      def: '包含融合性深部白質高訊號（Fazekas III leukoaraiosis）、陳舊性小洞梗塞、T2*/SWI 深部腦微出血，或嚴重血管周圍腔擴大（état criblé）。',
      criteria: 'Amarenco et al., 2013 Table 2 (ASCOD S1/S2/S3)',
      impact: 'ASCOD 2013 規定：單一急性小洞 (<15 mm) 若無慢性 SVD 負荷或近期反覆 TIA，僅能評為 S2；有慢性 SVD 始為 S1。非小洞中風併有慢性 SVD 則記為 S3。'
    },
    en: {
      title: 'Chronic Small-Vessel Disease (SVD) Imaging Burden',
      def: 'Includes confluent leukoaraiosis (Fazekas grade III), older lacunar infarcts in other territories, deep cerebral microbleeds, or severe perivascular space dilatation (état criblé).',
      criteria: 'Amarenco et al., 2013 Table 2',
      impact: 'In ASCOD 2013, an isolated acute <15 mm lacune WITHOUT chronic SVD or recent TIAs is graded S2 (not S1). Presence in non-lacunar strokes yields S3.'
    }
  },

  // --- Vascular Imaging ---
  vesselWorkup: {
    zh: {
      title: '顱內外血管影像完整度',
      def: '完整評估應同時涵蓋頸部顱外動脈（頸動脈/椎動脈）與顱內 Willis 環主要動脈（CTA、MRA、超音波或 DSA）。',
      criteria: 'Amarenco 2013 (A0/A9)；Ay 2007',
      impact: '僅檢查顱外段而漏掉顱內段，無法排除顱內動脈硬化（ICAD），在 ASCOD 會判為 A9（除非已發現顯著 A1 病灶）。'
    },
    en: {
      title: 'Extracranial + Intracranial Vessel Imaging Completeness',
      def: 'Complete vascular workup requires assessment of both extracranial cervical arteries (Duplex/CTA/MRA) and intracranial arteries (TCD/MRA/CTA/DSA).',
      criteria: 'Amarenco 2013 (A0/A9); Ay 2007',
      impact: 'Missing either intracranial or extracranial evaluation yields ASCOD A9 unless an A1 lesion is already established.'
    }
  },
  ipsiAtherosclerosis: {
    zh: {
      title: '同側供血動脈粥樣硬化與非狹窄性不穩定斑塊 (SyNC)',
      def: '依 NASCET 標準量測管腔狹窄率。傳統以 ≥50% 為顯著狹窄；近年高解析管壁 MRI (HR-VWI) 與 CTA 證實 <50% 斑塊若具斑塊內出血 (IPH)、表面潰瘍、纖維帽破裂、腔內血栓或厚度 >3 mm，仍具高度動脈栓塞風險。',
      criteria: 'CCS 2007 Table 1；ASCOD 2013 A1；SyNC (Goyal 2020)',
      impact: '<50% 合併潰瘍/血栓在 CCS 2007 已升為 Evident LAA，在 ASCOD 2013 為 A1，並觸發 SyNC 標記；50–69% 在 2009 ASCO 為 A2、2013 ASCOD 為 A1。'
    },
    en: {
      title: 'Ipsilateral Atherosclerosis & Vulnerable Non-Stenotic Plaque (SyNC)',
      def: 'NASCET luminal stenosis grading. Even when <50%, plaques showing intraplaque hemorrhage (IPH), ulceration, fibrous cap rupture, >3 mm thickness, or endoluminal thrombus carry high embolic risk.',
      criteria: 'CCS 2007 Table 1; ASCOD A1; Goyal et al. 2020',
      impact: '<50% plaque with ulceration/thrombus is Evident LAA in CCS 2007 and A1 in ASCOD 2013, triggering the SyNC flag.'
    }
  },
  aorticArch: {
    zh: {
      title: '主動脈弓複雜斑塊（Aortic Arch Atheroma）',
      def: '升主動脈或近端主動脈弓斑塊，經 TEE 或主動脈弓 CTA 測量厚度與是否附著可移動血栓（mobile thrombus）。',
      criteria: 'Amarenco 2013 Table 2；Ay 2005 Table 2',
      impact: 'ASCOD：可移動血栓 = A1；≥4 mm 無血栓 = A2；<4 mm = A3。CCS 歸入心因性主動脈栓塞系統考量。'
    },
    en: {
      title: 'Aortic Arch Atheroma',
      def: 'Atherosclerotic plaque in the ascending aorta or proximal arch assessed by TEE or aortic arch CTA.',
      criteria: 'Amarenco 2013 Table 2; Ay 2005 Table 2',
      impact: 'ASCOD: Mobile thrombus = A1; ≥4 mm plaque without mobile thrombus = A2; <4 mm plaque = A3.'
    }
  },
  dissectionStatus: {
    zh: {
      title: '頭頸部動脈剝離（Arterial Dissection）',
      def: '動脈內膜撕裂形成壁內血腫，典型影像包含脂肪抑制 T1 MRI 新月形高訊號（crescent sign）、雙腔（double lumen）、內膜瓣（intimal flap）或頸動脈分叉上方漸細火焰狀阻塞。',
      criteria: 'Amarenco 2013 D1–D9',
      impact: 'TOAST 歸入 OD；CCS 歸入 Other (30 天時窗)；ASCOD 2013 獨立設為 D1（<60 歲無其他明確病因且未檢查則為 D9）。'
    },
    en: {
      title: 'Cervicocephalic Arterial Dissection',
      def: 'Intimal tear with intramural hematoma; hallmark imaging includes fat-suppressed T1 crescent sign, double lumen, intimal flap, or tapered flame-shaped occlusion distal to the carotid bulb.',
      criteria: 'Amarenco 2013 D1–D9',
      impact: 'TOAST OD; CCS Other (30-day temporal rule); ASCOD D1 (<60 yrs without A1/A2/S1/C1/O1 and no fat-sat MRI/DSA = D9).'
    }
  },
  carotidWeb: {
    zh: {
      title: '頸動脈蹼（Carotid Web）',
      def: '內頸動脈球部後壁突入管腔之薄層瓣狀構造，病理上屬局部內膜纖維肌發育不良（focal intimal FMD），易於瓣膜後方產生血流滯留與原位血栓。',
      criteria: 'Mac Grory et al., PLoS One 2021 (PMID 34534252)',
      impact: '超音波極易漏診，需靠矢狀斜位 CTA 或 DSA 辨識；年輕隱源性中風單用抗血小板藥物復發率高。'
    },
    en: {
      title: 'Carotid Web (Focal Intimal FMD)',
      def: 'Shelf-like non-atheromatous membrane projecting from the posterior wall of the internal carotid bulb, creating flow stasis and recurrent artery-to-artery thromboembolism.',
      criteria: 'Mac Grory et al., PLoS One 2021',
      impact: 'Best visualized on sagittal-oblique CTA or DSA; often missed on routine ultrasound and carries high recurrence risk on medical therapy alone.'
    }
  },
  angioCutoffOrRecanalization: {
    zh: {
      title: '正常血管突然截斷或完全自發再通',
      def: '腦血管攝影顯示原本管壁平滑正常之顱內動脈突然截斷（abrupt cutoff），或追蹤影像顯示先前阻塞血管完全再通，高度提示外來血栓栓塞而非原位動脈硬化。',
      criteria: 'Ay et al., 2005 / 2007 Table 1',
      impact: '在排除其他原因後，使 MGH CCS 將未確定型細分為「隱源性栓塞（Cryptogenic embolism）」。'
    },
    en: {
      title: 'Abrupt Angiographic Cutoff / Complete Recanalization',
      def: 'Sudden vessel cutoff in an otherwise smooth, normal-appearing intracranial artery, or complete spontaneous recanalization of a prior occlusion.',
      criteria: 'Ay et al., 2005 / 2007 Table 1',
      impact: 'Assigns CCS undetermined cases to "Cryptogenic embolism" rather than "Other cryptogenic".'
    }
  },

  // --- All 23 Cardiac Sources ---
  af_sustained: {
    zh: {
      title: '心房顫動（>60 秒陣發性、持續性或永久性）',
      def: '心房電氣混亂導致左心耳血流滯留與血栓形成，為最常見之高風險心因性腦栓塞來源（年風險 >2%）。',
      criteria: 'TOAST High；CCS High (≥2%/yr)；ASCOD C1 (>60s)',
      impact: '三系統均列為最高風險（TOAST Probable CE / CCS Evident CE / ASCOD C1），並排除 ESUS。'
    },
    en: {
      title: 'Atrial Fibrillation (Paroxysmal >60s, Persistent, Permanent)',
      def: 'Disorganized atrial activation causing left atrial appendage stasis and thromboembolism (>2%/yr primary stroke risk).',
      criteria: 'TOAST High; CCS High; ASCOD C1 (>60s)',
      impact: 'Major cardioembolic source across all systems; excludes ESUS.'
    }
  },
  af_brief_lone: {
    zh: {
      title: '孤立性或極短暫心房顫動（<60 秒 / Lone AF）',
      def: '無結構性心臟病之年輕孤立性 AF，或心律監測僅捕捉到 <60 秒之極短暫陣發性心房顫動。',
      criteria: 'TOAST Medium；CCS High；ASCOD C3 (<60s)',
      impact: '注意跨系統差異：TOAST 列中風險 (Possible)、ASCOD 2013 將 <60 秒暫時性 AF 降為 C3，但 CCS 仍視為高風險並排除 ESUS。'
    },
    en: {
      title: 'Lone AF or Brief Paroxysmal AF (<60s)',
      def: 'Lone AF without structural heart disease, or brief atrial fibrillation episodes lasting <60 seconds on telemetry/Holter.',
      criteria: 'TOAST Medium; CCS High; ASCOD C3 (<60s)',
      impact: 'Graded Possible in TOAST and C3 in ASCOD 2013, whereas CCS treats paroxysmal AF as High-risk and excludes ESUS.'
    }
  },
  atrial_flutter: {
    zh: {
      title: '持續性心房撲動（Sustained Atrial Flutter）',
      def: '規律快速之心房折返心律不整，臨床栓塞風險與心房顫動相當且常合併隱匿性 AF。',
      criteria: 'TOAST Medium → CCS High (2005 升級) / ASCOD C1',
      impact: '1993 TOAST 原列中風險，但 SSS-TOAST (2005) 與 ASCOD (2013) 依實證升級為高風險 (Evident / C1)。'
    },
    en: {
      title: 'Sustained Atrial Flutter',
      def: 'Macro-reentrant atrial arrhythmia carrying thromboembolic risk comparable to atrial fibrillation.',
      criteria: 'TOAST Medium → CCS High (promoted 2005) / ASCOD C1',
      impact: 'Promoted from TOAST medium-risk to High-risk in SSS-TOAST/CCS and C1 in ASCOD.'
    }
  },
  sss: {
    zh: {
      title: '病竇症候群 / 心搏過速－過緩症候群',
      def: '竇房結功能障礙合併陣發性心房頻脈與心搏過緩（tachy-brady syndrome），易合併左心房停滯與 AF。',
      criteria: 'TOAST High；CCS High；ASCOD C1',
      impact: '三系統均視為主要高風險心因性來源（Evident / C1）。'
    },
    en: {
      title: 'Sick Sinus Syndrome / Tachycardia–Bradycardia',
      def: 'Sinus node dysfunction alternating with atrial tachyarrhythmias, predisposing to atrial stasis and thrombus.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk cardioembolic source in TOAST, CCS, and ASCOD (C1).'
    }
  },
  la_thrombus: {
    zh: {
      title: '左心房或左心耳血栓',
      def: '經食道心臟超音波（TEE）或心臟 CT 直接偵測到左心房或左心耳內血栓。',
      criteria: 'TOAST High；CCS High；ASCOD C1',
      impact: '直接確認之高風險栓塞來源，排除 ESUS。'
    },
    en: {
      title: 'Left Atrial / Appendage Thrombus',
      def: 'Direct visualization of thrombus within the left atrium or left atrial appendage on TEE or cardiac CT.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'Definite high-risk cardioembolic source; excludes ESUS.'
    }
  },
  lv_thrombus: {
    zh: {
      title: '左心室壁內血栓',
      def: '常見於前壁心肌梗塞或嚴重心肌病變後之左心室心尖壁內血栓。',
      criteria: 'TOAST High；CCS High；ASCOD C1',
      impact: '高風險心因性栓塞來源，排除 ESUS。'
    },
    en: {
      title: 'Left Ventricular Mural Thrombus',
      def: 'Thrombus adherent to akinetic/aneurysmal LV wall, typically after anterior MI or severe cardiomyopathy.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk cardioembolic source across all systems; excludes ESUS.'
    }
  },
  mechanical_valve: {
    zh: {
      title: '機械性人工心臟瓣膜',
      def: '雙葉或球籠式機械瓣膜，具高度血栓栓塞傾向。',
      criteria: 'TOAST High；CCS High；ASCOD C1',
      impact: '三系統皆為高風險（Probable / Evident / C1），排除 ESUS。'
    },
    en: {
      title: 'Mechanical Prosthetic Heart Valve',
      def: 'Mechanical mitral or aortic valve prosthesis carrying high lifelong thromboembolic risk.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk source across TOAST, CCS, and ASCOD; excludes ESUS.'
    }
  },
  bioprosthetic_valve: {
    zh: {
      title: '生物性人工心臟瓣膜',
      def: '豬或牛心包膜生物瓣膜；術後早期或瓣膜退化時仍具顯著栓塞風險。',
      criteria: 'TOAST Medium → CCS High (2005 升級) / ASCOD C2',
      impact: 'SSS-TOAST (2005) 將其升級為高風險（>2%），而 ASCOD 2013 僅將機械瓣明列 C1，故系統按各原文精確分別標註。'
    },
    en: {
      title: 'Bioprosthetic Heart Valve',
      def: 'Porcine or bovine bioprosthetic valve with elevated early and late thromboembolic risk.',
      criteria: 'TOAST Medium → CCS High (promoted 2005) / ASCOD C2',
      impact: 'Promoted to High-risk in SSS-TOAST/CCS and excludes ESUS; graded C2 in ASCOD 2013 (where only mechanical valves are C1).'
    }
  },
  mitral_stenosis: {
    zh: {
      title: '風濕性二尖瓣狹窄（瓣膜面積 <1.5 cm²）',
      def: '風濕性心臟病造成左心房壓力升高與顯著擴大，常合併心房顫動。',
      criteria: 'TOAST High (併 AF) / Medium (無 AF)；CCS High；ASCOD C1',
      impact: 'TOAST 1993 區分是否合併 AF；CCS 與 ASCOD 2013 (<1.5 cm²) 皆直接視為高風險。'
    },
    en: {
      title: 'Rheumatic Mitral Stenosis (Area <1.5 cm²)',
      def: 'Mitral valve narrowing causing severe LA enlargement and stasis.',
      criteria: 'TOAST High (with AF) / Medium (no AF); CCS High; ASCOD C1',
      impact: 'TOAST requires AF for Probable CE; CCS and ASCOD (<1.5 cm²) classify directly as high-risk/C1.'
    }
  },
  recent_mi_4wk: {
    zh: {
      title: '近期心肌梗塞（發作前 <4 週）',
      def: '急性心肌梗塞後 4 週內，因心肌頓抑、局部無收縮與發炎反應易形成左心室血栓。',
      criteria: 'TOAST High；CCS High (<1 month)；ASCOD C1 (<4 weeks)',
      impact: '三系統均列為高風險；在 CCS 競爭病因時具明確時間關聯性。'
    },
    en: {
      title: 'Recent Myocardial Infarction (<4 Weeks)',
      def: 'Acute MI within 4 weeks preceding stroke, carrying high risk of LV mural thrombosis.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk source in all systems; qualifies temporal relation in CCS.'
    }
  },
  low_ef_hf: {
    zh: {
      title: '嚴重左心室收縮不良 / 心肌病變（LVEF <30–35%）',
      def: '包含陳舊性 MI 併 LVEF ≤28%、症狀性心衰竭 LVEF ≤30%、擴張型或肥厚型心肌病變（ASCOD 採 LVEF <35%）。',
      criteria: 'TOAST High/Med；CCS High (≤28–30%)；ASCOD C1 (<35%)',
      impact: '三系統皆視為顯著心源性栓塞風險並排除 ESUS。'
    },
    en: {
      title: 'Severe LV Systolic Dysfunction / Cardiomyopathy (LVEF <30–35%)',
      def: 'Chronic MI with EF ≤28%, symptomatic CHF with EF ≤30% (CCS), dilated/hypertrophic cardiomyopathy, or LVEF <35% (ASCOD).',
      criteria: 'CCS High; ASCOD C1; ESUS Major (<30%)',
      impact: 'Treated as high-risk cardioembolic source and excludes ESUS.'
    }
  },
  lv_aneurysm: {
    zh: {
      title: '左心室動脈瘤或無收縮區段（無可見血栓）',
      def: '陳舊性梗塞後形成之左心室壁膨出瘤或無收縮（akinesia），超音波未見明確血栓。',
      criteria: 'TOAST High；CCS Low (無血栓時)；ASCOD C1 (LV aneurysm)',
      impact: 'CCS 2005 將無血栓之 LV aneurysm 列為低/不確定風險；ASCOD 2013 列為 C1。'
    },
    en: {
      title: 'LV Aneurysm or Akinetic Segment (No Visible Thrombus)',
      def: 'Left ventricular aneurysm or akinesia without visualized intracavitary thrombus.',
      criteria: 'TOAST High; CCS Low (no thrombus); ASCOD C1',
      impact: 'Classified as low/uncertain risk in CCS Table 2 when thrombus is absent, but C1 in ASCOD.'
    }
  },
  infective_endocarditis: {
    zh: {
      title: '感染性心內膜炎（Infective Endocarditis）',
      def: '細菌或黴菌於心臟瓣膜形成易碎性贅生物（vegetations），極易剝落造成多發性敗血性腦栓塞。',
      criteria: 'TOAST High；CCS High；ASCOD C1',
      impact: '絕對高風險來源；需警惕同時合併感染性動脈瘤或出血風險。'
    },
    en: {
      title: 'Infective Endocarditis',
      def: 'Microbial valvular vegetations causing septic cerebral emboli.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk source across all systems; excludes ESUS.'
    }
  },
  nbte: {
    zh: {
      title: '非細菌性血栓性心內膜炎（NBTE / Marantic）',
      def: '無菌性纖維蛋白－血小板瓣膜贅生物，常見於活動性癌症（特別是腺癌）或自體免疫疾病。',
      criteria: 'TOAST Medium → CCS High (2005 升級) / ASCOD C1 / AHA 2026 CRIS Probable',
      impact: 'SSS-TOAST (2005) 升級為高風險；在活動性癌症患者同時符合 AHA 2026 Probable CRIS。'
    },
    en: {
      title: 'Nonbacterial Thrombotic Endocarditis (NBTE / Marantic)',
      def: 'Sterile fibrin-platelet valvular vegetations classically associated with active malignancy or autoimmune disease.',
      criteria: 'TOAST Medium → CCS High / ASCOD C1 / AHA CRIS Probable',
      impact: 'Promoted to High-risk in CCS and C1 in ASCOD; defines Probable CRIS when active cancer is present.'
    }
  },
  cardiac_tumor: {
    zh: {
      title: '心臟腫瘤（左心房黏液瘤 / 乳頭狀彈力纖維瘤）',
      def: '原發性良性心臟腫瘤，表面血栓或腫瘤碎片可直接隨血流造成腦栓塞。',
      criteria: 'TOAST High (myxoma)；CCS High (myxoma + fibroelastoma)；ASCOD C1',
      impact: 'SSS-TOAST (2005) 新增乳頭狀彈力纖維瘤與黏液瘤並列為高風險來源。'
    },
    en: {
      title: 'Cardiac Tumor (Atrial Myxoma / Papillary Fibroelastoma)',
      def: 'Primary cardiac tumors whose surface thrombus or tumor fragments embolize to cerebral arteries.',
      criteria: 'TOAST High; CCS High; ASCOD C1',
      impact: 'High-risk source across all systems; excludes ESUS.'
    }
  },
  pfo: {
    zh: {
      title: '卵圓孔未閉（Patent Foramen Ovale, PFO）',
      def: '約 25% 正常成人存在之心房中隔通道。僅少數透過矛盾性栓塞（paradoxical embolism）致病，需搭配 RoPE 與 PASCAL 評估。',
      criteria: 'TOAST Medium；CCS Low；ASCOD C1/C2/C3 視條件而定',
      impact: 'ASCOD：合併發病前 DVT/PE = C1；合併 ASA 或大右向左分流 (>20 氣泡) = C2；孤立 PFO = C3。'
    },
    en: {
      title: 'Patent Foramen Ovale (PFO)',
      def: 'Present in ~25% of adults; may cause paradoxical embolism. Requires RoPE and PASCAL evaluation to separate pathogenic vs incidental PFO.',
      criteria: 'TOAST Medium; CCS Low; ASCOD C1 (preceding VTE) / C2 (ASA) / C3 (isolated)',
      impact: 'Triggers dynamic RoPE & PASCAL sub-scoring in this tool.'
    }
  },
  asa_isolated: {
    zh: {
      title: '孤立性心房中隔瘤（ASA，無 PFO）',
      def: '心房中隔向任一心房擺動偏移 ≥10 mm，但氣泡測試未見右向左分流。',
      criteria: 'TOAST Medium；CCS Low；ASCOD C3',
      impact: '無 PFO 時因果關聯較弱，ASCOD 2013 評為 C3。'
    },
    en: {
      title: 'Isolated Atrial Septal Aneurysm (ASA, without PFO)',
      def: 'Atrial septal excursion ≥10 mm from midline without demonstrated right-to-left shunt.',
      criteria: 'TOAST Medium; CCS Low; ASCOD C3',
      impact: 'Graded Possible in TOAST/CCS and C3 in ASCOD when isolated.'
    }
  },
  la_sec: {
    zh: {
      title: '左心房自發性顯影劑濃煙（SEC / Smoke）',
      def: 'TEE 見左心房內如煙霧般緩慢旋轉之回音，代表血流極度停滯與血栓前狀態（無 AF 或 MS）。',
      criteria: 'TOAST Medium；CCS Low；ASCOD C2',
      impact: 'ASCOD 2013 將孤立性心腔內 SEC 列為 C2（因果未確定）。'
    },
    en: {
      title: 'Left Atrial Spontaneous Echo Contrast (Smoke)',
      def: 'Swirling smoke-like echoes in the left atrium on TEE indicating blood stasis without overt AF or mitral stenosis.',
      criteria: 'TOAST Medium; CCS Low; ASCOD C2',
      impact: 'Graded Possible in TOAST/CCS and C2 in ASCOD.'
    }
  },
  mac: {
    zh: {
      title: '二尖瓣環鈣化（Mitral Annular Calcification, MAC）',
      def: '二尖瓣纖維環慢性退化性鈣化，老年族群常見，可伴隨微血栓或鈣化碎屑栓塞。',
      criteria: 'TOAST Medium；CCS Low；ASCOD C3',
      impact: '屬於低風險或附帶發現（CCS Possible / ASCOD C3）。'
    },
    en: {
      title: 'Mitral Annular Calcification (MAC)',
      def: 'Chronic degenerative calcification of the mitral annulus, common in older adults.',
      criteria: 'TOAST Medium; CCS Low; ASCOD C3',
      impact: 'Low/uncertain risk (Possible in TOAST/CCS; C3 in ASCOD).'
    }
  },
  calcific_as: {
    zh: {
      title: '鈣化性主動脈瓣狹窄（Calcific Aortic Stenosis）',
      def: '退化性主動脈瓣鈣化狹窄，偶見鈣化微栓子但初發腦中風風險極低。',
      criteria: 'ASCOD C3；CCS 未列高/低風險主表',
      impact: 'ASCOD 2013 明確列為 C3（不太可能直接致病）。'
    },
    en: {
      title: 'Calcific Aortic Valve Stenosis',
      def: 'Degenerative calcific aortic stenosis; rarely a direct primary embolic source.',
      criteria: 'ASCOD C3',
      impact: 'Graded C3 (unlikely causal, disease present) in ASCOD 2013.'
    }
  },
  mvp: {
    zh: {
      title: '二尖瓣脫垂（Mitral Valve Prolapse, MVP）',
      def: '收縮期二尖瓣葉向後脫垂至左心房；近代大型世代研究已證實單純 MVP 不增加獨立缺血性中風風險。',
      criteria: 'TOAST Medium → SSS-TOAST 2005 正式移除 / ASCOD 未列入',
      impact: 'TOAST 仍列 Possible，但 SSS-TOAST/CCS 與 ASCOD 已不將單純 MVP 視為中風病因。'
    },
    en: {
      title: 'Mitral Valve Prolapse (MVP)',
      def: 'Systolic billowing of mitral leaflets; modern cohorts showed no independent stroke risk.',
      criteria: 'TOAST Medium → Removed in SSS-TOAST 2005',
      impact: 'Included in legacy TOAST (Possible) but excluded from SSS-TOAST/CCS and ASCOD.'
    }
  },
  apical_akinesia_ef35: {
    zh: {
      title: '左心室心尖無收縮併 EF >35%',
      def: '局限性左心室心尖收縮異常，但整體左心室射出分率仍維持 >35%。',
      criteria: 'TOAST Medium；ASCOD C2',
      impact: 'ASCOD 2013 明列為 C2（因果關聯未確定）。'
    },
    en: {
      title: 'LV Apical Akinesia with LVEF >35%',
      def: 'Focal apical akinesia with preserved/mildly reduced global EF (>35%).',
      criteria: 'TOAST Medium; ASCOD C2',
      impact: 'Explicitly graded C2 in ASCOD 2013 Table 2.'
    }
  },
  atrial_cardiopathy: {
    zh: {
      title: '心房心肌病變生物標記（Atrial Cardiopathy）',
      def: '尚未偵測到心房顫動，但具備左心房擴大、心電圖 V1 導程終末 P 波力量 PTFV1 >5000 μV·ms 或 NT-proBNP >250 pg/mL。',
      criteria: 'ARCADIA Trial (Kamel et al., JAMA 2024; PMID 38324415)',
      impact: '不改變傳統 TOAST/CCS/ASCOD 分型；ARCADIA 試驗證明無 AF 時 Apixaban 未優於 Aspirin，重點在於延長心律監測。'
    },
    en: {
      title: 'Atrial Cardiopathy Biomarkers (Without AF)',
      def: 'LA enlargement, ECG PTFV1 >5000 μV·ms, or serum NT-proBNP >250 pg/mL in the absence of documented AF.',
      criteria: 'ARCADIA Trial (Kamel et al., JAMA 2024)',
      impact: 'Does not alter TOAST/CCS/ASCOD; ARCADIA showed apixaban was not superior to aspirin without AF, prompting prolonged rhythm monitoring.'
    }
  },

  // --- All 10 Other Determined Etiologies ---
  cns_vasculitis: {
    zh: {
      title: '中樞神經或全身性血管炎',
      def: '包含原發性中樞神經血管炎（PACNS）、全身性紅斑性狼瘡（SLE）、巨細胞動脈炎（Horton disease）或感染性腦膜炎合併血管炎。',
      criteria: 'TOAST OD；CCS Other；ASCOD O1',
      impact: '需腦脊髓液、發炎指標或血管壁顯影/生檢佐證。'
    },
    en: {
      title: 'CNS / Systemic / Infectious Vasculitis',
      def: 'Primary CNS angiitis, SLE, giant cell (Horton) arteritis, or infectious meningitis-associated vasculitis.',
      criteria: 'TOAST OD; CCS Other; ASCOD O1',
      impact: 'Classified under Other Determined Etiology / ASCOD O1.'
    }
  },
  moyamoya: {
    zh: {
      title: '毛毛樣腦血管病變（Moyamoya Disease/Syndrome）',
      def: '雙側（或單側）遠端內頸動脈及近端大腦前/中動脈進行性狹窄閉塞，伴隨基底核異常代償側枝血管網（「煙霧狀」血管）。',
      criteria: 'TOAST OD；CCS Other；ASCOD O1',
      impact: 'MRA 或 DSA 具典型基底代償網即可確立，歸入其他確定病因 / O1。'
    },
    en: {
      title: 'Moyamoya Disease / Syndrome',
      def: 'Progressive stenosis/occlusion of distal ICAs and proximal ACA/MCA with abnormal basal lenticulostriate collateral ("puff of smoke") networks.',
      criteria: 'TOAST OD; CCS Other; ASCOD O1',
      impact: 'Confirmed by MRA/DSA; classified as Other Determined / O1.'
    }
  },
  rcvs: {
    zh: {
      title: '可逆性腦血管收縮症候群 (RCVS) / 偏頭痛性腦梗塞',
      def: 'RCVS 為雷擊頭痛伴多發性節段性血管痙攣（12 週內可逆）；偏頭痛性梗塞須符合 IHS 典型預兆 >60 分鐘且排除所有他因。',
      criteria: 'Ay 2005 (IHS)；ASCOD O1/O2',
      impact: 'RCVS 或明確誘發血管痙攣屬 OD / O1；單純巧合偏頭痛預兆 >60 分鐘在 ASCOD 列 O2。'
    },
    en: {
      title: 'RCVS / Migrainous Infarction',
      def: 'Reversible cerebral vasoconstriction syndrome (thunderclap headache + reversible multifocal beading) or migrainous infarction meeting strict IHS exclusion criteria.',
      criteria: 'Ay 2005; ASCOD O1/O2',
      impact: 'Classified as OD / Other / O1 (coincidental migraine aura >60m is O2 in ASCOD).'
    }
  },
  genetic_arteriopathy: {
    zh: {
      title: '遺傳性腦小動脈病變（CADASIL / Fabry / MELAS）',
      def: 'NOTCH3 基因突變（CADASIL，典型前顳葉與外囊白質病變）、GLA 突變（Fabry 病）或粒線體腦病變（MELAS）。',
      criteria: 'TOAST OD；CCS Other；ASCOD O1',
      impact: '年輕或家族史顯著之非典型小血管/代謝中風，歸入 OD / O1。'
    },
    en: {
      title: 'Monogenic Arteriopathies (CADASIL / Fabry / MELAS)',
      def: 'NOTCH3-related CADASIL (anterior temporal/external capsule WMH), Fabry disease, or MELAS.',
      criteria: 'TOAST OD; CCS Other; ASCOD O1',
      impact: 'Classified under Other Determined Etiology / ASCOD O1.'
    }
  },
  aps_thrombophilia: {
    zh: {
      title: '抗磷脂抗體症候群 (APS) 或遺傳性高凝血狀態',
      def: '高力價抗心磷脂抗體（>100 GPL）或狼瘡抗凝物（LAC）陽性，或 Protein C/S、AT-III 缺乏等。',
      criteria: 'Ay 2007 p.2983；Amarenco 2013 O1 (>100 GPL) vs O3 (<100 GPL)',
      impact: 'CCS 2007 強調成人輕度凝血異常不可濫判為 Evident，須具年輕、家族史、既往 VTE 或無其他病因背景；低力價 (<100 GPL) 在 ASCOD 為 O3。'
    },
    en: {
      title: 'APS (>100 GPL / LAC+) or Inherited Thrombophilia',
      def: 'Antiphospholipid syndrome (>100 GPL units or lupus anticoagulant) or severe inherited thrombophilia.',
      criteria: 'Ay 2007 p.2983; Amarenco 2013 O1 vs O3',
      impact: 'CCS 2007 restricts Evident assignment to young patients, family history, prior unexplained TE, or absence of other causes.'
    }
  },
  hematologic: {
    zh: {
      title: '血液疾病（PV、血小板 >80 萬、鐮刀型貧血、DIC）',
      def: '真性紅血球增多症、原發性血小板增多症（>800,000/mm³）、鐮刀型血球貧血或瀰漫性血管內凝血（DIC）。',
      criteria: 'Amarenco 2013 Table 2 (O1 vs O3 <800k)',
      impact: '達閾值者歸入 OD / O1；血小板 <800,000/mm³ 在 ASCOD 為 O3。'
    },
    en: {
      title: 'Hematologic Disorders (PV, Platelets >800k, Sickle Cell, DIC)',
      def: 'Polycythemia vera, thrombocythemia >800,000/mm³, sickle cell disease, or disseminated intravascular coagulation.',
      criteria: 'Amarenco 2013 Table 2 (O1)',
      impact: 'Qualifies as Other Determined / ASCOD O1 (platelets <800,000/mm³ is O3).'
    }
  },
  cancer_cris: {
    zh: {
      title: '癌症相關高凝血 / CRIS（Active Cancer Thrombosis）',
      def: '活動性癌症（特別是轉移期腺癌）引起之腫瘤栓塞或靜脈/動脈高凝血狀態。',
      criteria: 'ASCOD 2013 O3 vs AHA 2026 CRIS',
      impact: '2013 ASCOD 將惡性腫瘤高凝血暫列 O3；本工具依 2026 AHA CRIS 共識同步給予 Probable/Possible CRIS 警示。'
    },
    en: {
      title: 'Cancer-Associated Thrombosis / CRIS',
      def: 'Hypercoagulable state or tumor embolism driven by active malignancy.',
      criteria: 'ASCOD 2013 O3 vs AHA 2026 CRIS',
      impact: 'Graded O3 in legacy 2013 ASCOD, but flagged under AHA 2026 CRIS in Modern Extensions.'
    }
  },
  iatrogenic_procedure: {
    zh: {
      title: '醫源性圍手術期中風（<14 天）',
      def: '心臟手術、頸動脈內膜切除術、支架置放或血管內導管介入後 14 天內發生之缺血性中風。',
      criteria: 'Ay et al., Ann Neurol 2005 p.693 (14-day window)',
      impact: '在 MGH CCS 競爭病因決策樹中具明確 14 天時間關聯性，可勝出為 Probable Other。'
    },
    en: {
      title: 'Peri-Procedural / Iatrogenic Stroke (<14 Days)',
      def: 'Ischemic stroke occurring within 14 days after cardiac surgery, CEA, stenting, or endovascular intervention.',
      criteria: 'Ay et al., Ann Neurol 2005 p.693',
      impact: 'Establishes clear temporal relation (Probable Other) in MGH CCS.'
    }
  },
  drug_induced: {
    zh: {
      title: '藥物誘發腦中風（<48 小時）',
      def: '使用已知致血管收縮或血栓藥物（如古柯鹼、安非他命、擬交感神經藥）48 小時內發病或毒物篩檢陽性，且排除他因。',
      criteria: 'Ay et al., Ann Neurol 2005 p.692 (48-hour window)',
      impact: '歸入 OD / Other；須排除高血壓急症或心律不整等競爭機制。'
    },
    en: {
      title: 'Drug-Induced Ischemic Stroke (<48 Hours)',
      def: 'Stroke onset within 48 hours of exposure to vasoactive/prothrombotic illicit or prescription drugs (or positive toxicology), excluding other causes.',
      criteria: 'Ay et al., Ann Neurol 2005 p.692',
      impact: 'Classified as OD / Other Determined.'
    }
  },
  dolichoectasia_aneurysm: {
    zh: {
      title: '腦動脈延長擴張症併複雜動脈瘤 / 破裂動脈瘤痙攣',
      def: '基底動脈或內頸動脈嚴重延長擴張併瘤內血栓，或蜘蛛膜下腔出血後血管痙攣引起之繼發性腦梗塞。',
      criteria: 'Amarenco 2013 Table 2 (O1)',
      impact: 'ASCOD 列為 O1；單純無血栓之動脈迂曲擴張僅列 D3。'
    },
    en: {
      title: 'Complicated Dolichoectasia / Ruptured Aneurysm Vasospasm',
      def: 'Dolichoectasia with complicated/thrombosed aneurysm, or ruptured intracranial aneurysm with secondary vasospasm.',
      criteria: 'Amarenco 2013 Table 2 (O1)',
      impact: 'Graded O1 in ASCOD (uncomplicated dolichoectasia is D3).'
    }
  }
};
