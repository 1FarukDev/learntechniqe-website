import AllBlogPosts from "@/app/features/blog/all/blogList";
import HeroSection from "@/app/features/blog/hero";
import Contact from "@/app/features/homepage/contact";
import React from "react";

function page() {
  return (
    <main>
      <HeroSection />
      <AllBlogPosts />
      <Contact />
    </main>
  );
}

export default page;
