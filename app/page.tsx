import Image from "next/image";
import Hero from "./features/homepage/hero";
import Stages from "./features/homepage/stages";
import TradeCourses from "./features/homepage/tradeCourses";
import Courses from "./features/homepage/courses";
import Location from "./features/homepage/location";
import Brochure from "./features/homepage/brochure";
import Ratings from "./features/homepage/ratings";
import Certification from "./features/homepage/certification";
import Discount from "./features/homepage/discount";
import Contact from "./features/homepage/contact";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stages />
      <TradeCourses />
      <Courses />
      <Location />
      <Brochure />
      <Ratings />
      <Certification />
      <Discount />
      <Contact /> 
    </div>
  );
}
