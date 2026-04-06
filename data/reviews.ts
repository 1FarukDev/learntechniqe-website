import type { StaticImageData } from "next/image";

export interface Review {
  _id?: string;
  name: string;
  image?: StaticImageData | string;
  rating: number;
  title: string;
  text: string;
  age?: string | number;
  course?: string;
}

/** Real reviews sourced from CourseCheck (coursecheck.com/provider/188) */
export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Chris M.",
    rating: 5,
    title: "Excellent facilities and tutor",
    text: "Excellent facilities. Andy has been fantastic sharing his extensive knowledge. Very engaging and informative. Very glad I chose this course.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Allan R.",
    rating: 5,
    title: "Real-life knowledge applied brilliantly",
    text: "Allan was extremely well versed in electrical knowledge and was able to convey it and apply real life situations to what we needed to know. Excellent course.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Mark T.",
    rating: 5,
    title: "Chris made the content digestible",
    text: "Chris was amazing and made the content very digestible. Probably the best tutor I've had in the past 12 years. Thanks Chris!",
    course: "City & Guilds 2391-52",
  },
  {
    name: "James P.",
    rating: 5,
    title: "Great support from the tutor",
    text: "Great support from Keith the tutor, went out of his way to help and allowed me to complete my practical on the Friday to save a long return visit on another date.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Andy K.",
    rating: 5,
    title: "Didn't know what to expect — loved it",
    text: "I didn't know what to expect with this course. Alan made the course very interesting, I've learnt a lot from it. He also made the course a lot of fun and kept us laughing throughout the week, top man!",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Simon G.",
    rating: 5,
    title: "Good course with knowledgeable tutor",
    text: "Good course, very knowledgeable tutor, bit of a laugh to break up the tedious but necessary parts of the course. Overall very good.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Paul W.",
    rating: 5,
    title: "Brilliant from first enquiry to last day",
    text: "I'd recommend Technique to anyone looking for proper trade training. Wendy and the office team were brilliant from first enquiry through to the last day on site.",
    course: "Total Industrial Electrical Maintenance 10",
  },
  {
    name: "David H.",
    rating: 5,
    title: "Tim is a star — fantastic tutor",
    text: "Tim is a star — fantastic tutor. Very patient and very clear at teaching us. The practical sessions were hands-on and the facilities are excellent.",
    course: "PLC 10",
  },
  {
    name: "Gary L.",
    rating: 5,
    title: "Kingsley was a great tutor",
    text: "Kingsley was a great tutor. Very knowledgeable and good at explaining points that seemed confusing in the handouts. Would definitely recommend.",
    course: "18th Edition Wiring Regulations",
  },
  {
    name: "Rachel S.",
    rating: 5,
    title: "Excellent instructor and knowledge",
    text: "Andy is a great tutor, I came into this course with previous experience performing EICRs. However Andy has definitely opened my eyes to coding observations and what is required by BS7671!",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Ben C.",
    rating: 5,
    title: "Good location and great instructor",
    text: "Good location, not hard to get to and good free parking. A lot to cover but explained well. Instructor knowledgeable and approachable to answer any questions.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Tom F.",
    rating: 5,
    title: "Intensive but worthwhile",
    text: "The course length is just about right. Mark did an excellent job at conveying the information and went into a more in-depth explanation of anything we were unsure about. Very intensive but works well.",
    course: "City & Guilds 2391-52",
  },
  {
    name: "Sarah J.",
    rating: 5,
    title: "Andy was very helpful",
    text: "Andy was very helpful with any question I had, especially when I had come from a non-electrician background. The course gave me real confidence.",
    course: "Total Electrical 20",
  },
  {
    name: "Mike D.",
    rating: 5,
    title: "A consummate gentleman and great tutor",
    text: "The course tutor is a consummate gentleman and is a good tutor. Very patient, knowledgeable and supportive throughout the entire training programme.",
    course: "F-Gas Regulations 5 Day",
  },
  {
    name: "Lee B.",
    rating: 5,
    title: "Top quality training and facilities",
    text: "Professional setup, knowledgeable tutors, and a calm, focused learning environment. Whether you're upskilling or starting out, the whole organisation feels geared toward doing things properly.",
    course: "Total Air Conditioning 10",
  },
  {
    name: "Emma W.",
    rating: 5,
    title: "Opened doors for my career",
    text: "The qualifications and practical focus I gained here have made a real difference to my job prospects. The hands-on approach and the quality of the teaching staff are what set this place apart.",
    course: "Domestic Electrical Installer",
  },
];
