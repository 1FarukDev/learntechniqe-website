import CityGuildsLogo from '@/app/assets/certifications/city.png'
import EalLogo from '@/app/assets/certifications/eal.svg'
import NiceicLogo from '@/app/assets/certifications/niceic.svg'

import {
  CourseHeroData,
  CourseDetailsData,
  PricingBannerData,
  BookCourseData,
} from '@/lib/types/course'

export const defaultCourseHeroData: CourseHeroData = {
  title: 'Total Industrial Electrical Maintenance 10',
  slug: 'total-industrial-electrical-maintenance-10-10-day-industrial-total-package',
  tags: [{ label: 'Existing Electrician', color: '#016068' }],
  price: '£1,450',
  description: [
    'The Total Industrial Electrical Maintenance 10-day course (TIEM10) is a hands-on, intensive training programme offered by Technique Learning Solutions. It is designed for participants with some basic electrical understanding who wish to acquire a recognised qualification and gain the practical skills needed to work as an industrial electrician.',
    'Throughout the course, you will combine theory and practical work to develop competence in industrial wiring, control systems, motor control, fault-finding, maintenance and safety procedures.',
    'At the end of the ten days you will receive an external certificate (the EAL Level 3 Award in Industrial & Panel Wiring), giving you a recognised credential in industrial electrical maintenance.',
  ],
  requestOverviewLink: '#',
  qualifications: [
    {
      title: 'Fundamental Electrical Principles for Industrial Practices (MOD1)',
      accreditedBy: 'City & Guilds',
      accreditationLogo: CityGuildsLogo,
      accreditationLogoAlt: 'City & Guilds',
    },
    {
      title: 'EAL Level 3 Award in Industrial & Panel Wiring',
      accreditedBy: 'EAL',
      accreditationLogo: EalLogo,
      accreditationLogoAlt: 'EAL',
    },
  ],
  duration: '10 Days',
  durationNote: 'Please note the course dates may not run consecutively. We will be in touch to confirm subsequent dates on this package course after registration.',
  durationNoteLink: 'Please get in touch',
  bookingAvailable: true,
}

export const defaultCourseDetailsData: CourseDetailsData = {
  courseGoals: [
    {
      title: 'Gain Industry-Recognised Qualifications',
      points: [
        'Achieve the EAL Level 3 Award in Industrial & Panel Wiring upon successful completion.',
        'Obtain City & Guilds accredited certification recognised across the UK and internationally.',
        'Build a credentials portfolio that demonstrates competence to employers.',
        'Qualify for roles in industrial electrical maintenance, panel building, and installations.',
      ],
    },
    {
      title: 'Develop Practical Hands-On Skills',
      points: [
        'Wire, test, and commission a range of industrial motor control circuits.',
        'Apply safe isolation procedures and work safely within live panel environments.',
        'Use industry-standard test equipment including multimeters and insulation testers.',
        'Develop fault-finding skills through real-world simulated fault exercises.',
      ],
    },
    {
      title: 'Understand Industrial Electrical Systems',
      points: [
        'Interpret electrical schematic diagrams, wiring diagrams, and control circuit layouts.',
        'Understand three-phase power distribution and motor control theory.',
        'Apply knowledge of BS 7671 wiring regulations to industrial installations.',
        'Identify and select appropriate components for industrial panel assemblies.',
      ],
    },
  ],
  entryRequirements: [
    {
      title: 'Prior Electrical Knowledge',
      points: [
        'Candidates should have a basic understanding of electrical principles including voltage, current, and resistance.',
        'Some experience with single-phase or three-phase wiring is beneficial but not mandatory.',
        'Familiarity with basic hand tools used in electrical installations is expected.',
        'Previous completion of a Level 2 electrical qualification is advantageous.',
      ],
    },
    {
      title: 'Health & Safety Awareness',
      points: [
        'Candidates must be aware of basic health and safety requirements in a workshop environment.',
        'A valid Health & Safety awareness certificate (e.g. CSCS or equivalent) is preferred.',
        'Candidates must be physically able to work in an industrial training environment.',
        'Understanding of personal protective equipment (PPE) usage is expected.',
      ],
    },
    {
      title: 'Administrative Requirements',
      points: [
        'Candidates must be 18 years of age or older at the start of the course.',
        'Valid photo ID (passport or driving licence) must be presented on the first day.',
        'Full payment or an approved payment plan must be confirmed prior to course commencement.',
        'Candidates are required to sign and return the course enrolment agreement before attending.',
      ],
    },
  ],
  syllabus: [
    {
      title: 'Topic 1 — Safety and Foundations',
      points: [
        'Safe working practices including isolation procedures and lock-out systems. Practical emphasis on safety.',
        'Introduction to switches, push buttons: types, industry-standard symbols (BS symbols), and their correct application.',
      ],
    },
    {
      title: 'Topic 2 — Three-Phase Power & Motors',
      points: [
        'Understanding three-phase power systems and their applications in industrial environments.',
        'Motor types: induction motors, synchronous motors, and their operational principles.',
        'Wiring and connection of three-phase motors in star and delta configurations.',
        'Motor nameplate data interpretation and selection criteria for industrial use.',
      ],
    },
    {
      title: 'Topic 3 — Motor Control Systems and Direct-On-Line (DOL) Starters',
      points: [
        'Principles of motor control circuits including start, stop, and emergency stop functions.',
        'Direct-On-Line (DOL) starter wiring, operation, and fault identification.',
        'Contactor and overload relay selection, setting, and testing procedures.',
        'Control circuit design using ladder diagrams and IEC symbols.',
      ],
    },
    {
      title: 'Topic 4 — Reversing Starter Circuits',
      points: [
        'Design and operation of forward/reverse motor control circuits.',
        'Mechanical and electrical interlocking methods to prevent phase reversal faults.',
        'Practical wiring of reversing starters and functional testing.',
        'Fault-finding exercises on reversing starter circuits.',
      ],
    },
    {
      title: 'Topic 5 — Star-Delta Starter Systems',
      points: [
        'Purpose and benefits of star-delta starting for reducing inrush current.',
        'Wiring and sequencing of star-delta starters with timer relays.',
        'Troubleshooting common faults in star-delta starter configurations.',
      ],
    },
    {
      title: 'Topic 6 — Industrial Components & Transformers',
      points: [
        'Types and functions of industrial transformers: step-up, step-down, and isolation.',
        'Control transformers in panel wiring: selection and installation.',
        'Industrial components including fuses, MCBs, MCCBs, and their applications.',
      ],
    },
    {
      title: 'Topic 7 — Sensors, Proximity Devices and Control Systems',
      points: [
        'Types of sensors: inductive, capacitive, optical, and ultrasonic proximity sensors.',
        'Wiring and configuration of NPN and PNP sensor outputs.',
        'Integration of sensors into PLC and relay-based control systems.',
      ],
    },
    {
      title: 'Topic 8 — Protection, Earthing and Safety Systems',
      points: [
        'Earthing and bonding requirements in industrial installations to BS 7671.',
        'Types of protective devices: RCDs, RCCBs, and earth fault relays.',
        'Safe isolation procedures and permit-to-work systems.',
      ],
    },
    {
      title: 'Topic 9 — Cable Work, Termination & Testing',
      points: [
        'Cable types and selection for industrial power and control circuits.',
        'Correct termination techniques for various conductor sizes and terminal types.',
        'Continuity, insulation resistance, and polarity testing procedures.',
      ],
    },
    {
      title: 'Topic 10 — Advanced Fault-Finding, Maintenance, Root Cause Analysis & Preventive Maintenance',
      points: [
        'Systematic fault-finding methodology using logical diagnostic techniques.',
        'Root cause analysis tools: 5-Why, fishbone diagrams applied to electrical faults.',
        'Preventive and predictive maintenance schedules for industrial electrical systems.',
      ],
    },
  ],
}

export const defaultPricingBannerData: PricingBannerData = {
  price: '£1,450',
  originalPrice: '£1,950',
  pricingTagline: "That's £500 in savings, plus you gain skills that can fast-track your earning potential for years to come.",
}

export const defaultBookCourseData: BookCourseData = {
  title: 'Total Industrial Electrical Maintenance 10',
  prerequisites: 'Understanding of Basic Electrical Principles',
  completionRewards: [ 
    'The EAL Level 3 Award in Industrial & Panel Wiring certification.',
    'Fundamental Electrical Principles for Industrial Practices (PLC)',
  ],
  qualifications: [
    {
      title: 'Fundamental Electrical Principles for Industrial Practices (MOD1)',
      accreditedBy: 'City & Guilds',
      accreditationLogo: CityGuildsLogo,
      accreditationLogoAlt: 'City & Guilds',
    },
    {
      title: 'EAL Level 3 Award in Industrial & Panel Wiring',
      accreditedBy: 'EAL',
      accreditationLogo: EalLogo,
      accreditationLogoAlt: 'EAL',
    },
  ],
  cademyEmbedUrl: 'https://cademy.io/embed/learntechnique/cg-2391-52-initial-and-periodic-inspection-and-testing-of-electrical-installations/dates',
  cademyDirectUrl: 'https://learntechnique.cademy.io/cg-2391-52-initial-and-periodic-inspection-and-testing-of-electrical-installations?utm_source=ref_link&utm_medium=checkout_embed&utm_campaign=category_link&utm_term=learntechnique',
  // dates: [
  //   { from: '2026-02-16T08:30:00Z', to: '2026-02-27T14:00:00Z', spaces: 2,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-03-02T08:30:00Z', to: '2026-03-13T14:00:00Z', spaces: 8,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-03-16T08:30:00Z', to: '2026-03-27T14:00:00Z', spaces: 11, location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-03-30T08:30:00Z', to: '2026-04-10T14:00:00Z', spaces: 10, location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-04-27T08:30:00Z', to: '2026-05-08T14:00:00Z', spaces: 9,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-05-11T08:30:00Z', to: '2026-05-22T14:00:00Z', spaces: 12, location: 'Stirling',   price: '£1,450 + VAT' },
  //   { from: '2026-05-25T08:30:00Z', to: '2026-06-05T14:00:00Z', spaces: 6,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-06-08T08:30:00Z', to: '2026-06-19T14:00:00Z', spaces: 14, location: 'Stirling',   price: '£1,450 + VAT' },
  //   { from: '2026-06-22T08:30:00Z', to: '2026-07-03T14:00:00Z', spaces: 3,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-07-06T08:30:00Z', to: '2026-07-17T14:00:00Z', spaces: 7,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-07-20T08:30:00Z', to: '2026-07-31T14:00:00Z', spaces: 5,  location: 'Stirling',   price: '£1,450 + VAT' },
  //   { from: '2026-08-03T08:30:00Z', to: '2026-08-14T14:00:00Z', spaces: 9,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-08-17T08:30:00Z', to: '2026-08-28T14:00:00Z', spaces: 11, location: 'Stirling',   price: '£1,450 + VAT' },
  //   { from: '2026-09-07T08:30:00Z', to: '2026-09-18T14:00:00Z', spaces: 4,  location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-09-21T08:30:00Z', to: '2026-10-02T14:00:00Z', spaces: 8,  location: 'Stirling',   price: '£1,450 + VAT' },
  //   { from: '2026-10-05T08:30:00Z', to: '2026-10-16T14:00:00Z', spaces: 13, location: 'Clay Cross', price: '£1,450 + VAT' },
  //   { from: '2026-10-19T08:30:00Z', to: '2026-10-30T14:00:00Z', spaces: 2,  location: 'Clay Cross', price: '£1,450 + VAT' },
  // ],
}