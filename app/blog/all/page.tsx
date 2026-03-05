import AllBlogPosts from "@/app/features/blog/all/blogList";

import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import React from "react";

function page() {
  return (
    <main>
      <HeroSection title="Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026" />
      <AllBlogPosts />
      <Contact />
    </main>
  );
}

export default page;
