import React from "react";
import HeroSection from "./sections/heroSection";
import CoursesPackage from "./sections/coursesPackage";
import Session from "./sections/session";
import Contact from "../features/homepage/contact";

function page() {
  return (
    <main>
      <HeroSection />
      <CoursesPackage />
      <Session />
      <Contact />
    </main>
  );
}

export default page;
