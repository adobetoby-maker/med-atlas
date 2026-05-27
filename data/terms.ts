export interface MedTerm {
  id: string
  term: string
  category: string
  definition: string
  etymology: string
  example: string
  module: number
}

export const CATEGORIES: Record<string, { color: string; model: string; emoji: string }> = {
  'Cardiovascular': { color: '#e05c5c', model: 'heart', emoji: '🫀' },
  'Respiratory': { color: '#6ab8e8', model: 'lungs', emoji: '🫁' },
  'Neurology': { color: '#a78bfa', model: 'brain', emoji: '🧠' },
  'Musculoskeletal': { color: '#e8a84c', model: 'bone', emoji: '🦴' },
  'Gastrointestinal': { color: '#6ee7a0', model: 'colon', emoji: '🫃' },
  'Renal/Urinary': { color: '#60a5fa', model: 'kidney', emoji: '🫘' },
  'Integumentary': { color: '#fca5a5', model: 'skin', emoji: '🩹' },
  'Endocrine': { color: '#f9c74f', model: 'butterfly', emoji: '🦋' },
  'Hematology': { color: '#ef4444', model: 'cell', emoji: '🔴' },
  'Immunology': { color: '#34d399', model: 'shield', emoji: '🛡️' },
  'Pharmacology': { color: '#a3e635', model: 'pill', emoji: '💊' },
  'Medical Abbreviations': { color: '#94a3b8', model: 'atom', emoji: '⚛️' },
  'Prefixes': { color: '#c084fc', model: 'atom', emoji: '🔤' },
  'Suffixes': { color: '#fb923c', model: 'atom', emoji: '🔡' },
  'Combining Forms': { color: '#38bdf8', model: 'atom', emoji: '🔗' },
  'Oncology': { color: '#f472b6', model: 'cell', emoji: '🎗️' },
  'Pathology': { color: '#f87171', model: 'atom', emoji: '🔬' },
  'Radiology': { color: '#67e8f9', model: 'atom', emoji: '☢️' },
  'Surgery': { color: '#4ade80', model: 'atom', emoji: '⚕️' },
  'Laboratory': { color: '#facc15', model: 'atom', emoji: '🧪' },
  'General Terminology': { color: '#a8a29e', model: 'atom', emoji: '📚' },
}

export const TERMS: MedTerm[] = [
  // Cardiovascular
  { id: 'cv01', term: 'Myocardial Infarction', category: 'Cardiovascular', module: 1, definition: 'Death of heart muscle tissue due to prolonged lack of blood supply; commonly called a heart attack', etymology: 'myo (muscle) + cardio (heart) + infarction (tissue death from ischemia)', example: 'The patient presented with classic myocardial infarction symptoms: chest pain radiating to the left arm.' },
  { id: 'cv02', term: 'Arrhythmia', category: 'Cardiovascular', module: 1, definition: 'Irregular heartbeat; any deviation from the normal heart rhythm', etymology: 'a (without) + rhythmos (rhythm)', example: 'The ECG showed ventricular arrhythmia requiring immediate intervention.' },
  { id: 'cv03', term: 'Bradycardia', category: 'Cardiovascular', module: 1, definition: 'Abnormally slow heart rate, typically below 60 beats per minute', etymology: 'brady (slow) + kardia (heart)', example: 'Athletes often have bradycardia with resting rates of 40-50 bpm.' },
  { id: 'cv04', term: 'Tachycardia', category: 'Cardiovascular', module: 1, definition: 'Abnormally rapid heart rate, typically above 100 beats per minute', etymology: 'tachy (fast) + kardia (heart)', example: 'Anxiety and fever can both cause sinus tachycardia.' },
  { id: 'cv05', term: 'Atherosclerosis', category: 'Cardiovascular', module: 1, definition: 'Buildup of plaque (fatty deposits) inside arterial walls, narrowing the arteries', etymology: 'athero (gruel/porridge) + sclerosis (hardening)', example: 'Long-term atherosclerosis in the coronary arteries led to his bypass surgery.' },
  { id: 'cv06', term: 'Hypertension', category: 'Cardiovascular', module: 1, definition: 'Persistently elevated blood pressure above 130/80 mmHg; called the "silent killer"', etymology: 'hyper (above) + tensio (tension/pressure)', example: 'Uncontrolled hypertension significantly increases stroke risk.' },
  { id: 'cv07', term: 'Endocarditis', category: 'Cardiovascular', module: 1, definition: 'Inflammation of the inner lining of the heart chambers and valves', etymology: 'endo (within) + cardio (heart) + itis (inflammation)', example: 'IV drug users have increased risk of bacterial endocarditis.' },
  { id: 'cv08', term: 'Pericarditis', category: 'Cardiovascular', module: 1, definition: 'Inflammation of the pericardium, the protective sac surrounding the heart', etymology: 'peri (around) + cardio (heart) + itis (inflammation)', example: 'Viral pericarditis often presents with sharp chest pain worsened by lying flat.' },

  // Respiratory
  { id: 'rsp01', term: 'Pneumonia', category: 'Respiratory', module: 2, definition: 'Infection causing inflammation of the air sacs (alveoli) in one or both lungs', etymology: 'pneumon (lung) + ia (condition)', example: 'Streptococcus pneumoniae is the most common bacterial cause of pneumonia.' },
  { id: 'rsp02', term: 'Bronchitis', category: 'Respiratory', module: 2, definition: 'Inflammation of the bronchial tubes that carry air to the lungs', etymology: 'broncho (windpipe/bronchus) + itis (inflammation)', example: 'Chronic bronchitis is defined as a productive cough lasting at least 3 months per year.' },
  { id: 'rsp03', term: 'Atelectasis', category: 'Respiratory', module: 2, definition: 'Collapse or incomplete expansion of a lung or lung lobe', etymology: 'ateles (incomplete) + ektasis (expansion)', example: 'Post-operative atelectasis is common after abdominal surgery.' },
  { id: 'rsp04', term: 'Emphysema', category: 'Respiratory', module: 2, definition: 'Chronic lung disease causing damage and enlargement of the air sacs, reducing oxygen transfer', etymology: 'emphysema (inflation) from Greek emphysân', example: 'Long-term smoking is the primary cause of pulmonary emphysema.' },
  { id: 'rsp05', term: 'Dyspnea', category: 'Respiratory', module: 2, definition: 'Shortness of breath; difficult or labored breathing', etymology: 'dys (difficult) + pnea (breathing)', example: 'The patient reported dyspnea on exertion when climbing stairs.' },
  { id: 'rsp06', term: 'Hemoptysis', category: 'Respiratory', module: 2, definition: 'Coughing up blood or blood-stained mucus from the respiratory tract', etymology: 'hemo (blood) + ptysis (spitting)', example: 'Hemoptysis can be a sign of tuberculosis or lung cancer.' },
  { id: 'rsp07', term: 'Pleural Effusion', category: 'Respiratory', module: 2, definition: 'Abnormal accumulation of fluid in the pleural space around the lungs', etymology: 'pleura (rib/side) + effusion (pouring out)', example: 'Congestive heart failure commonly causes bilateral pleural effusions.' },

  // Neurology
  { id: 'neu01', term: 'Aphasia', category: 'Neurology', module: 3, definition: 'Loss of ability to understand or express speech due to brain damage', etymology: 'a (without) + phasis (speech)', example: 'Broca\'s aphasia causes difficulty producing speech while comprehension remains intact.' },
  { id: 'neu02', term: 'Hemiplegia', category: 'Neurology', module: 3, definition: 'Paralysis of one side of the body, usually caused by brain injury or stroke', etymology: 'hemi (half) + plegia (paralysis)', example: 'The stroke caused left-sided hemiplegia requiring intensive rehabilitation.' },
  { id: 'neu03', term: 'Encephalitis', category: 'Neurology', module: 3, definition: 'Inflammation of the brain tissue, often caused by viral infection', etymology: 'encephalo (brain) + itis (inflammation)', example: 'Herpes simplex virus is a common cause of viral encephalitis.' },
  { id: 'neu04', term: 'Paresthesia', category: 'Neurology', module: 3, definition: 'Abnormal sensation such as tingling, numbness, or "pins and needles"', etymology: 'para (abnormal) + aisthesis (sensation)', example: 'Carpal tunnel syndrome causes paresthesia in the thumb and first two fingers.' },
  { id: 'neu05', term: 'Meningitis', category: 'Neurology', module: 3, definition: 'Inflammation of the membranes (meninges) surrounding the brain and spinal cord', etymology: 'meninx (membrane) + itis (inflammation)', example: 'Bacterial meningitis presents with severe headache, fever, and neck stiffness.' },
  { id: 'neu06', term: 'Neuropathy', category: 'Neurology', module: 3, definition: 'Disease or dysfunction of one or more peripheral nerves causing weakness or numbness', etymology: 'neuro (nerve) + pathy (disease)', example: 'Diabetic peripheral neuropathy affects the feet and lower legs first.' },

  // Musculoskeletal
  { id: 'msk01', term: 'Arthritis', category: 'Musculoskeletal', module: 4, definition: 'Inflammation of one or more joints causing pain, swelling, and reduced range of motion', etymology: 'arthro (joint) + itis (inflammation)', example: 'Rheumatoid arthritis is an autoimmune form that attacks the joint lining.' },
  { id: 'msk02', term: 'Osteomyelitis', category: 'Musculoskeletal', module: 4, definition: 'Infection of bone, which may spread from nearby tissue or via the bloodstream', etymology: 'osteo (bone) + myelo (marrow) + itis (inflammation)', example: 'Diabetic foot ulcers can lead to osteomyelitis of the metatarsal bones.' },
  { id: 'msk03', term: 'Tendinitis', category: 'Musculoskeletal', module: 4, definition: 'Inflammation of a tendon, usually due to overuse or repetitive motion injury', etymology: 'tendo (tendon) + itis (inflammation)', example: 'Rotator cuff tendinitis is common in overhead athletes like swimmers.' },
  { id: 'msk04', term: 'Kyphosis', category: 'Musculoskeletal', module: 4, definition: 'Excessive outward curvature of the thoracic spine causing a "hunchback" appearance', etymology: 'kyphos (bent/humped) + osis (condition)', example: 'Osteoporotic compression fractures often cause kyphosis in elderly women.' },
  { id: 'msk05', term: 'Myalgia', category: 'Musculoskeletal', module: 4, definition: 'Muscle pain or tenderness, often a symptom of flu, overexertion, or fibromyalgia', etymology: 'myo (muscle) + algia (pain)', example: 'Statin medications can cause severe myalgia as a side effect.' },
  { id: 'msk06', term: 'Osteoporosis', category: 'Musculoskeletal', module: 4, definition: 'Condition in which bones become weak and brittle due to loss of bone density', etymology: 'osteo (bone) + poros (pore) + osis (condition)', example: 'Postmenopausal women are at highest risk for osteoporosis.' },

  // Gastrointestinal
  { id: 'gi01', term: 'Hepatitis', category: 'Gastrointestinal', module: 5, definition: 'Inflammation of the liver, most commonly caused by viral infection or alcohol abuse', etymology: 'hepato (liver) + itis (inflammation)', example: 'Hepatitis C is often asymptomatic for decades before causing liver damage.' },
  { id: 'gi02', term: 'Cholecystitis', category: 'Gastrointestinal', module: 5, definition: 'Inflammation of the gallbladder, usually caused by gallstones blocking bile flow', etymology: 'chole (bile) + cystis (bladder) + itis (inflammation)', example: 'Acute cholecystitis typically requires laparoscopic cholecystectomy.' },
  { id: 'gi03', term: 'Diverticulitis', category: 'Gastrointestinal', module: 5, definition: 'Inflammation or infection of small pouches (diverticula) in the digestive tract wall', etymology: 'diverticulum (a wayside inn, by-road) + itis (inflammation)', example: 'Low-fiber diet is a risk factor for developing diverticulitis.' },
  { id: 'gi04', term: 'Ileus', category: 'Gastrointestinal', module: 5, definition: 'Disruption of the normal propulsive activity of the intestine; bowel obstruction', etymology: 'eilein (to roll up) in Greek', example: 'Post-surgical ileus is common after abdominal procedures.' },
  { id: 'gi05', term: 'Gastroparesis', category: 'Gastrointestinal', module: 5, definition: 'Condition where the stomach empties too slowly due to nerve damage', etymology: 'gastro (stomach) + paresis (partial paralysis)', example: 'Uncontrolled diabetes is the most common cause of gastroparesis.' },

  // Renal/Urinary
  { id: 'ren01', term: 'Glomerulonephritis', category: 'Renal/Urinary', module: 6, definition: 'Inflammation of the glomeruli, the tiny filters in the kidneys', etymology: 'glomus (ball of yarn) + nephros (kidney) + itis (inflammation)', example: 'Post-streptococcal glomerulonephritis can follow strep throat.' },
  { id: 'ren02', term: 'Pyelonephritis', category: 'Renal/Urinary', module: 6, definition: 'Bacterial infection of the kidney, usually spreading from a urinary tract infection', etymology: 'pyelo (pelvis/trough) + nephros (kidney) + itis (inflammation)', example: 'Untreated UTI can ascend to cause pyelonephritis with fever and flank pain.' },
  { id: 'ren03', term: 'Urolithiasis', category: 'Renal/Urinary', module: 6, definition: 'Formation of stones (calculi) in the urinary tract', etymology: 'uro (urine) + lithos (stone) + iasis (condition)', example: 'Calcium oxalate urolithiasis is the most common type of kidney stone.' },
  { id: 'ren04', term: 'Hematuria', category: 'Renal/Urinary', module: 6, definition: 'Presence of blood in the urine, either visible (gross) or microscopic', etymology: 'hemato (blood) + uria (urine condition)', example: 'Painless hematuria in a 60-year-old requires bladder cancer workup.' },
  { id: 'ren05', term: 'Oliguria', category: 'Renal/Urinary', module: 6, definition: 'Decreased urine output, defined as less than 400 mL per day in adults', etymology: 'oligo (few/scanty) + uria (urine condition)', example: 'Oliguria is an early sign of acute kidney injury.' },

  // Integumentary
  { id: 'int01', term: 'Dermatitis', category: 'Integumentary', module: 7, definition: 'Inflammation of the skin causing redness, itching, and rash', etymology: 'dermato (skin) + itis (inflammation)', example: 'Contact dermatitis from poison ivy causes blistering, weeping rash.' },
  { id: 'int02', term: 'Erythema', category: 'Integumentary', module: 7, definition: 'Redness of the skin caused by increased blood flow in superficial capillaries', etymology: 'erythros (red) in Greek', example: 'Erythema migrans is the bull\'s-eye rash characteristic of Lyme disease.' },
  { id: 'int03', term: 'Cellulitis', category: 'Integumentary', module: 7, definition: 'Bacterial skin infection affecting the deeper layers of skin and subcutaneous tissue', etymology: 'cellula (little cell) + itis (inflammation)', example: 'Cellulitis typically presents with warm, red, swollen skin and fever.' },
  { id: 'int04', term: 'Pruritus', category: 'Integumentary', module: 7, definition: 'Intense itching sensation of the skin', etymology: 'prurire (to itch) in Latin', example: 'Cholestatic liver disease causes generalized pruritus without visible rash.' },

  // Endocrine
  { id: 'end01', term: 'Hypoglycemia', category: 'Endocrine', module: 8, definition: 'Abnormally low blood glucose level, typically below 70 mg/dL', etymology: 'hypo (below) + glyco (sugar) + emia (blood condition)', example: 'Diabetic patients on insulin must monitor for hypoglycemia symptoms.' },
  { id: 'end02', term: 'Hypothyroidism', category: 'Endocrine', module: 8, definition: 'Underactive thyroid gland producing insufficient thyroid hormone', etymology: 'hypo (below) + thyroid + ism (condition)', example: 'Hashimoto\'s disease is the most common cause of hypothyroidism.' },
  { id: 'end03', term: 'Adrenal Insufficiency', category: 'Endocrine', module: 8, definition: 'Condition where the adrenal glands produce insufficient cortisol and/or aldosterone', etymology: 'ad (near) + renal (kidney) + insufficiency', example: 'Addison\'s disease causes primary adrenal insufficiency with hyperpigmentation.' },
  { id: 'end04', term: 'Polydipsia', category: 'Endocrine', module: 8, definition: 'Excessive or abnormal thirst; a classic symptom of diabetes', etymology: 'poly (many) + dipsia (thirst)', example: 'Polydipsia along with polyuria are hallmark symptoms of diabetes insipidus.' },

  // Hematology
  { id: 'hem01', term: 'Anemia', category: 'Hematology', module: 9, definition: 'Condition in which the blood lacks enough healthy red blood cells to carry adequate oxygen', etymology: 'an (without) + haima (blood)', example: 'Iron-deficiency anemia is the most common type worldwide.' },
  { id: 'hem02', term: 'Leukocytosis', category: 'Hematology', module: 9, definition: 'Abnormally high white blood cell count, often indicating infection or inflammation', etymology: 'leuko (white) + kytos (cell) + osis (increase)', example: 'Bacterial pneumonia typically causes significant leukocytosis.' },
  { id: 'hem03', term: 'Thrombocytopenia', category: 'Hematology', module: 9, definition: 'Abnormally low platelet count, increasing the risk of bleeding', etymology: 'thrombo (clot) + kytos (cell) + penia (deficiency)', example: 'Heparin-induced thrombocytopenia is a serious drug reaction.' },
  { id: 'hem04', term: 'Coagulopathy', category: 'Hematology', module: 9, definition: 'Any disorder affecting the blood\'s ability to clot properly', etymology: 'coagulo (to clot) + pathy (disease)', example: 'DIC is a life-threatening coagulopathy seen in sepsis.' },

  // Medical Abbreviations
  { id: 'abv01', term: 'NPO', category: 'Medical Abbreviations', module: 15, definition: 'Nothing by mouth (nil per os); patient must not eat or drink', etymology: 'Latin nil per os (nothing through the mouth)', example: 'The patient is NPO after midnight before tomorrow\'s surgery.' },
  { id: 'abv02', term: 'STAT', category: 'Medical Abbreviations', module: 15, definition: 'Immediately; with no delay (used for urgent orders)', etymology: 'Latin statim (immediately)', example: 'Order an ECG STAT — the patient is having chest pain.' },
  { id: 'abv03', term: 'PRN', category: 'Medical Abbreviations', module: 15, definition: 'As needed (pro re nata); medication given when required, not on a fixed schedule', etymology: 'Latin pro re nata (for the thing born, for the occasion)', example: 'Administer 4mg morphine IV PRN for pain rated 7 or above.' },
  { id: 'abv04', term: 'SOB', category: 'Medical Abbreviations', module: 15, definition: 'Shortness of breath; labored or difficult breathing', etymology: 'English abbreviation', example: 'Patient presents with SOB and oxygen saturation of 88%.' },
  { id: 'abv05', term: 'CVA', category: 'Medical Abbreviations', module: 15, definition: 'Cerebrovascular accident; stroke — disruption of blood flow to part of the brain', etymology: 'cerebro (brain) + vascular + accident', example: 'CT scan confirmed ischemic CVA in the left MCA territory.' },
  { id: 'abv06', term: 'URI', category: 'Medical Abbreviations', module: 15, definition: 'Upper respiratory infection; infection of nose, throat, or sinuses', etymology: 'English abbreviation of upper respiratory infection', example: 'Most URIs are viral and do not require antibiotics.' },
  { id: 'abv07', term: 'MI', category: 'Medical Abbreviations', module: 15, definition: 'Myocardial infarction; heart attack', etymology: 'myo (muscle) + cardial (of the heart) + infarction (tissue death)', example: 'The patient\'s troponin levels confirm acute MI.' },
  { id: 'abv08', term: 'HTN', category: 'Medical Abbreviations', module: 15, definition: 'Hypertension; chronic high blood pressure', etymology: 'hyper (above) + tensio (tension)', example: 'HTN is managed with lifestyle changes and antihypertensive medications.' },

  // Prefixes
  { id: 'pfx01', term: 'Brady-', category: 'Prefixes', module: 20, definition: 'Prefix meaning slow', etymology: 'Greek bradys (slow)', example: 'Bradycardia = slow heart rate; bradypnea = slow breathing' },
  { id: 'pfx02', term: 'Tachy-', category: 'Prefixes', module: 20, definition: 'Prefix meaning fast, rapid', etymology: 'Greek tachys (swift)', example: 'Tachycardia = rapid heart rate; tachypnea = rapid breathing' },
  { id: 'pfx03', term: 'Hyper-', category: 'Prefixes', module: 20, definition: 'Prefix meaning above, excessive, more than normal', etymology: 'Greek hyper (over, above)', example: 'Hypertension = high blood pressure; hyperglycemia = high blood sugar' },
  { id: 'pfx04', term: 'Hypo-', category: 'Prefixes', module: 20, definition: 'Prefix meaning below, under, deficient', etymology: 'Greek hypo (under, below)', example: 'Hypoglycemia = low blood sugar; hypothyroidism = underactive thyroid' },
  { id: 'pfx05', term: 'Poly-', category: 'Prefixes', module: 20, definition: 'Prefix meaning many, much, excessive', etymology: 'Greek polys (many)', example: 'Polydipsia = excessive thirst; polyuria = excessive urination' },
  { id: 'pfx06', term: 'Dys-', category: 'Prefixes', module: 20, definition: 'Prefix meaning painful, difficult, abnormal', etymology: 'Greek dys (bad, difficult)', example: 'Dyspnea = difficult breathing; dysphagia = difficulty swallowing' },
  { id: 'pfx07', term: 'A-/An-', category: 'Prefixes', module: 20, definition: 'Prefix meaning without, lacking, absence of', etymology: 'Greek a/an (not, without)', example: 'Anemia = without enough blood; apnea = without breathing' },
  { id: 'pfx08', term: 'Hemi-', category: 'Prefixes', module: 20, definition: 'Prefix meaning half', etymology: 'Greek hemi (half)', example: 'Hemiplegia = paralysis of half the body; hemianopia = vision loss in half the visual field' },

  // Suffixes
  { id: 'sfx01', term: '-itis', category: 'Suffixes', module: 21, definition: 'Suffix meaning inflammation', etymology: 'Greek -itis (inflammation)', example: 'Appendicitis = inflammation of appendix; arthritis = joint inflammation' },
  { id: 'sfx02', term: '-ectomy', category: 'Suffixes', module: 21, definition: 'Suffix meaning surgical removal', etymology: 'Greek ektomē (excision)', example: 'Appendectomy = removal of appendix; cholecystectomy = removal of gallbladder' },
  { id: 'sfx03', term: '-ostomy', category: 'Suffixes', module: 21, definition: 'Suffix meaning creation of an opening (stoma)', etymology: 'Greek stoma (mouth, opening)', example: 'Colostomy = opening from colon to skin; tracheostomy = opening in trachea' },
  { id: 'sfx04', term: '-plasty', category: 'Suffixes', module: 21, definition: 'Suffix meaning surgical repair or reconstruction', etymology: 'Greek plassein (to form, mold)', example: 'Rhinoplasty = nose reshaping; arthroplasty = joint reconstruction' },
  { id: 'sfx05', term: '-scopy', category: 'Suffixes', module: 21, definition: 'Suffix meaning visual examination using a scope', etymology: 'Greek skopein (to look at)', example: 'Colonoscopy = visual exam of colon; bronchoscopy = visual exam of airways' },
  { id: 'sfx06', term: '-algia', category: 'Suffixes', module: 21, definition: 'Suffix meaning pain', etymology: 'Greek algos (pain)', example: 'Myalgia = muscle pain; neuralgia = nerve pain; arthralgia = joint pain' },
  { id: 'sfx07', term: '-pathy', category: 'Suffixes', module: 21, definition: 'Suffix meaning disease or disorder of', etymology: 'Greek pathos (suffering)', example: 'Neuropathy = nerve disease; cardiomyopathy = heart muscle disease' },
  { id: 'sfx08', term: '-emia', category: 'Suffixes', module: 21, definition: 'Suffix meaning condition of the blood', etymology: 'Greek haima (blood)', example: 'Anemia = low red blood cells; leukemia = cancer of white blood cells' },

  // Combining Forms
  { id: 'cf01', term: 'Cardio-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to the heart', etymology: 'Greek kardia (heart)', example: 'Cardiology = study of heart; cardiomegaly = enlarged heart' },
  { id: 'cf02', term: 'Nephro-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to the kidney', etymology: 'Greek nephros (kidney)', example: 'Nephrology = study of kidneys; nephropathy = kidney disease' },
  { id: 'cf03', term: 'Hepato-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to the liver', etymology: 'Greek hēpar, hēpatos (liver)', example: 'Hepatology = study of liver; hepatomegaly = enlarged liver' },
  { id: 'cf04', term: 'Neuro-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to nerves or the nervous system', etymology: 'Greek neuron (nerve)', example: 'Neurology = study of nervous system; neuropathy = nerve disease' },
  { id: 'cf05', term: 'Osteo-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to bone', etymology: 'Greek osteon (bone)', example: 'Osteology = study of bones; osteoporosis = bone loss condition' },
  { id: 'cf06', term: 'Dermato-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to the skin', etymology: 'Greek derma (skin)', example: 'Dermatology = study of skin; dermatitis = skin inflammation' },
  { id: 'cf07', term: 'Hemato-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to blood', etymology: 'Greek haima, haimatos (blood)', example: 'Hematology = study of blood; hematoma = blood pooling under skin' },
  { id: 'cf08', term: 'Pulmo-', category: 'Combining Forms', module: 22, definition: 'Combining form referring to the lungs', etymology: 'Latin pulmo (lung)', example: 'Pulmonology = study of lungs; pulmonary embolism = clot in lung arteries' },

  // Pharmacology
  { id: 'pharm01', term: 'Analgesic', category: 'Pharmacology', module: 13, definition: 'Drug that relieves pain without loss of consciousness; pain reliever', etymology: 'an (without) + algos (pain) + -ic', example: 'Acetaminophen (Tylenol) is a common over-the-counter analgesic.' },
  { id: 'pharm02', term: 'Anticoagulant', category: 'Pharmacology', module: 13, definition: 'Drug that prevents or delays blood clotting; blood thinner', etymology: 'anti (against) + coagulant (clotting agent)', example: 'Warfarin is a widely used anticoagulant for DVT prevention.' },
  { id: 'pharm03', term: 'Diuretic', category: 'Pharmacology', module: 13, definition: 'Drug that increases urine production to reduce fluid retention', etymology: 'dia (through) + ourein (to urinate)', example: 'Furosemide (Lasix) is a loop diuretic used for heart failure.' },
  { id: 'pharm04', term: 'Bronchodilator', category: 'Pharmacology', module: 13, definition: 'Drug that widens the bronchial passages, improving airflow to the lungs', etymology: 'broncho (airway) + dilator (widener)', example: 'Albuterol is a short-acting bronchodilator used in asthma attacks.' },
  { id: 'pharm05', term: 'Vasodilator', category: 'Pharmacology', module: 13, definition: 'Drug that widens blood vessels, reducing blood pressure', etymology: 'vaso (vessel) + dilator (widener)', example: 'Nitroglycerin is a vasodilator used for acute angina relief.' },

  // Oncology
  { id: 'onc01', term: 'Metastasis', category: 'Oncology', module: 16, definition: 'Spread of cancer cells from the primary tumor to other parts of the body', etymology: 'meta (change/beyond) + stasis (standing)', example: 'Breast cancer metastasis to bone causes severe pain.' },
  { id: 'onc02', term: 'Carcinoma', category: 'Oncology', module: 16, definition: 'Malignant tumor arising from epithelial tissue; most common type of cancer', etymology: 'karkinos (crab/cancer) + oma (tumor)', example: 'Squamous cell carcinoma can arise in the skin, lung, or cervix.' },
  { id: 'onc03', term: 'Lymphoma', category: 'Oncology', module: 16, definition: 'Cancer of the lymphatic system affecting lymphocytes', etymology: 'lympha (clear water) + oma (tumor)', example: 'Hodgkin lymphoma has a characteristic Reed-Sternberg cell on biopsy.' },
  { id: 'onc04', term: 'Sarcoma', category: 'Oncology', module: 16, definition: 'Malignant tumor arising from connective tissue such as bone, muscle, or fat', etymology: 'sarx, sarkos (flesh) + oma (tumor)', example: 'Osteosarcoma is the most common bone cancer in adolescents.' },

  // Radiology
  { id: 'rad01', term: 'Radiography', category: 'Radiology', module: 17, definition: 'Imaging technique using X-rays to visualize internal structures', etymology: 'radio (ray) + graphy (recording)', example: 'Chest radiography is the first-line imaging for pneumonia.' },
  { id: 'rad02', term: 'Fluoroscopy', category: 'Radiology', module: 17, definition: 'Real-time X-ray imaging technique showing movement inside the body', etymology: 'fluoro (fluorescent) + scopy (viewing)', example: 'Fluoroscopy guides catheter placement during cardiac procedures.' },
  { id: 'rad03', term: 'Sonography', category: 'Radiology', module: 17, definition: 'Ultrasound imaging using high-frequency sound waves to create images', etymology: 'sono (sound) + graphy (recording)', example: 'Abdominal sonography detects gallstones and liver abnormalities.' },
  { id: 'rad04', term: 'Scintigraphy', category: 'Radiology', module: 17, definition: 'Nuclear medicine imaging using radioactive tracers to visualize organ function', etymology: 'scintilla (spark) + graphy (recording)', example: 'Bone scintigraphy detects metastatic lesions throughout the skeleton.' },

  // Surgery
  { id: 'surg01', term: 'Laparoscopy', category: 'Surgery', module: 18, definition: 'Minimally invasive surgical procedure using a camera inserted through small incisions', etymology: 'laparo (flank/abdomen) + scopy (viewing)', example: 'Laparoscopy is used for appendectomy, cholecystectomy, and hernia repair.' },
  { id: 'surg02', term: 'Anastomosis', category: 'Surgery', module: 18, definition: 'Surgical connection between two structures, usually hollow organs like intestines or blood vessels', etymology: 'ana (again) + stoma (mouth/opening)', example: 'After bowel resection, anastomosis reconnects the intestinal ends.' },
  { id: 'surg03', term: 'Hemostasis', category: 'Surgery', module: 18, definition: 'Cessation of bleeding; the process by which bleeding is stopped', etymology: 'hemo (blood) + stasis (standing still)', example: 'Electrocautery achieves hemostasis during surgical dissection.' },
  { id: 'surg04', term: 'Debridement', category: 'Surgery', module: 18, definition: 'Removal of dead, damaged, or infected tissue to promote healing', etymology: 'French débrider (to unbridle)', example: 'Wound debridement is essential for treating pressure ulcers.' },

  // Laboratory
  { id: 'lab01', term: 'Biopsy', category: 'Laboratory', module: 19, definition: 'Removal of a tissue sample for microscopic examination to diagnose disease', etymology: 'bio (life) + opsis (sight/appearance)', example: 'Liver biopsy is the gold standard for staging hepatic fibrosis.' },
  { id: 'lab02', term: 'Urinalysis', category: 'Laboratory', module: 19, definition: 'Laboratory analysis of urine to detect disease, infection, or metabolic disorders', etymology: 'urine + analysis', example: 'Urinalysis showing nitrites and WBCs indicates UTI.' },
  { id: 'lab03', term: 'Phlebotomy', category: 'Laboratory', module: 19, definition: 'Drawing blood from a vein for testing, transfusion, or donation', etymology: 'phlebo (vein) + tome (cutting)', example: 'Phlebotomy is a core skill for medical assistants.' },
  { id: 'lab04', term: 'Centrifugation', category: 'Laboratory', module: 19, definition: 'Process of spinning samples at high speed to separate components by density', etymology: 'centrum (center) + fugere (to flee)', example: 'Blood samples undergo centrifugation to separate plasma from cells.' },
]
