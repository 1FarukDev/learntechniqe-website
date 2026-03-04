import React from "react";
import HeroSection from "../features/blog/hero";
import PostOfTheDay from "../features/blog/PostOfTheDay";
import Contact from "../features/homepage/contact";

function page() {
  return (
    <div>
      <HeroSection />
      <PostOfTheDay />
      <Contact />
    </div>
  );
}

export default page;
