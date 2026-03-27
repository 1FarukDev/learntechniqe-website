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
      "Yes, absolutely. Most of our students start with zero electrical experience. Our courses are specifically designed for complete beginners. Here's what makes it work:",
    bullets: [
      {
        text: "Individual workstations - You get your own equipment, so you're not waiting around or watching others",
      },
      {
        text: "Over 50% hands-on training - You learn by doing, not just listening",
      },
      {
        text: "Small class sizes (1-10 students) - Tutors give you personal attention when you're stuck",
      },
      {
        text: "Experienced tutors - Our instructors have decades of real-world experience and know how to teach beginners",
      },
    ],
    outro: [
      "The average age of our career-changing students is 38. We've successfully trained people in their 40s and 50s who had never touched electrical equipment before.",
      "What you need: Willingness to learn, basic problem-solving skills, and commitment to the course. That's it.",
      "Follow-up support: If you struggle with any module, we offer free retakes and extra trainer sessions until you pass.",
    ],
  },
  {
    question: "How do I pay for the course? Can I pay monthly?",
    intro:
      "Yes, we offer flexible payment options including monthly payment plans. Payment options include:",
    bullets: [
      {
        text: "Full payment upfront (often with early booking discounts)",
      },
      {
        text: "Monthly payment plans - Spread the cost over several months",
      },
      {
        text: "Employer sponsorship - Many companies pay for employee training",
      },
      {
        text: "Finance options - We can guide you through available finance schemes",
      },
    ],
    outro: [
      "To discuss your specific situation:",
      "Call us on 0800 112 3310 or email info@learntechnique.com. Our team will walk you through what's available and help you find the best option for your budget.",
      "Important: Don't let cost stop you from enquiring. We've helped hundreds of students find ways to afford training, including those who thought it was out of reach.",
    ],
  },
  {
    question: "What happens if I fail the course or assessment?",
    intro:
      "You can retake the assessment/exams and receive extra support until you pass. Here's our policy:",
    bullets: [
      {
        text: "Retakes - If you don't pass first time, you can retake the assessment at a small cost, this cost is set by the awarding bodies.",
      },
      {
        text: "Extra trainer sessions - We provide additional one-on-one support if you're struggling",
      },
      {
        text: "No time pressure - We work with you at your pace until you're confident",
      },
    ],
    outro: [
      "Our pass rate is 98% on first attempt, but we understand that sometimes life happens or certain concepts take longer to click.",
      "What if I'm really struggling during the course? Tell your tutor immediately. They'll identify exactly what you're finding difficult, give you extra practice time, explain concepts in different ways, and provide additional resources.",
      "We never give up on students. If you're committed to learning, we're committed to getting you qualified.",
    ],
  },
  {
    question: "Will the course actually run? I've heard training companies cancel courses.",
    intro:
      "We never cancel courses. Even if only one student books, the course runs. This is one of our key differences from other training providers. Here's why we can guarantee this:",
    bullets: [
      {
        text: "Multiple training centres (Chesterfield, Oxford, Stirling) with dedicated facilities",
      },
      {
        text: "Full-time tutors on staff, not freelancers we book per course",
      },
      {
        text: "Extensive equipment - We're not sharing resources between courses",
      },
    ],
    outro: [
      "What this means for you: Book with confidence — your course will definitely happen. No last-minute scrambling to find alternative dates. No wasted holiday time or travel arrangements.",
      "Real example: We've run courses with just 1-2 students many times. You still get the full course, individual attention, and the same certification.",
    ],
  },
  {
    question: "I'm 45 years old. Am I too old to retrain as an electrician?",
    intro:
      "Not at all. The average age of our career-changing students is 38. We regularly train people in their 40s, 50s, and even 60s who go on to successful electrical careers. Why age is actually an advantage:",
    bullets: [
      {
        text: "Life experience - You understand customer service, time management, and professionalism",
      },
      {
        text: "Motivation - Career changers are often more committed than younger students",
      },
      {
        text: "Financial stability - You can invest in quality tools and build a business properly",
      },
      {
        text: "Network - You likely have contacts who could become customers",
      },
    ],
    outro: [
      "Real outcomes: Most of our older students secure employment during or immediately after training. Many become self-employed and earn £35k+ in their first year.",
      "Physical concerns? Modern electrical work isn't as physically demanding as you might think. Inspection and testing, PLC programming, and commercial electrical work involve more brainpower than heavy lifting.",
      "The honest truth: Your biggest barrier isn't age — it's deciding to start. Once you're in the workshop, age disappears.",
    ],
  },
  {
    question: "What's included in the course price? Are there hidden costs?",
    intro:
      "The course price includes everything you need to complete the training and get certified. What's included:",
    bullets: [
      {
        text: "All training materials and manuals",
      },
      {
        text: "Use of all equipment and tools during the course",
      },
      {
        text: "Assessment and examination fees",
      },
      {
        text: "Certification from awarding bodies (City & Guilds, EAL, etc.)",
      },
      {
        text: "Ongoing technical support after the course",
      },
    ],
    outro: [
      "What you'll need to provide: Basic PPE (safety boots, work clothes), your own tools for some courses (we'll tell you exactly what you need beforehand), and accommodation and travel if you're coming from outside the area.",
      "No surprise fees. The price we quote is the price you pay. If there are any additional costs specific to your course, we'll tell you upfront during booking.",
    ],
  },
  {
    question: "How quickly can I start earning money after the course?",
    intro:
      "Most students secure work during or within weeks of completing training. Realistic timeline:",
    bullets: [
      {
        text: "During the course - Some students line up jobs before they even finish",
      },
      {
        text: "Immediately after - Many start as trainee/improver electricians within 1-2 weeks",
      },
      {
        text: "Within 1-3 months - Most career changers are employed or starting self-employment",
      },
    ],
    outro: [
      "Expected earnings: First year (employed) £28k–£35k as trainee/improver; first year (self-employed) £35k+ if you're motivated; experienced (2–5 years) £40k–£70k+ depending on specialisation.",
      "Specialisations pay more: PLC programmers (£30k–£80k+), HVAC engineers (£28k–£70k+), renewable energy specialists (£32k–£70k+).",
      "What helps you get work faster: job placement assistance, employer partnerships, completing all required modules (18th Edition, Inspection & Testing, AM2), and a professional approach.",
    ],
  },
  {
    question: "Can I do the course part-time or in the evenings?",
    intro:
      "Yes, we offer flexible scheduling. We don't offer evening classes for in-person courses, but online courses can be completed whenever suits you. Options available:",
    bullets: [
      {
        text: "Intensive full-time - Complete courses in 5-20 days (most popular)",
      },
      {
        text: "Modular approach - Break longer courses into separate modules over several months",
      },
    ],
    outro: [
      "How to make it work with your job: Book annual leave — many students use 1-2 weeks holiday for intensive courses. Some employers also give paid time off for professional development.",
      "Most students find intensive courses (5-10 consecutive days) work best because information stays fresh in your mind, you build momentum and confidence, and you finish faster and can start earning sooner.",
      "Call us to discuss your specific situation — we'll help you plan a schedule that works: 0800 112 3310",
    ],
  },
  {
    question: "What's the difference between your courses and a traditional apprenticeship?",
    intro:
      "Our fast-track courses get you qualified in 10-20 days instead of 3-4 years. Here's how the two compare:",
    bullets: [
      {
        text: "Traditional apprenticeship: 3-4 years, apprentice wages (£15k–£20k while training), typically for school leavers, long-term commitment to one employer",
      },
      {
        text: "Technique Training fast-track: 10-20 days intensive, over 50% hands-on with individual workstations, any age (average career changer is 38), flexible — get qualified quickly then choose your path",
      },
    ],
    outro: [
      "Which is better? Choose an apprenticeship if you're young, want to earn while you learn, and have 3-4 years to commit. Choose fast-track if you're career changing, need to earn proper money quickly, want flexibility, or are over 25.",
      "Important: Both routes lead to the same qualifications and career opportunities. Fast-track students often earn more in year one because they can start working as qualified electricians immediately.",
      "You'll still need experience: After our courses, you'll typically work as an improver for 6-12 months to build real-world experience before going fully independent.",
    ],
  },
  {
    question: "What support do I get after I finish the course?",
    intro:
      "You get ongoing technical support for life, plus job placement assistance. Post-course support includes:",
    bullets: [
      {
        text: "Technical support - Call or email with technical questions anytime, advice on regulations, wiring problems, or tricky installations, and updates on regulation changes (like new BS 7671 amendments)",
      },
      {
        text: "Career development - Guidance on next qualifications to take, advice on specialisations (renewables, PLC, HVAC), and business advice for those going self-employed",
      },
      {
        text: "Free retakes - If you need to retake an assessment later (e.g. for renewal), we support you",
      },
    ],
    outro: [
      "Real example: Students regularly call us months or years after their course with questions like \"I'm wiring a three-phase motor, can you talk me through the connections?\" We're always happy to help.",
      "This is lifetime support, not just 30 days. We're invested in your long-term success, not just getting you through the course.",
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
  const hasContent =
    faq.intro ||
    (faq.bullets && faq.bullets.length > 0) ||
    (faq.outro && faq.outro.length > 0);

  return (
    <div className="rounded-sm overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
          open
            ? "bg-[#016068] text-white"
            : "bg-[#e8edf2] text-gray-700 hover:bg-gray-200"
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
          open && hasContent ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-6 py-5">
          {faq.intro && (
            <p className="text-sm text-gray-800 font-medium mb-4 leading-relaxed">
              {faq.intro}
            </p>
          )}

          {faq.bullets && faq.bullets.length > 0 && (
            <ul className="mb-5 flex list-none flex-col pl-0">
              {faq.bullets.map((b, i, arr) => {
                const dashIndex = b.text.indexOf(" - ");
                const label = dashIndex !== -1 ? b.text.slice(0, dashIndex) : null;
                const body = dashIndex !== -1 ? b.text.slice(dashIndex + 3) : b.text;
                const isFirst = i === 0;
                const isLast = i === arr.length - 1;
                return (
                  <li key={i} className="flex gap-4">
                    <div className="relative flex w-4 shrink-0 self-stretch items-start justify-center">
                      <span
                        className="mt-[7px] size-2.5 shrink-0 rounded-full bg-[#016068] ring-2 ring-white z-[1]"
                        aria-hidden
                      />
                      {!isFirst && (
                        <div className="absolute left-1/2 top-0 h-[7px] w-px -translate-x-1/2 bg-gray-200" aria-hidden />
                      )}
                      {!isLast && (
                        <div className="absolute left-1/2 top-[17px] bottom-0 w-px -translate-x-1/2 bg-gray-200" aria-hidden />
                      )}
                    </div>
                    <p
                      className={`flex-1 text-sm leading-6 text-gray-700 ${isLast ? "pb-0" : "pb-5"}`}
                    >
                      {label && (
                        <span className="font-semibold text-gray-900">{label} — </span>
                      )}
                      {body}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}

          {faq.outro && faq.outro.length > 0 && (
            <div className="flex flex-col gap-3 mt-1">
              {faq.outro.map((para, i) => {
                const colonIndex = para.indexOf(": ");
                const knownLabels = ["What you need", "Follow-up support", "Important", "What this means for you", "Real example", "Real outcomes", "Physical concerns", "The honest truth", "Expected earnings", "Specialisations pay more", "What helps you get work faster", "Which is better", "You'll still need experience"];
                const startsWithLabel = colonIndex !== -1 && knownLabels.some(l => para.startsWith(l));
                const label = startsWithLabel ? para.slice(0, colonIndex) : null;
                const body = startsWithLabel ? para.slice(colonIndex + 2) : para;
                return (
                  <p key={i} className="text-gray-700 text-sm leading-6">
                    {label && <span className="font-semibold text-gray-900">{label}: </span>}
                    {body}
                  </p>
                );
              })}
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