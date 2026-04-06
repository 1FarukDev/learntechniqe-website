// app/blog/page.tsx
import AllBlogPosts from "@/app/features/blog/all/blogList";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { client } from "@/lib/sanity/client";
import { ALL_BLOGS_QUERY } from "@/lib/queries/blog";
import { BlogPost } from "@/lib/types/blog";
import React from "react";

async function page() {
  const posts = await client.fetch<BlogPost[]>(ALL_BLOGS_QUERY);

  return (
    <main>
      <HeroSection title="Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026" />
      <div className="-mt-10">
        <AllBlogPosts posts={posts} />
      </div>
      <Contact />
    </main>
  );
}

export default page;