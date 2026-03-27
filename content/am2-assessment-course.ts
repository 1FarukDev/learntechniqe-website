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
  price: '£860',
  description: [
    'Technique Learning Solutions are now offering AM2 assessments at our approved training centre. The AM2 is the industry-standard end-point assessment for apprenticeships with qualifications such as C&G 2357 Level 3 or NVQ 3 (Diploma in Electrotechnical Technology). It is purely an assessment — there is no training element.',
    'The AM2 is also increasingly used by those wishing to gain their JIB card as an electrician — whether holding older qualifications that predate the NVQ or qualified electricians from outside the UK looking to work in the industry.',
    'It is today undeniably the industry-recognised trade test, designed to evidence that candidates have gained all relevant technical and safety-critical competencies during their training. It provides a single standard agreed upon by employers within the electrical industry, giving a reliable and trusted guarantee of safe, high-quality skills for the electrotechnical sector.',
  ],
  qualifications: [
    {
      title: 'AM2 Assessment Certificate',
      accreditedBy: 'NET (National Electrotechnical Training)',
    },
  ],
  duration: '2.5 – 3 Days',
  durationNote:
    'AM2 is 2.5 days. AM2S and AM2E are 3 days. The assessment is carried out in strict exam conditions.',
  bookingAvailable: true,
}

// ---------------------------------------------------------------------------
// Course details — Goals, Entry Requirements & Syllabus
// ---------------------------------------------------------------------------
export const am2DetailsData: CourseDetailsData = {
  courseGoals: [
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
  price: '£860',
  pricingTagline:
    'AM2 from £860 | AM2S / AM2E v1.0 from £935 | AM2S v1.1 from £1,375 | AM2E v1.1 from £1,200. First exam fee included. Essential guides supplied throughout the assessment.',
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
// Resit pricing reference (for internal / admin use — not a Sanity field)
// ---------------------------------------------------------------------------
export const am2ResitPricing = {
  composite: {
    'AM2 / AM2SV1.0 / AM2EV1.0': {
      '1 Section': '£240.00',
      '2 Sections': '£375.00',
      '3 Sections': '£445.00',
      '4 Sections': '£540.00',
      '5 Sections': '£590.00',
    },
    'AM2SV1.1 / AM2EV1.1': {
      '1 Section': '£310.00',
      '2 Sections': '£375.00',
      '3 Sections': '£545.00',
      '4 Sections': '£645.00',
      '5 Sections': '£710.00',
    },
  },
  individual: {
    'AM2 / AM2SV1.0 / AM2EV1.0': {
      'A1, C, E': '£185.00',
      'B, D': '£260.00',
    },
    'AM2SV1.1 / AM2EV1.1': {
      'A1, C, E': '£230.00',
      'B, D': '£310.00',
      E: '£275.00',
      F: '£275.00',
    },
  },
  resitSections: [
    'Lighting Circuit & Ring Final Circuit (2.25 hours)',
    'SWA & Motor Circuit (2.25 hours)',
    'Central Heating (2 hours)',
    'Bonding, Data & Safety Circuit FP200 (2 hours)',
    'Containment — AM2S / AM2E only (1.5 hours)',
  ],
}
