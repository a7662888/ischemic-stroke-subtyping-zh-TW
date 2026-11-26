# Evidence Registry — Ischemic Stroke Etiologic Classification (`EVIDENCE_REGISTRY.md`)

- **Verification date:** `2026-11-27` (Asia/Taipei)
- **Databases queried:** PubMed E-utilities (`esearch` / `esummary`), PMC JATS (`efetch`), Unpaywall API, and `fulltext-retrieval` (`fetch_fulltext.py`)
- **PDF verification:** `node D:/secondbrain/Skills/_tools/pdf-triage/pdf_triage.js D:/secondbrain/Zotero/ft_cache/stroke_classification --fast` → **15/15 PDFs verified `TextBased` (confidence 1.00, 0 failures)**.

---

## 1. Search Record & Retrieval Tier Log

| Key | First Author (Year) | Journal | PMID | PMCID | DOI | Retrieval Tier Achieved |
|---|---|---|---|---|---|---|
| `TOAST_1993` | Adams HP Jr (1993) | *Stroke* 24(1):35–41 | `7678184` | — | `10.1161/01.str.24.1.35` | **PDF** (Tier 3.5, 8 pp., TextBased) |
| `SSS_TOAST_2005` | Ay H (2005) | *Ann Neurol* 58(5):688–697 | `16240340` | — | `10.1002/ana.20617` | **PDF** (Tier 3.5, 10 pp., TextBased) |
| `CCS_2007` | Ay H (2007) | *Stroke* 38(11):2979–2984 | `17901381` | — | `10.1161/STROKEAHA.107.490896` | **PDF** (Tier 3.5, 7 pp., TextBased) |
| `CCS_2010` | Arsava EM (2010) | *Neurology* 75(14):1277–1284 | `20921513` | `PMC3013495` | `10.1212/WNL.0b013e3181f612ce` | **PDF** (11 pp., TextBased) |
| `ASCO_2009` | Amarenco P (2009) | *Cerebrovasc Dis* 27(5):502–508 | `19342826` | — | `10.1159/000210433` | **Abstract** (exact deltas vs 2013 verified in `Amarenco_2013` full text pp. 1, 4) |
| `ASCOD_2013` | Amarenco P (2013) | *Cerebrovasc Dis* 36(1):1–5 | `23899749` | — | `10.1159/000352050` | **PDF** (Tier 3.5, 5 pp., TextBased) |
| `ESUS_2014` | Hart RG (2014) | *Lancet Neurol* 13(4):429–438 | `24646875` | — | `10.1016/S1474-4422(13)70310-7` | **Metadata** (ESUS Table 1 criteria verified verbatim in `Hart_2017` p. 2) |
| `ESUS_2017` | Hart RG (2017) | *Stroke* 48(4):867–872 | `28265016` | — | `10.1161/STROKEAHA.116.016414` | **PDF** (7 pp., TextBased) |
| `ESUS_2022` | Diener HC (2022) | *Nat Rev Neurol* 18(8):455–465 | `35538232` | — | `10.1038/s41582-022-00663-4` | **PDF** (11 pp., TextBased) |
| `RoPE_2013` | Kent DM (2013) | *Neurology* 81(7):619–625 | `23864310` | `PMC3775694` | `10.1212/WNL.0b013e3182a08d59` | **PDF** (7 pp., TextBased) |
| `PFO_2020` | Elgendy AY (2020) | *JAMA Neurol* 77(7):884–892 | `32282016` | — | `10.1001/jamaneurol.2020.0458` | **PDF** (9 pp., TextBased) |
| `PASCAL_2021` | Kent DM (2021) | *JAMA* 326(22):2277–2286 | `34905030` | `PMC8672231` | `10.1001/jama.2021.20956` | **PDF** (50 pp., TextBased) |
| `AHA_2021` | Kleindorfer DO (2021) | *Stroke* 52(7):e364–e467 | `34024117` | — | `10.1161/STR.0000000000000375` | **PDF** (104 pp., TextBased) |
| `SyNC_2020` | Goyal M (2020) | *Stroke* 51(4):1328–1335 | `32138632` | — | `10.1161/STROKEAHA.119.028853` | **PDF** (5 pp., TextBased) |
| `CarotidWeb_2021` | Mac Grory B (2021) | *PLoS One* 16(9):e0257697 | `34534252` | `PMC8448368` | `10.1371/journal.pone.0257697` | **PDF** (8 pp., TextBased) |
| `ARCADIA_2024` | Kamel H (2024) | *JAMA* 331(7):573–581 | `38324415` | `PMC10851142` | `10.1001/jama.2023.27188` | **Full Text XML** (PMC) |
| `AHA_Cancer_2026` | Navi BB (2026) | *Stroke* 2026 Apr (Scientific Statement) | `41623113` | — | `10.1161/STR.0000000000000517` | **Abstract** (CRIS probable/possible criteria verified in `Gon_2026` p. 2) |
| `Gon_Cancer_2026` | Gon Y (2026) | *Stroke* 2026 Sep | `42233187` | `PMC13506191` | `10.1161/STROKEAHA.126.055707` | **PDF** (7 pp., TextBased) |
| `ASCOD_TOAST_2025` | Mohammed M (2025) | *Front Stroke* 2025 | `41541880` | `PMC12802723` | `10.3389/fstro.2025.1598711` | **PDF** (12 pp., TextBased) |
| `Lavallee_2023` | Lavallée PC (2023) | *JAMA Neurol* 80(11):1199–1208 | `37782494` | `PMC10546292` | `10.1001/jamaneurol.2023.3344` | **Full Text XML** (PMC) |

---

## 2. Verbatim Verified Parameters & Decision Rules

### A. TOAST (Adams et al., 1993; PMID `7678184`, pp. 36–37, Tables 1–3)
- **5 Major Subtypes:**
  1. Large-artery atherosclerosis (`>50%` stenosis or occlusion of major brain artery or branch cortical artery; cortical/cerebellar dysfunction or brainstem/subcortical infarct `>1.5 cm`; cardiac embolism excluded)
  2. Cardioembolism (High-risk source → **Probable**; Medium-risk source only without other cause → **Possible**; LAA excluded)
  3. Small-vessel occlusion (lacune): traditional lacunar syndrome, NO cerebral cortical dysfunction, normal CT/MRI or relevant brainstem/subcortical lesion `<1.5 cm`, no cardiac source, no `>50%` ipsilateral large-artery stenosis
  4. Stroke of other determined etiology (rare causes: nonatherosclerotic vasculopathies, hypercoagulable states, hematologic disorders; cardiac and LAA excluded)
  5. Stroke of undetermined etiology:
     - `a. Two or more causes identified` (including medium-risk cardiac source + another possible cause, OR AF + `>50%` stenosis, OR lacunar syndrome + `>50%` ipsilateral stenosis)
     - `b. Negative evaluation` (extensive evaluation negative)
     - `c. Incomplete evaluation` (cursory/incomplete evaluation)
- **Table 3 Cardiac Sources (Adams 1993, p. 37):**
  - *High-risk:* Mechanical prosthetic valve, Mitral stenosis with AF, AF (other than lone AF), Left atrial/appendage thrombus, Sick sinus syndrome, Recent MI (`<4 weeks`), Left ventricular thrombus, Dilated cardiomyopathy, Akinetic LV segment, Atrial myxoma, Infective endocarditis.
  - *Medium-risk:* Mitral valve prolapse, Mitral annulus calcification, Mitral stenosis without AF, Left atrial turbulence (smoke), Atrial septal aneurysm, Patent foramen ovale, Atrial flutter, Lone AF, Bioprosthetic cardiac valve, Nonbacterial thrombotic endocarditis, Congestive heart failure, Hypokinetic LV segment, MI (`>4 weeks, <6 months`).

### B. SSS-TOAST (Ay et al., 2005; PMID `16240340`, Tables 1–2, Fig. 1) & MGH CCS (Ay et al., 2007; PMID `17901381`, Table 1, pp. 2981–2984)
- **Key Updates from SSS-TOAST 2005 → CCS 2007:**
  - **LAA Evident (CCS 2007 Table 1):** (1) Occlusive or stenotic (`≥50%` diameter reduction OR `<50%` diameter reduction **with plaque ulceration or thrombosis**) vascular disease judged due to atherosclerosis in clinically relevant extra- or intracranial arteries; AND (2) Absence of acute infarction in vascular territories other than the stenotic/occluded artery.
  - **LAA Probable:** (1) History of `≥1` TMB, TIA, or stroke from territory of index artery within the last month; OR (2) Near-occlusive stenosis or nonchronic complete occlusion (except vertebral arteries); OR (3) Ipsilateral unilateral internal watershed infarctions or multiple, temporally separate infarctions exclusively within territory of affected artery.
  - **LAA Possible:** (1) Protruding plaque causing mild stenosis (`<50%`) **without** ulceration/thrombosis + `≥2` TMB/TIA/stroke from index territory (at least 1 within last month); OR (2) Evident LAA criteria met in absence of complete diagnostic investigation for other mechanisms.
  - **Cardio-aortic Embolism High-Risk (`>2%` annual or one-time primary risk, Ay 2005 Table 2):** Left atrial thrombus, Left ventricular thrombus, AF, Paroxysmal AF, Sick sinus syndrome, **Sustained atrial flutter** (promoted), Recent MI (`<1 month`), Rheumatic mitral/aortic valve disease, **Bioprosthetic** and mechanical heart valves (promoted), Chronic MI with `EF <28%`, Symptomatic CHF with `EF <30%`, Dilated cardiomyopathy, **Nonbacterial thrombotic endocarditis** (promoted), Infective endocarditis, **Papillary fibroelastoma** (added), Left atrial myxoma. *(Note: Mitral valve prolapse and isolated wall motion abnormalities removed; all low-risk cardiac/aortic sources become high-risk if classifying a recurrent stroke associated with that cause.)*
  - **Cardio-aortic Low/Uncertain-Risk (`≤2%`, Ay 2005 Table 2):** Mitral annular calcification, PFO, Atrial septal aneurysm, PFO+ASA, LV aneurysm without thrombus, Isolated LA smoke, Complex atheroma in ascending aorta or proximal arch. *(Note: In CCS 2007/ASCOD 2013, complex aortic arch atheroma ≥4 mm or mobile thrombus is tracked explicitly.)*
  - **Cardio-aortic Probable:** (1) Evidence of systemic embolism; OR (2) Multiple acute infarctions closely related in time within both right & left anterior OR both anterior & posterior circulations, without occlusion/near-occlusion of all relevant vessels and without vasculitis/vasculopathy/hemostatic/hemodynamic causes.
  - **Small-Artery Occlusion Evident:** Single clinically relevant acute infarction **`<20 mm`** in greatest diameter within territory of basal or brainstem penetrating arteries, **in absence of parent artery pathology** at origin of penetrating artery.
  - **Small-Artery Occlusion Probable:** Stereotypic lacunar TIAs within past week; (CCS 2007 adds) Classical lacunar syndrome.
  - **Small-Artery Occlusion Possible:** Classical lacunar syndrome in absence of imaging sensitive enough to detect small infarctions; OR Evident SAO in absence of complete diagnostic investigation.
  - **Other Causes:** Evident (specific disease involving clinically appropriate brain arteries); Probable (clear and close temporal relation: arterial dissection/AMI `<30 days`, cardiac/arterial surgery or endovascular intervention `<14 days`, drug-related `<48 hours`; prothrombotic abnormalities only if young, ≥1 prior unexplained VTE/TE, family history, or no other cause); Possible (evident other cause with incomplete investigation).
  - **Decision Algorithm (Ay 2005 Fig.):**
    - 1 Evident → **Evident**
    - `≥2` Evident → test **Probable** criteria among those Evident mechanisms: if exactly 1 Probable → **Probable**; if 0 or `≥2` Probable → **Undetermined–Unclassified**
    - 0 Evident → test **Possible** criteria: if 1 Possible → **Possible**; if `≥2` Possible → **Undetermined–Unclassified**; if 0 Possible → **Undetermined–Incomplete Evaluation** (if essential tests missing), **Cryptogenic Embolism** (abrupt cutoff in normal artery / complete recanalization / multi-territory acute infarcts without vessel disease), or **Other Cryptogenic**.
  - **5 / 8 / 16-Subtype Hierarchy:** 5-item (LAA, CE, SAO, Other, Undetermined); 8-item (splits Undetermined into Cryptogenic Embolism, Other Cryptogenic, Incomplete Evaluation, Unclassified); 16-item (stratifies the 4 determined subtypes by Evident/Probable/Possible + the 4 Undetermined sub-buckets).

### C. ASCOD Phenotyping (Amarenco et al., 2013; PMID `23899749`, pp. 1–5, Tables 1–2) & ASCO (2009; PMID `19342826`)
- **Grades:** `1` potentially causal; `2` causal link uncertain; `3` causal link unlikely but disease present; `0` disease absent; `9` incomplete workup.
- **A (Atherothrombosis):**
  - `A1`: Ipsilateral stenosis `50–99%` (N.B.: downgraded to `A3` if bihemispheric MR-DWI lesion!); OR ipsilateral `<50%` with endoluminal thrombus; OR mobile thrombus in aortic arch; OR ipsilateral occlusion with underlying atherosclerotic plaque.
  - `A2`: Ipsilateral stenosis `30–50%` (`30–49%`); OR aortic plaque `≥4 mm` without mobile lesion.
  - `A3`: Plaque `<30%` ipsilateral; OR aortic plaque `<4 mm` without mobile thrombus; OR stenosis/occlusion in non-supplying artery; OR history of MI/coronary revascularization/PAD; OR `50–99%` stenosis with bihemispheric MR-DWI lesion.
  - `A0`: Negative extra- and intracranial arterial imaging (minimum). `A9`: Extra- or intracranial imaging not performed.
- **S (Small-Vessel Disease):**
  - `S1`: Small deep infarct **`<15 mm`** on MRI-DWI (or CT) corresponding to symptoms **PLUS ≥1 of**: older lacunar infarct(s) in other territories, severe (Fazekas III) leukoaraiosis / microbleeds / severe PVS dilatation (*état criblé*), OR repeated recent (`<1 month`) TIAs in same territory.
  - `S2`: **Only one** recent lacunar infarction (`<15 mm`) and **no other SVD abnormality** on MRI/CT; OR clinical lacunar syndrome without visible lesion on MRI/CT.
  - `S3`: Severe leukoaraiosis, microbleeds, severe PVS dilatation, or old lacunes (when index stroke is non-lacunar).
  - `S0`: Negative MRI and no clinical lacunar syndrome. `S9`: MRI (or CT) not performed.
- **C (Cardiac Pathology):**
  - `C1`: High-risk source (Mitral stenosis `<1.5 cm²`, mechanical valve, MI `<4 weeks`, mural thrombus in left cavities, LV aneurysm, documented AF `>60 s` or flutter, tachycardia-bradycardia syndrome, dilated/hypertrophic cardiomyopathy, `LVEF <35%`, endocarditis, intracardiac mass, **PFO + thrombus in situ**, **PFO + concomitant PE or proximal DVT PRECEDING index stroke**).
  - `C2`: **PFO + ASA**; **PFO + concomitant PE/DVT NOT preceding stroke**; intracardiac spontaneous echo-contrast; apical LV akinesia with `EF >35%`; history of MI/palpitation + bilateral/two-territory infarcts; no direct cardiac source + bilateral/two-territory infarcts and/or systemic emboli.
  - `C3`: Isolated PFO, isolated ASA, strands, MAC, calcific aortic valve, nonapical LV akinesia, **transient AF `<60 s`**, atrial hyperexcitability.
  - `C0`: Minimum negative ECG + cardiology exam (maximum includes Holter/loop + TEE/TTE). `C9`: Missing minimum ECG/cardiology exam or cardiac imaging when indicated.
- **O (Other Causes):** `O1` (dolichoectasia with complicated aneurysm, PV/thrombocythemia `>800,000/mm³`, SLE, DIC, APS `>100 GPL` or lupus anticoagulant, Fabry, meningitis, sickle cell, ruptured aneurysm, severe hyperhomocysteinemia, Horton's disease, CNS angiitis, Moyamoya, etc.); `O2` (saccular aneurysm with suspected embolism, coincidental migraine aura `>60 min`); `O3` (AVM, thrombocytosis `<800,000`, APS `<100 GPL`, homocysteine `<40 μmol/L`, **malignoma with hypercoagulation/DVT/PE/chemo**); `O0`/`O9`.
- **D (Dissection, added in 2013):** `D1` (direct mural hematoma or indirect long tapered stenosis/recanalization in supplying artery); `D2` (suggestive history e.g. painful Horner's or FMD in supplying artery); `D3` (kinking/dolichoectasia without aneurysm, FMD in non-supplying artery); `D0`; `D9` (**age `<60 y`** with no `A1/A2/S1/C1/O1` and no fat-sat MRI or XRA within 15 days).
- **ASCO (2009) → ASCOD (2013) Deltas (`Amarenco 2013` pp. 1, 4):** Added `D` (dissection previously under `O`), lowered LAA stenosis threshold from `70%` to `50%`, removed separate diagnostic evidence letters `A/B/C` (folded into `0`/`9`), added cardiogenic neuroimaging pattern to `C`.

### D. Modern Extensions (2013–2026)
- **ESUS (`Hart 2014` / `Hart 2017` Table 1 / `Diener 2022`):** Non-lacunar infarct (`>1.5 cm` CT or `>2.0 cm` DWI, or cortical/cerebellar), `<50%` stenosis in supplying extra/intracranial artery, no major-risk cardioembolic source, no other specific cause; requires brain CT/MRI, extra+intracranial vessel imaging, 12-lead ECG, TTE, and `>24 h` cardiac rhythm monitoring.
- **RoPE (`Kent 2013` Tables 4–5) & PASCAL (`Kent 2021` Table 1):**
  - RoPE (0–10 pts): No HTN (+1), No DM (+1), No prior stroke/TIA (+1), Nonsmoker (+1), Cortical infarct (+1), Age 18–29 (+5), 30–39 (+4), 40–49 (+3), 50–59 (+2), 60–69 (+1), `≥70` (0). Attributable fraction (25% control rate): 0–3 (0%), 4 (38%), 5 (34%), 6 (62%), 7 (72%), 8 (84%), 9–10 (88%).
  - PASCAL: High RoPE (`≥7`) + High-risk PFO (Large shunt `>20 bubbles` and/or ASA `≥10 mm`) → **Probable** (RCT HR 0.10, 95% CI 0.03–0.35); either one present → **Possible** (HR 0.38, 95% CI 0.22–0.65); neither present → **Unlikely** (HR 1.14, 95% CI 0.53–2.46).
- **SyNC (`Goyal 2020` Table 3):** Ipsilateral `<50%` nonstenotic carotid plaque with high-risk features (ulceration, thickness `>3 mm`, intraplaque hemorrhage, fibrous cap rupture, lipid-rich core, echolucency) + ipsilateral ICA-territory DWI infarct without other vascular territories.
- **Carotid Web (`Mac Grory 2021`):** Focal shelf-like posterior carotid bulb intimal FMD membrane; high recurrence risk in young/cryptogenic stroke.
- **AHA Cancer-Related Ischemic Stroke (`Navi 2026` / `Gon 2026` p. 2):** Probable CRIS (active cancer + NBTE or DIC); Possible CRIS (metastatic/progressive active cancer + cryptogenic stroke + markedly elevated D-dimer or multifocal multi-territory infarcts).
- **Atrial Cardiopathy (`ARCADIA 2024`):** Note that empiric apixaban did NOT reduce recurrent stroke vs aspirin in cryptogenic stroke with atrial cardiopathy without documented AF (HR/primary neutral; documented AF remains required for anticoagulation).
