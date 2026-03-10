"use client";

import React, { useState } from "react";

interface BulletPoint {
  text: string;
}

interface FAQItem {
  question: string;
  intro?: string;
  bullets?: BulletPoint[];
  outro?: string[];
}

const faqs: FAQItem[] = [
  {
    question:
      "Why choose Technique Learning Solutions for your Electrical Course?",
    intro:
      "Technique Learning Solutions is one of the UK's preferred providers of electrical courses.\nThere are many reasons why you should train on an electrical course with us including:",
    bullets: [
      {
        text: "Our electrical courses can easily fit around your personal circumstances. You tell us when you can attend and what you want to achieve and we will endeavour to tailor the electrical course around you. There aren't many Training Providers which offer this unrivalled flexibility.",
      },
      {
        text: "ALL our electrical courses are fully accredited, meaning you get a City & Guilds, LCL Awards and/or EAL qualifications",
      },
      {
        text: "We work to ISO9001, ISO14001, and ISO 18001 standards, this ensures quality training, consistently delivered.",
      },
      {
        text: "On your electrical course you will be taught by expert, industry trained tutors. Our class sizes are kept to a minimum. Please take a minute to Meet the team which is made up of some of the most experienced people in the electrical training business teaching electrical courses.",
      },
      {
        text: "You will benefit from being in a purpose built, state of the art electrical courses training facility, please take a look at our virtual tour to see the facilities.",
      },
    ],
    outro: [
      "The aim of each electrical course is to provide you with the skill level and competence which will allow you to work safely and efficiently when carrying out work on electrical installations, equipment and systems. This is achieved by using the most realistic and up to date training facilities we believe you can work on.",
      "We guarantee that during the electrical courses you will learn a whole manner of things, from using various testing equipment to rewiring a house. You will be given the electrical skills and qualifications you need on your electrical course to get into the industry and develop your career.",
    ],
  },
  {
    question:
      '"I\'m getting on a bit" Is it like going back to school and will I feel out of place?',
    outro: [
      "Not at all! Our courses are designed for people of all ages and backgrounds. We have students ranging from school leavers to those in their 60s looking to retrain. Our tutors ensure everyone feels welcome and supported throughout their learning journey.",
    ],
  },
  {
    question: "When will I have to pay for the course?",
    outro: [
      "Payment is typically required before the course start date. We will confirm the exact payment schedule when you book your place. We offer flexible payment options to suit your circumstances.",
    ],
  },
  {
    question: "How can I pay for my course?",
    outro: [
      "We accept payment by bank transfer, credit/debit card, and cheque. We also offer finance options for eligible students. Please contact our team to discuss the best payment method for you.",
    ],
  },
  {
    question:
      "Is there any financial assistance available to help fund training?",
    outro: [
      "Yes, there are several funding options that may be available to you depending on your circumstances, including Advanced Learner Loans, employer funding, and other government schemes. Our team can help guide you through the options available.",
    ],
  },
  {
    question: "What accommodation is available?",
    outro: [
      "We have partnered with several local hotels that offer discounted rates for our students. Please see our Student Accommodation page for a full list of nearby options with contact details.",
    ],
  },
  {
    question: "Do I need to purchase my own copy of the regulation books?",
    outro: [
      "This depends on the course you are attending. For some courses, regulation books are included in the course fee. For others, you may need to purchase them separately. We will advise you on what is required when you book.",
    ],
  },
  {
    question: "What time does the course start and end?",
    outro: [
      "Courses typically run from 8:30am to 4:30pm Monday to Friday. Some courses may have different hours — your joining instructions will confirm the exact times for your specific course.",
    ],
  },
  {
    question: "Am I guaranteed work once I finish my training course?",
    outro: [
      "While we cannot guarantee employment, our qualifications are nationally recognised and highly regarded by employers. Many of our graduates go on to secure employment quickly after completing their training. We also offer career support and advice.",
    ],
  },
  {
    question: "What do I need to bring with me?",
    outro: [
      "You should bring photo ID, any relevant prior qualifications, a packed lunch or money for the vending machines, and appropriate clothing for practical work. A full list of requirements will be sent to you in your joining instructions prior to the course.",
    ],
  },
];


function FAQRow({
  faq,
  open,
  onToggle,
}: {
  faq: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        marginBottom: "0.75rem",
      }}
    >
      
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
        style={{
          backgroundColor: open ? "#016068" : "#E0E3E5",
          cursor: "pointer",
          border: "none",
        }}
      >
        <span
          className="font-bold text-sm pr-4 text-left break-words"
          style={{
            color: open ? "#ffffff" : "#000000",
          }}
        >
          {faq.question}
        </span>
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
            //   borderRadius: "50%",
            //   border: `2px solid ${open ? "rgba(255,255,255,0.6)" : "#9ca3af"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke={open ? "white" : "#9ca3af"}
              strokeWidth="2"
              style={{
                transition: "transform 0.3s ease",
                transform: open ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <line x1="7" y1="1" x2="7" y2="13" />
              <line x1="1" y1="7" x2="13" y2="7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Answer body */}
      {open && (
        <div className="px-6 py-5" style={{ backgroundColor: "#ffffff" }}>
          {/* Intro text */}
          {faq.intro && (
            <p
              className="text-sm text-black mb-5 leading-relaxed whitespace-pre-line"
            >
              {faq.intro}
            </p>
          )}

          {/* Bullet points with vertical line */}
          {faq.bullets && faq.bullets.length > 0 && (
            <div className="relative ml-2 mb-5">
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: 5,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  backgroundColor: "#016068",
                  borderRadius: 2,
                }}
              />
              <ul className="flex flex-col gap-5">
                {faq.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4 pl-6 relative">
                    {/* Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 6,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#14AE5C",
                        flexShrink: 0,
                      }}
                    />
                    <p
                      className="text-sm text-black leading-relaxed"
                    >
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outro paragraphs */}
          {faq.outro && (
            <div className="flex flex-col gap-3">
              {faq.outro.map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-black leading-relaxed"
                 
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-12 py-12 md:py-16">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">F.A.Qs</h2>
        <p className="text-black text-base font-normal max-w-2xl mx-auto leading-relaxed">
          General Questions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          <FAQRow
            key={i}
            faq={faq}
            open={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
