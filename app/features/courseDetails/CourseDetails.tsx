"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Topic = {
  title: string;
  points: string[];
};

type Tab = "goals" | "entry" | "syllabus";

const syllabusTopics: Topic[] = [
  {
    title: "Topic 1 — Safety and Foundations",
    points: [
      "The Total Industrial Electrical Maintenance 10-day course (TIEM10) is a hands-on, intensive training programme offered by Technique Learning Solutions.",
      "Safe working practices including isolation procedures and lock-out systems. Practical emphasis on safety.",
      "Safe working practices including isolation procedures and lock-out systems. Practical emphasis on safety.",
      "Introduction to switches, push buttons: types, industry-standard symbols (BS symbols), and their correct application. Practical testing included.",
      "The Total Industrial Electrical Maintenance 10-day course (TIEM10) is a hands-on, intensive training programme offered by Technique Learning Solutions.",
    ],
  },
  {
    title: "Topic 2 — Three-Phase Power & Motors",
    points: [
      "Understanding three-phase power systems and their applications in industrial environments.",
      "Motor types: induction motors, synchronous motors, and their operational principles.",
      "Wiring and connection of three-phase motors in star and delta configurations.",
      "Motor nameplate data interpretation and selection criteria for industrial use.",
    ],
  },
  {
    title: "Topic 3 — Motor Control Systems and Direct-On-Line (DOL) Starters",
    points: [
      "Principles of motor control circuits including start, stop, and emergency stop functions.",
      "Direct-On-Line (DOL) starter wiring, operation, and fault identification.",
      "Contactor and overload relay selection, setting, and testing procedures.",
      "Control circuit design using ladder diagrams and IEC symbols.",
    ],
  },
  {
    title: "Topic 4 — Reversing Starter Circuits",
    points: [
      "Design and operation of forward/reverse motor control circuits.",
      "Mechanical and electrical interlocking methods to prevent phase reversal faults.",
      "Practical wiring of reversing starters and functional testing.",
      "Fault-finding exercises on reversing starter circuits.",
    ],
  },
  {
    title: "Topic 5 — Star-Delta Starter Systems",
    points: [
      "Purpose and benefits of star-delta starting for reducing inrush current.",
      "Wiring and sequencing of star-delta starters with timer relays.",
      "Troubleshooting common faults in star-delta starter configurations.",
      "Comparison of star-delta starting with other reduced voltage methods.",
    ],
  },
  {
    title: "Topic 6 – Industrial Components & Transformers",
    points: [
      "Types and functions of industrial transformers: step-up, step-down, and isolation.",
      "Control transformers in panel wiring: selection and installation.",
      "Industrial components including fuses, MCBs, MCCBs, and their applications.",
      "Panel layout design and component mounting best practices.",
    ],
  },
  {
    title: "Topic 7 — Sensors, Proximity Devices and Control Systems",
    points: [
      "Types of sensors: inductive, capacitive, optical, and ultrasonic proximity sensors.",
      "Wiring and configuration of NPN and PNP sensor outputs.",
      "Integration of sensors into PLC and relay-based control systems.",
      "Practical exercises on sensor installation, alignment, and testing.",
    ],
  },
  {
    title: "Topic 8 — Protection, Earthing and Safety Systems",
    points: [
      "Earthing and bonding requirements in industrial installations to BS 7671.",
      "Types of protective devices: RCDs, RCCBs, and earth fault relays.",
      "Arc flash awareness and personal protective equipment (PPE) requirements.",
      "Safe isolation procedures and permit-to-work systems.",
    ],
  },
  {
    title: "Topic 9 — Cable Work, Termination & Testing",
    points: [
      "Cable types and selection for industrial power and control circuits.",
      "Correct termination techniques for various conductor sizes and terminal types.",
      "Continuity, insulation resistance, and polarity testing procedures.",
      "Cable routing, containment systems, and labelling standards.",
    ],
  },
  {
    title:
      "Topic 10 — Advanced Fault-Finding, Maintenance, Root Cause Analysis & Preventive Maintenance",
    points: [
      "Systematic fault-finding methodology using logical diagnostic techniques.",
      "Root cause analysis tools: 5-Why, fishbone diagrams applied to electrical faults.",
      "Preventive and predictive maintenance schedules for industrial electrical systems.",
      "Documentation and reporting of maintenance activities and fault histories.",
    ],
  },
];

const courseGoals = [
  {
    title: "Gain Industry-Recognised Qualifications",
    points: [
      "Achieve the EAL Level 3 Award in Industrial & Panel Wiring upon successful completion.",
      "Obtain City & Guilds accredited certification recognised across the UK and internationally.",
      "Build a credentials portfolio that demonstrates competence to employers.",
      "Qualify for roles in industrial electrical maintenance, panel building, and installations.",
    ],
  },
  {
    title: "Develop Practical Hands-On Skills",
    points: [
      "Wire, test, and commission a range of industrial motor control circuits.",
      "Apply safe isolation procedures and work safely within live panel environments.",
      "Use industry-standard test equipment including multimeters and insulation testers.",
      "Develop fault-finding skills through real-world simulated fault exercises.",
    ],
  },
  {
    title: "Understand Industrial Electrical Systems",
    points: [
      "Interpret electrical schematic diagrams, wiring diagrams, and control circuit layouts.",
      "Understand three-phase power distribution and motor control theory.",
      "Apply knowledge of BS 7671 wiring regulations to industrial installations.",
      "Identify and select appropriate components for industrial panel assemblies.",
    ],
  },
];

const entryRequirements = [
  {
    title: "Prior Electrical Knowledge",
    points: [
      "Candidates should have a basic understanding of electrical principles including voltage, current, and resistance.",
      "Some experience with single-phase or three-phase wiring is beneficial but not mandatory.",
      "Familiarity with basic hand tools used in electrical installations is expected.",
      "Previous completion of a Level 2 electrical qualification is advantageous.",
    ],
  },
  {
    title: "Health & Safety Awareness",
    points: [
      "Candidates must be aware of basic health and safety requirements in a workshop environment.",
      "A valid Health & Safety awareness certificate (e.g. CSCS or equivalent) is preferred.",
      "Candidates must be physically able to work in an industrial training environment.",
      "Understanding of personal protective equipment (PPE) usage is expected.",
    ],
  },
  {
    title: "Administrative Requirements",
    points: [
      "Candidates must be 18 years of age or older at the start of the course.",
      "Valid photo ID (passport or driving licence) must be presented on the first day.",
      "Full payment or an approved payment plan must be confirmed prior to course commencement.",
      "Candidates are required to sign and return the course enrolment agreement before attending.",
    ],
  },
];

const tabContent: Record<Tab, Topic[]> = {
  goals: courseGoals,
  entry: entryRequirements,
  syllabus: syllabusTopics,
};

function AccordionList({ topics }: { topics: Topic[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {topics.map((topic, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="rounded-sm overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
                isOpen
                  ? "bg-[#016068] text-white"
                  : "bg-[#e8edf2] text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="font-semibold text-sm">{topic.title}</span>
              {isOpen ? (
                <Minus className="w-4 h-4 shrink-0" />
              ) : (
                <Plus className="w-4 h-4 shrink-0" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white px-6 py-5">
                <ul className="flex flex-col gap-5">
                  {topic.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#016068] shrink-0" />
                      <p className="text-gray-700 text-sm leading-6">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CourseDetails() {
  const [activeTab, setActiveTab] = useState<Tab>("syllabus");
  const [animating, setAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<Tab>("syllabus");

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayedTab(tab);
      setActiveTab(tab);
      setAnimating(false);
    }, 200);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "goals", label: "Course Goals" },
    { key: "entry", label: "Entry Requirements" },
    { key: "syllabus", label: "Detailed Course Syllabus" },
  ];

  return (
    <div className="bg-white">
      <section className="py-12  max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 border border-gray-200 rounded-sm overflow-hidden mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`py-5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 border-r last:border-r-0 border-gray-200 ${
                activeTab === tab.key
                  ? "bg-[#4a5568] text-white"
                  : "bg-[#e8edf2] text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`transition-all duration-200 ease-in-out ${
            animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <AccordionList key={displayedTab} topics={tabContent[displayedTab]} />
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;
