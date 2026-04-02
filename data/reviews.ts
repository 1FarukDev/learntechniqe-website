import type { StaticImageData } from "next/image";

/**
 * Review shape - compatible with Sanity CMS.
 * `image` is optional — when absent the card renders initials as an avatar.
 */
export interface Review {
  _id?: string;
  name: string;
  image?: StaticImageData | string;
  rating: number;
  title: string;
  text: string;
  age?: string | number;
}

/** Default reviews - replace with Sanity fetch when ready */
export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Michael",
    rating: 5,
    title: "Outstanding team & support",
    text: "I'd recommend Technique to anyone at work looking for proper trade training. Wendy and the office team were brilliant from first enquiry through to the last day on site.",
    age: "32",
  },
  {
    name: "Max",
    rating: 5,
    title: "Clear, professional delivery",
    text: "The tutors explain things properly and the centre is well organised. You always know what's going on and the standard of teaching is consistently high across the modules I attended.",
    age: "29",
  },
  {
    name: "Sophia",
    rating: 5,
    title: "Instructors who go the extra mile",
    text: "The trainers genuinely want you to succeed—they're patient, approachable, and happy to answer questions. It feels like a professional training company that invests in its learners, not a box-ticking exercise.",
    age: "26",
  },
  {
    name: "Daniel",
    rating: 5,
    title: "Real-world expertise",
    text: "You can tell the instructors have been out in industry. The examples they use stick with you and the facilities match what you'd expect from a serious electrical and technical training provider.",
    age: "35",
  },
  {
    name: "James",
    rating: 5,
    title: "A training provider you can trust",
    text: "Professional setup, knowledgeable tutors, and a calm, focused learning environment. Whether you're upskilling or starting out, the whole organisation feels geared toward doing things properly.",
    age: "41",
  },
  {
    name: "Emma",
    rating: 5,
    title: "Opened doors for my career",
    text: "The qualifications and practical focus I gained here have made a real difference to my job prospects. The hands-on approach and the quality of the teaching staff are what set this place apart.",
    age: "28",
  },
  {
    name: "David",
    rating: 5,
    title: "Smooth from booking to classroom",
    text: "Communication with the company was clear, the centre is easy to get to, and once you're in the workshop or classroom the atmosphere is supportive. You feel looked after as a customer and as a learner.",
    age: "38",
  },
  {
    name: "Sarah",
    rating: 5,
    title: "Welcoming for every level",
    text: "I was nervous about technical training but the instructors and staff put me at ease straight away. Great facilities, strong teaching, and a sense that the whole team wants you to leave confident—not just with a certificate.",
    age: "33",
  },
];
