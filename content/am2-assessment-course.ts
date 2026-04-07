/**
 * AM2 Assessment — Sanity CMS Course Data
 *
 * Use this file as a reference when populating the Sanity "course" document.
 * The field names match the GROQ query in lib/queries/courses.ts and the
 * TypeScript interfaces in lib/types/course.ts.
 *
 * There are three AM2 variants (AM2, AM2S, AM2E).  Because pricing and
 * duration differ, you may choose to create a single Sanity document
 * (recommended — keeps one URL) or separate documents per variant.
 * The structure below assumes a single document with variant pricing
 * captured in the description and pricingTagline fields.
 */

import type {
  CourseHeroData,
  CourseDetailsData,
  PricingBannerData,
  BookCourseData,
} from '@/lib/types/course'

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------
export const am2HeroData: CourseHeroData = {
  title: 'AM2 Assessment',
  slug: 'am2-assessment',
  tags: [
    { label: 'Assessment', color: '#016068' },
    { label: 'Electrician', color: '#F5A623' },
  ],
  price: '£885',
  description: [
    'Technique Learning Solutions are now offering AM2 assessments at our approved training centre. The AM2 is the industry-standard end-point assessment for apprenticeships with qualifications such as C&G 2357 Level 3 or NVQ 3 (Diploma in Electrotechnical Technology). It is purely an assessment — there is no training element.',
    'The AM2 is also increasingly used by those wishing to gain their JIB card as an electrician — whether holding older qualifications that predate the NVQ or qualified electricians from outside the UK looking to work in the industry.',
    'It is today undeniably the industry-recognised trade test, designed to evidence that candidates have gained all relevant technical and safety-critical competencies during their training. It provides a single standard agreed upon by employers within the electrical industry, giving a reliable and trusted guarantee of safe, high-quality skills for the electrotechnical sector.',
    'Recommended assessment and resit fees from 01 April 2026 are shown below. The fee you pay depends on the standard or version you are registered under — we confirm the correct price when you book. Ring us on 0800 112 3310 to book.',
  ],
  qualifications: [
    {
      title: 'AM2 Assessment Certificate',
      accreditedBy: 'NET (National Electrotechnical Training)',
    },
  ],
  duration: '2½ – 3 days',
  durationNote:
    'AM2 runs over two and a half days. AM2S and AM2E each run over three days. The assessment is carried out in strict exam conditions.',
  bookingAvailable: true,
}

// ---------------------------------------------------------------------------
// Course details — Goals, Entry Requirements & Syllabus
// ---------------------------------------------------------------------------
export const am2DetailsData: CourseDetailsData = {
  courseGoals: [
    {
      title: 'Please note — AM2 section names & pricing',
      points: [
        'AM2 section C1 is now Section C.',
        'AM2 section C2 is now Section D.',
        'AM2 section D is now Section E.',
        'Recommended prices from 01 April 2026 depend on the specific standard or version you are registered under (including AM2, AM2S, AM2E, AM2D, AM2ED, and v1.0 vs v1.1 registration dates). We confirm the fee that applies to you when you book.',
      ],
    },
    {
      title: 'Who Is the AM2 For?',
      points: [
        'AM2 – Candidates undertaking the JIB mature candidate assessment and those following the Level 3 NVQ who are not an apprentice.',
        'AM2S – Electrotechnical apprentices training against the apprenticeship standard.',
        'AM2E – Experienced workers completing the experienced worker assessment. This can only be taken once you have gained the experienced worker qualification; proof is required before booking.',
        'Apprentices coming to the end of their training for the JIB apprentice training scheme and the Installation of modern apprenticeships.',
      ],
    },
    {
      title: 'Gain Industry-Recognised Certification',
      points: [
        'Achieve the AM2 certificate — the industry-recognised trade test for the electrotechnical sector.',
        'Fulfil the end-point assessment requirement for Level 3 apprenticeships and the apprenticeship framework.',
        'Meet the final step to gain a JIB Gold Card when combined with a Level 3 NVQ.',
        'Demonstrate competence to employers with a trusted, nationally recognised qualification managed by NET.',
      ],
    },
    {
      title: 'Do I Need an AM2 Certificate?',
      points: [
        'Apprentices must pass their AM2 in their final year to complete their apprenticeship.',
        'If you are not following the apprenticeship standard, an AM2 certificate and Level 3 NVQ are required to gain a JIB Gold Card.',
        'Working electricians with older qualifications not currently recognised by the JIB for grading will need to pass the AM2.',
        'The Electrotechnical Diploma now includes the AM2, so those registering for NVQ Level 3 in Electrical Installation or Maintenance will take it as part of that programme.',
      ],
    },
  ],

  entryRequirements: [
    {
      title: 'Qualifications & Experience',
      points: [
        'Candidates should hold or be working towards a Level 3 electrical qualification such as C&G 2357 or NVQ 3 (Diploma in Electrotechnical Technology).',
        'AM2E candidates must have already gained the experienced worker qualification — proof is required before booking.',
        'Candidates should be confident in installing, connecting, terminating, inspecting, testing, commissioning, and diagnosing faults on electrical systems.',
        'Use our AM2 assessment checklist to confirm you are ready — contact our course advisors for a copy.',
      ],
    },
    {
      title: 'Knowledge & Competence',
      points: [
        'Thorough working knowledge of BS 7671 Wiring Regulations.',
        'Competence in safe isolation procedures and risk assessments.',
        'Ability to interpret installation specifications, circuit diagrams, and relevant statutory and non-statutory regulations.',
        'Familiarity with three-phase distribution, central heating / sustainable energy systems, lighting, power, data cabling, and safety-services circuits.',
      ],
    },
    {
      title: 'Administrative Requirements',
      points: [
        'Valid photo ID must be presented on the first day of assessment.',
        'AM2E candidates must provide proof of the experienced worker qualification before booking.',
        'Full payment must be confirmed prior to the assessment date.',
        'Contact us on 0800 112 3310 to book your assessment.',
      ],
    },
  ],

  syllabus: [
    {
      title: 'A1 — Safe Isolation & Risk Assessment',
      points: [
        'Demonstrate correct safe isolation procedures in accordance with industry standards.',
        'Carry out a risk assessment for the work area and planned tasks.',
      ],
    },
    {
      title: 'A2–A5 — Composite Installation',
      points: [
        'Install, connect and terminate a three-phase distribution board and sub circuit.',
        'Install a central heating / sustainable energy system.',
        'Wire lighting and power circuits to specification.',
        'Install a data cabling system.',
        'Install a safety-services circuit and device.',
        'Install containment systems (AM2S and AM2E only).',
        'All work must comply with BS 7671 Wiring Regulations, industry best practice, and relevant health and safety legislation.',
      ],
    },
    {
      title: 'B — Inspection, Testing & Certification',
      points: [
        'Carry out full inspection and testing of the completed installation.',
        'Record results accurately on the appropriate certification documents.',
        'Identify and rectify any non-compliances found during inspection.',
      ],
    },
    {
      title: 'C — Safe Isolation of Circuits',
      points: [
        'Demonstrate safe isolation of individual circuits within a live installation.',
        'Use approved voltage indicators and proving units correctly.',
      ],
    },
    {
      title: 'D — Fault Diagnosis & Rectification',
      points: [
        'Systematically diagnose faults within electrical installations.',
        'Rectify identified faults and confirm the installation is safe before re-energising.',
      ],
    },
    {
      title: 'E — Assessment of Applied Knowledge',
      points: [
        'Complete a short online knowledge assessment covering relevant regulations and technical principles.',
        'Demonstrate understanding of statutory and non-statutory requirements.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------
export const am2PricingData: PricingBannerData = {
  price: '£885',
  pricingTagline:
    'Recommended fees from 01 April 2026: AM2 £885 | AM2S (registered up to 03 Sep 2023, V1.0) £965 | AM2S v1 (from 04 Sep 2023, V1.1) £1,340 | AM2E (to 03 Sep 2023) £965 | AM2E v1 (from 04 Sep 2023) £1,235 | AM2D £1,535 | AM2ED £1,340. We confirm your fee when you book. Ring 0800 112 3310.',
}

// ---------------------------------------------------------------------------
// Booking / prerequisites / completion
// ---------------------------------------------------------------------------
export const am2BookData: BookCourseData = {
  title: 'AM2 Assessment',
  prerequisites:
    'Level 3 electrical qualification (C&G 2357, NVQ 3 or equivalent). AM2E candidates must hold the experienced worker qualification.',
  completionRewards: [
    'AM2 Assessment Certificate — the industry-recognised end-point assessment for the electrotechnical sector.',
    'Eligibility for JIB Gold Card (when combined with Level 3 NVQ).',
  ],
  qualifications: [
    {
      title: 'AM2 Assessment Certificate',
      accreditedBy: 'NET (National Electrotechnical Training)',
    },
  ],
}

// ---------------------------------------------------------------------------
// Pricing & resits — shown on /courses/am2-assessment (Am2ResitSection)
// Recommended prices: fee from 01 April 2026
// ---------------------------------------------------------------------------
export const am2PricingEffectiveDate = '01 April 2026'

export const am2RecommendedAssessments = [
  {
    item: 'AM2',
    info: 'Learners taking the Level 3 NVQ (City & Guilds 2357/EAL 1605)',
    fee: '£885',
  },
  {
    item: 'AM2S',
    info: 'Apprentices registered up to 03 September 2023 on V1.0',
    fee: '£965',
  },
  {
    item: 'AM2S v1',
    info: 'Apprentices registered from 04 September 2023 on V1.1; reflects additional content of the revised standard',
    fee: '£1,340',
  },
  {
    item: 'AM2E',
    info: 'Experienced Worker Assessment registrations up to 03 September 2023',
    fee: '£965',
  },
  {
    item: 'AM2E v1',
    info: 'Experienced Worker Assessment registrations from 04 September 2023; includes 17-hour practical and 90-minute Knowledge Test',
    fee: '£1,235',
  },
  {
    item: 'AM2D',
    info: 'Domestic Electrician standard; includes 19-hour practical and 90-minute Knowledge Test',
    fee: '£1,535',
  },
  {
    item: 'AM2ED',
    info: 'Domestic Electrician Experienced Worker Assessment; includes 19-hour practical and 90-minute Knowledge Test',
    fee: '£1,340',
  },
] as const

export const am2ResitIntro =
  'Resit charges account for the additional resource required to schedule ad hoc activities rather than full assessments. If multiple sections are resat, the total charge must not exceed the maximum recommended price for a full assessment.'

export const am2ResitColumnLegacy = 'AM2 / AM2E / AM2S'
export const am2ResitColumnV1 = 'AM2E v1 / AM2S v1'

/** Sections A1, B, C, D, E */
export const am2ResitIndividualSections = [
  { section: 'A1, C', legacy: '£190', v1: '£235' },
  { section: 'B, D', legacy: '£265', v1: '£315' },
  { section: 'E', legacy: '£190', v1: '£280' },
] as const

/** Sections A2–A6 (composite resit bundles) */
export const am2ResitCompositeSections = [
  {
    section: '1 section (Lighting/Ring Final)',
    legacy: '£250',
    v1: '£320',
  },
  {
    section: '2 sections (SWA and Motor circuit)',
    legacy: '£385',
    v1: '£475',
  },
  {
    section: '3 sections (Central Heating)',
    legacy: '£455',
    v1: '£555',
  },
  {
    section: '4 sections (Bonding, Data, Safety circuit)',
    legacy: '£550',
    v1: '£655',
  },
  {
    section: '5 sections (Containment - AM2S/E only)',
    legacy: '£610',
    v1: '£720',
  },
] as const

export const am2ResitDomesticNote =
  'Resit fees for AM2D and AM2ED will be advised separately.'

export const am2SupplementaryUnitsHeading =
  'AM2E Supplementary Units'

export const am2SupplementaryUnitsIntro =
  'Initial sittings for these units include higher processing fees due to administration and certification costs.'

export const am2SupplementaryUnits = [
  {
    item: 'AM2EU1 (Containment & Safe Isolation)',
    totalFee: '£355',
    netFee: '£160',
  },
  {
    item: 'AM2EU2 (Testing & Safe Isolation)',
    totalFee: '£355',
    netFee: '£160',
  },
  {
    item: 'Resit: Safe Isolation (EU1 or EU2)',
    totalFee: '£195',
    netFee: '£140',
  },
  {
    item: 'Resit: EU1 Containment',
    totalFee: '£250',
    netFee: '—',
  },
  {
    item: 'Resit: EU2 Testing',
    totalFee: '£270',
    netFee: '—',
  },
] as const

export const am2PaymentInformation =
  'All payments should be made via BACS or Direct Debit.'
