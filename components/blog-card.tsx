import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number | string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug?: { current: string };
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "large" | "small";
  highlighted?: boolean;
  fluid?: boolean;
}

function BlogCard({
  post,
  variant = "small",
  highlighted = false,
  fluid = false,
}: BlogCardProps) {
  const fixedWidth = variant === "large" ? "w-100" : "w-75";
  const router = useRouter();
  return (
    <div
      className={`bg-white rounded-md overflow-hidden shadow-sm border shrink-0 flex flex-col ${
        highlighted ? "border-[#1AABBA] border-2" : "border-gray-100"
      } ${fluid ? "w-full" : fixedWidth}`}
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
        />
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
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
            className={`hover:bg-[#0a5f63] text-white text-xs font-semibold tracking-widest px-8 rounded-md h-10.75 ${
              variant === "large" ? "bg-[#14AE5C]" : "bg-[#016068]"
            }`}
            onClick={() => {
              const href = post.slug ? `/blog/${post.slug.current}` : `/blog/${post.id}`;
              router.push(href);
            }}
          >
            READ BLOG
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
