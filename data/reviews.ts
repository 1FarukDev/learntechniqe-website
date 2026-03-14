import type { StaticImageData } from "next/image";
import FirstImage from "@/app/assets/png/review1.png";
import SecondImage from "@/app/assets/png/review2.png";
import ThirdImage from "@/app/assets/png/review3.png";
import FourthImage from "@/app/assets/png/review4.png";
import MarkImage from "@/app/assets/team/mark.png";
import SimonImage from "@/app/assets/team/simon.png";
import AndieImage from "@/app/assets/tutor/andie.png";
import JoinImage from "@/app/assets/team/join.jpg";

/**
 * Review shape - compatible with Sanity CMS.
 * When connected to Sanity: name, image, rating, title, text, age will come from the API.
 */
export interface Review {
  _id?: string;
  name: string;
  image: StaticImageData | string;
  rating: number;
  title: string;
  text: string;
  age?: string | number;
}

/** Default reviews - replace with Sanity fetch when ready */
export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Michael",
    image: FirstImage,
    rating: 5,
    title: "Amazing Classes",
    text: "What can I say, will recommend this course to all my work colleagues. Also Wendy was a star from start to finish.",
    age: "32",
  },
  {
    name: "Max",
    image: SecondImage,
    rating: 5,
    title: "Great Learning Experience",
    text: "The course structure was excellent and easy to follow. Highly recommend to anyone wanting to level up their skills.",
    age: "29",
  },
  {
    name: "Sophia",
    image: ThirdImage,
    rating: 5,
    title: "Supportive Instructors",
    text: "The instructors were incredibly helpful and supportive throughout the entire journey.",
    age: "26",
  },
  {
    name: "Daniel",
    image: FourthImage,
    rating: 5,
    title: "Worth Every Penny",
    text: "Excellent content and real-world examples. I feel much more confident after completing this course.",
    age: "35",
  },
  {
    name: "James",
    image: MarkImage,
    rating: 5,
    title: "Best Training I've Had",
    text: "Professional setup, knowledgeable tutors, and a great learning environment. Couldn't ask for more.",
    age: "41",
  },
  {
    name: "Emma",
    image: SimonImage,
    rating: 5,
    title: "Career Changing",
    text: "This course has completely changed my career path. The hands-on approach made all the difference.",
    age: "28",
  },
  {
    name: "David",
    image: AndieImage,
    rating: 5,
    title: "Highly Recommended",
    text: "From booking to completion, everything was smooth. The team really cares about your success.",
    age: "38",
  },
  {
    name: "Sarah",
    image: JoinImage,
    rating: 5,
    title: "Exceeded Expectations",
    text: "I came in with no experience and left feeling confident. The support and materials were top notch.",
    age: "33",
  },
];
