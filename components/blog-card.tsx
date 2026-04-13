import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface BlogPost {
  id: number | string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string | StaticImageData;
  slug?: { current: string };
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "large" | "small";
  highlighted?: boolean;
  fluid?: boolean;
  /** No outline border — uses shadow only (e.g. dense grids where adjacent borders double up) */
  noBorder?: boolean;
  /** Use for remote legacy WordPress images when domain may be outside default patterns */
  imageUnoptimized?: boolean;
}

function BlogCard({
  post,
  variant = "small",
  highlighted = false,
  fluid = false,
  noBorder = false,
  imageUnoptimized = false,
}: BlogCardProps) {
  const fixedWidth = variant === "large" ? "w-100" : "w-75";
  const borderClasses = highlighted
    ? "border-2 border-[#1AABBA] shadow-sm"
    : noBorder
      ? "border-0 shadow-md"
      : "border border-gray-100 shadow-sm";

  const href = post.slug?.current
    ? `/blog/${post.slug.current}`
    : `/blog/${post.id}`;

  return (
    <div
      className={`bg-white rounded-md overflow-hidden shrink-0 flex flex-col ${borderClasses} ${
        fluid ? "w-full" : fixedWidth
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          variant === "large" ? "h-55" : variant === "small" ? "h-45" : "h-75"
        }`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={imageUnoptimized}
          placeholder={
            typeof post.image === "object" ? "blur" : undefined
          }
        />
      </div>

      <div
        className={`p-5 flex flex-col gap-2 ${noBorder ? "" : "flex-1"}`}
      >
        <h3
          className={`font-bold leading-snug text-black ${
            variant === "large" ? "text-lg" : "text-base"
          }`}
        >
          {post.title}
        </h3>

        <p className="text-xs text-[#9A9A9A] uppercase tracking-wide">
          BY {post.author} / {post.date}
        </p>

        <p className="text-sm font-medium text-[#14AE5C]">{post.category}</p>

        <div className="mt-auto pt-3">
          <Button
            asChild
            className={`hover:bg-[#0a5f63] text-white text-xs font-semibold tracking-widest px-8 rounded-md h-10.75 ${
              variant === "large" ? "bg-[#14AE5C]" : "bg-[#016068]"
            }`}
          >
            <Link href={href}>READ BLOG</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
