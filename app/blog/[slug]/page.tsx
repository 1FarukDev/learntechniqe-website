import BlogDetailPage from "@/app/features/blog/BlogDetails";
import HeroSection from "@/app/features/blog/hero";
import Contact from "@/app/features/homepage/contact";
import React from "react";

function page() {
  return (
    <>
      <HeroSection />
      <BlogDetailPage />
      <Contact />
    </>
  );
}

export default page;
