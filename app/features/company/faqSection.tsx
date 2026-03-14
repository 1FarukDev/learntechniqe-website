"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    question: "Can I really become an electrician with no experience?",
    intro:
      "Yes, absolutely. Most of our students start with zero electrical experience. Our courses are specifically designed for complete beginners. Here’s what makes it work: ",
    bullets: [
      {
        text: "Individual workstations - You get your own equipment, so you’re not waiting around or watching others ",
      },
      {
        text: "Over 50% hands-on training - You learn by doing, not just listening ",
      },
      {
        text: "Small class sizes (1-10 students) - Tutors give you personal attention when you’re stuck ",
      },
      {
        text: "Experienced tutors - Our instructors have decades of real-world experience and know how to teach beginners ",
      },
    ],
    outro: [
      "The average age of our career-changing students is 38. We’ve successfully trained people in their 40s and 50s who had never touched electrical equipment before. ",
      "What you need: Willingness to learn, basic problem-solving skills, and commitment to the course. That’s it. ",
      "Follow-up support: If you struggle with any module, we offer free retakes and extra trainer sessions until you pass. ",
    ],
  },
  {
    question: '"How do I pay for the course? Can I pay monthly? ',
    intro:
      "Yes, we offer flexible payment options including monthly payment plans. Payment options include: ",

    bullets: [
      {
        text: "Full payment upfront (often with early booking discounts) ",
      },
      {
        text: "Monthly payment plans - Spread the cost over several months ",
      },
      {
        text: "Employer sponsorship - Many companies pay for employee training",
      },
      {
        text: "Finance options - We can guide you through available finance schemes ",
      },
    ],
    outro: [
      "To discuss your specific situation: ",
      "Call us on 0800 112 3310 or email info@learntechnique.com. Our team will walk you through what’s available and help you find the best option for your budget. ",
      "Important: Don’t let cost stop you from enquiring. We’ve helped hundreds of students find ways to afford training, including those who thought it was out of reach. ",
    ],
  },
  {
    question: "What happens if I fail the course or assessment? ",
    intro:
      "You can retake the assessment/exams and extra support until you pass. Here’s our policy: ",
    bullets: [
      {
        text: "Retakes - If you don’t pass first time, you can retake the assessment at a small cost, this cost is set by the awarding bodies. ",
      },
      {
        text: "Extra trainer sessions - We provide additional one-on-one support if you’re struggling ",
      },
      {
        text: "No time pressure - We work with you at your pace until you’re confident ",
      },
      {
        text: "Finance options - We can guide you through available finance schemes ",
      },
    ],
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
  const hasContent = faq.intro || (faq.bullets && faq.bullets.length > 0) || (faq.outro && faq.outro.length > 0);

  return (
    <div className="rounded-sm overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
          open ? "bg-[#016068] text-white" : "bg-[#e8edf2] text-gray-700 hover:bg-gray-200"
        }`}
      >
        <span className="font-semibold text-sm pr-4 text-left break-words">
          {faq.question}
        </span>
        {open ? (
          <Minus className="w-4 h-4 shrink-0" />
        ) : (
          <Plus className="w-4 h-4 shrink-0" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open && hasContent ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-6 py-5">
          {faq.intro && (
            <p className="text-sm text-gray-700 mb-5 leading-relaxed whitespace-pre-line">
              {faq.intro}
            </p>
          )}

          {faq.bullets && faq.bullets.length > 0 && (
            <ul className="flex flex-col gap-5 mb-5">
              {faq.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#016068] shrink-0" />
                  <p className="text-gray-700 text-sm leading-6">{b.text}</p>
                </li>
              ))}
            </ul>
          )}

          {faq.outro && faq.outro.length > 0 && (
            <div className="flex flex-col gap-3">
              {faq.outro.map((para, i) => (
                <p key={i} className="text-gray-700 text-sm leading-6">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
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
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">
          F.A.Qs
        </h2>
        <p className="text-black text-base font-normal max-w-2xl mx-auto leading-relaxed">
          General Questions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-3">
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
