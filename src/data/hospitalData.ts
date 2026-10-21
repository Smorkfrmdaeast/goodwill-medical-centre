/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HospitalInfo {
  name: string;
  shortName: string;
  tagline: string;
  addressCode: string;
  district: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  fullAddress: string;
  phoneRaw: string;
  phoneDisplay: string;
  phoneTelLink: string;
  whatsappLink: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
  openingHoursDisplay: string;
  openingHoursNote: string;
  ratingScore: number;
  ratingCount: number;
  ratingSource: string;
}

export const HOSPITAL_INFO: HospitalInfo = {
  name: 'Goodwill Medical Centre',
  shortName: 'Goodwill Medical',
  tagline: 'Caring for You, Every Step of the Way.',
  addressCode: 'FGQQ+57',
  district: 'Abakpa',
  city: 'Enugu',
  postalCode: '400103',
  state: 'Enugu State',
  country: 'Nigeria',
  fullAddress: 'FGQQ+57, Abakpa, Enugu, 400103, Enugu State, Nigeria',
  phoneRaw: '07032585626',
  phoneDisplay: '0703 258 5626',
  phoneTelLink: 'tel:+2347032585626',
  whatsappLink: 'https://wa.me/2347032585626?text=Hello%20Goodwill%20Medical%20Centre%2C%20I%20would%20like%20to%20enquire%20about%20hospital%20services.',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Goodwill+Medical+Centre+Abakpa+Enugu+Nigeria',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=6.4815,7.5312&z=15&output=embed',
  openingHoursDisplay: 'Open 24 Hours',
  openingHoursNote: 'Listed as 24-hour service on public hospital registry; pending administrative verification before final rollout.',
  ratingScore: 5.0,
  ratingCount: 6,
  ratingSource: 'Google Maps Business Listing',
};

export interface HospitalService {
  id: string;
  title: string;
  category: 'General Care' | 'Maternal & Child' | 'Emergency' | 'Diagnostics' | 'Pharmacy' | 'Inpatient';
  summary: string;
  fullDescription: string;
  availability: string;
  keyFeatures: string[];
  isDraftNotice?: string;
}

export const HOSPITAL_SERVICES: HospitalService[] = [
  {
    id: 'general-consultation',
    title: 'General Outpatient Care & Consultation',
    category: 'General Care',
    summary: 'Comprehensive clinical evaluation, diagnosis, and continuous primary care for individuals and families.',
    fullDescription: 'Our general outpatient clinic provides clinical assessments, diagnosis of common acute illnesses, management of chronic conditions, routine wellness check-ups, and coordinated specialty referrals when required.',
    availability: 'Daily Clinics',
    keyFeatures: [
      'Comprehensive clinical history & physical exam',
      'Management of acute infections & fevers',
      'Blood pressure & blood sugar screenings',
      'Preventive health counseling for adults and seniors',
    ],
    isDraftNotice: 'Proposed service specification for hospital administrative confirmation.',
  },
  {
    id: 'maternal-child-health',
    title: 'Maternal & Child Health Care',
    category: 'Maternal & Child',
    summary: 'Dedicated antenatal check-ups, postnatal guidance, and pediatric health monitoring for mothers and children.',
    fullDescription: 'Focused maternal healthcare supporting expectant mothers throughout pregnancy with routine antenatal checks, ultrasound coordination, nutritional advice, immunization scheduling, and infant wellness monitoring.',
    availability: 'Scheduled Clinics & Daily Support',
    keyFeatures: [
      'Antenatal monitoring & maternal assessments',
      'Child immunization tracking & growth checks',
      'Postnatal recovery guidance & newborn care',
      'Family health education & counseling',
    ],
    isDraftNotice: 'Proposed service specification for hospital administrative confirmation.',
  },
  {
    id: 'emergency-urgent-care',
    title: '24-Hour Emergency & Urgent Triage',
    category: 'Emergency',
    summary: 'Immediate medical attention, vital stabilization, and urgent response for acute health situations.',
    fullDescription: 'Round-the-clock urgent triage designed to assess acute medical symptoms, administer prompt emergency medication, perform wound dressing, and stabilize vital signs before specialized procedures.',
    availability: '24 Hours Daily',
    keyFeatures: [
      'Prompt patient triage & vital signs assessment',
      'Acute pain management & wound care',
      'Fluid resuscitation & stabilizing therapies',
      'Urgent medical consultation on arrival',
    ],
    isDraftNotice: 'Opening hours and emergency coverage to be confirmed prior to final publication.',
  },
  {
    id: 'diagnostic-laboratory',
    title: 'Diagnostic Laboratory Investigations',
    category: 'Diagnostics',
    summary: 'Essential medical laboratory testing providing accurate results to support clinical diagnosis.',
    fullDescription: 'Essential diagnostic screening and clinical tests to assist medical officers in pinpointing infections, metabolic markers, and organ function indicators with reliable turnaround times.',
    availability: 'Morning & Afternoon Sessions',
    keyFeatures: [
      'Malaria parasites & typhoid blood tests (Widal / rapid tests)',
      'Complete blood count (CBC / PCV) & blood grouping',
      'Urinalysis & stool microscopy',
      'Fasting blood glucose & lipid screenings',
    ],
    isDraftNotice: 'Test menu and laboratory partner network to be customized by hospital administration.',
  },
  {
    id: 'pharmacy-dispensary',
    title: 'Pharmacy & Medical Dispensary',
    category: 'Pharmacy',
    summary: 'Accredited dispensing of verified, quality pharmaceuticals and patient dosage counseling.',
    fullDescription: 'On-site dispensary stocking physician-prescribed essential medications, antibiotics, pain relievers, vitamins, and chronic illness maintenance treatments with clear guidance on usage.',
    availability: 'Operating During Clinic Hours',
    keyFeatures: [
      'Verified, genuine pharmaceutical products',
      'Pharmacist dosage counseling & interaction checks',
      'Over-the-counter essentials & first-aid supplies',
      'Prescription refill coordination',
    ],
    isDraftNotice: 'Formulary and dispensing hours to be verified with chief pharmacist.',
  },
  {
    id: 'inpatient-observation',
    title: 'Inpatient Observation & Nursing Care',
    category: 'Inpatient',
    summary: 'Short-stay clinical observation, comfortable beds, and dedicated nursing supervision.',
    fullDescription: 'Well-maintained inpatient and day-stay observation rooms allowing patients to rest under attentive nursing supervision during IV therapy, recovery from acute illness, or post-treatment monitoring.',
    availability: '24 Hours / As Admitted',
    keyFeatures: [
      'Clean, calm observation wards & beds',
      'Regular nursing rounds & vital monitoring',
      'Administration of prescribed infusions & injections',
      'Comfortable resting environment for recovery',
    ],
    isDraftNotice: 'Bed capacity and admission procedures to be confirmed by management.',
  },
];

export interface StaffPlaceholder {
  role: string;
  designation: string;
  description: string;
  verifiedStatus: 'Pending Hospital Submission' | 'To Be Confirmed';
}

export const STAFF_PLACEHOLDERS: StaffPlaceholder[] = [
  {
    role: 'Medical Leadership',
    designation: 'Medical Director & Chief Physician',
    description: 'Lead medical officer overseeing clinical quality, diagnostic decisions, and patient care standards at Goodwill Medical Centre.',
    verifiedStatus: 'Pending Hospital Submission',
  },
  {
    role: 'Nursing Services',
    designation: 'Matron / Chief Nursing Officer',
    description: 'Leads the dedicated nursing team, ward supervision, patient bedside care, and clinic triage operations.',
    verifiedStatus: 'Pending Hospital Submission',
  },
  {
    role: 'Clinical Support',
    designation: 'Consultant Clinical Officers & Duty Doctors',
    description: 'Qualified medical practitioners providing daily consultations, emergency coverage, and personalized patient follow-up.',
    verifiedStatus: 'Pending Hospital Submission',
  },
  {
    role: 'Diagnostics & Dispensary',
    designation: 'Laboratory Scientist & Pharmacist',
    description: 'Licensed professionals managing diagnostic sample integrity, accurate testing, and prescription dispensing.',
    verifiedStatus: 'Pending Hospital Submission',
  },
];

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  keyAdvice: string[];
}

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'preventing-malaria-enugu',
    title: 'Preventing Malaria in Enugu: Practical Home & Community Protection',
    category: 'Community Health',
    date: 'March 2026',
    readTime: '3 min read',
    summary: 'Essential preventive steps to minimize mosquito breeding around homes in Abakpa and when to seek medical testing for fever.',
    content: [
      'Malaria remains one of the most common causes of clinical visits across Enugu State. While treatable, early diagnosis through a laboratory blood test (such as rapid diagnostic tests or microscopy) is essential before starting medication.',
      'Around homes in Abakpa and surrounding neighborhoods, clearing standing water in uncovered containers, maintaining drainage gutters, and utilizing insecticide-treated bed nets significantly decrease exposure to mosquito bites.',
      'If you or your child develop persistent high fever, body aches, chills, or fatigue, avoid relying solely on self-medication. Visiting a clinical facility ensures that malaria is differentiated from typhoid or other bacterial infections.'
    ],
    keyAdvice: [
      'Sleep under insecticide-treated bed nets, especially pregnant women and young children.',
      'Eliminate stagnant water in domestic containers, buckets, and old tires.',
      'Always confirm fever with a laboratory test before taking antimalarial medicines.',
      'Seek prompt care if fever lasts more than 24 hours without improvement.'
    ]
  },
  {
    id: 'routine-blood-pressure-screening',
    title: 'Routine Blood Pressure Screenings: Why Early Checks Matter',
    category: 'Preventive Care',
    date: 'February 2026',
    readTime: '4 min read',
    summary: 'Hypertension is often called the silent health challenge. Learn why regular checks in your community make all the difference.',
    content: [
      'High blood pressure rarely presents obvious symptoms until it has reached advanced stages. Because of this silent progression, many adults in our communities may live with elevated blood pressure without realizing it.',
      'A simple, painless blood pressure check takes less than five minutes at a healthcare centre or community screening. Identifying elevated readings early allows for gentle lifestyle adjustments, dietary modifications (such as reducing excess salt), and medical guidance when appropriate.',
      'Goodwill Medical Centre encourages adults aged 25 and above to take advantage of routine checks whenever visiting the centre, even for unrelated minor consultations.'
    ],
    keyAdvice: [
      'Check your blood pressure at least once every three to six months if you are an adult.',
      'Reduce excessive sodium and processed seasoning in everyday home cooking.',
      'Incorporate 20 to 30 minutes of brisk walking into your daily routine.',
      'Never stop or change prescribed blood pressure medicines without consulting your doctor.'
    ]
  },
  {
    id: 'maternal-care-checklist',
    title: 'Antenatal Care Checklist: Essential Steps for Expectant Mothers',
    category: 'Maternal Care',
    date: 'January 2026',
    readTime: '4 min read',
    summary: 'A clear guide to scheduling early prenatal visits, understanding ultrasound checks, and preparing for safe delivery.',
    content: [
      'Pregnancy is a milestone journey that benefits immensely from regular, supportive medical supervision. Registering early for antenatal care allows healthcare providers to monitor fetal development, check maternal blood levels, and detect any potential complications early.',
      'Routine prenatal visits monitor blood pressure, maternal weight, urine protein levels, and fetal heart sounds. They also provide mothers with vital supplements including iron and folic acid, alongside guidance on nutrition and hydration.',
      'Having an established relationship with your local hospital in Abakpa ensures that when labor begins or if any unexpected symptoms arise, a familiar clinical team is ready to welcome and care for you.'
    ],
    keyAdvice: [
      'Begin antenatal consultations within the first trimester of pregnancy.',
      'Take prescribed iron and folic acid supplements consistently.',
      'Keep your antenatal appointment card safe and attend every scheduled review.',
      'Know the signs that require immediate hospital attention: unusual bleeding, severe headache, or sudden swelling.'
    ]
  }
];

export const FREQUENT_QUESTIONS = [
  {
    question: 'Where is Goodwill Medical Centre located?',
    answer: 'We are situated at FGQQ+57, Abakpa, Enugu, 400103, Enugu State, Nigeria. The hospital is easily accessible by public transport or private vehicle within the Abakpa community.',
  },
  {
    question: 'How do I book or enquire about an appointment?',
    answer: 'You can complete our online appointment enquiry form on this website, call our front desk directly at 0703 258 5626, or message us via WhatsApp. Hospital staff will confirm your preferred timing.',
  },
  {
    question: 'What are the hospital operating hours?',
    answer: 'Goodwill Medical Centre is listed as open 24 hours for urgent and emergency cases. Routine outpatient consultations and administrative appointments are typically held during standard clinic hours.',
  },
  {
    question: 'Can I contact the hospital for urgent medical situations?',
    answer: 'Yes. For immediate assistance or urgent triage, call 0703 258 5626 or come directly to the hospital in Abakpa. For emergency situations, immediate telephone contact or arrival at the facility is recommended.',
  },
  {
    question: 'Is this website the final live version?',
    answer: 'This is a professional website concept developed specifically for Goodwill Medical Centre to demonstrate an optimal online presence. Verified medical details, staff profiles, and administrative features will be finalized in collaboration with hospital management.',
  },
];
