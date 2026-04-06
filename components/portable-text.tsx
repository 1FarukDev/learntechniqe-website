// components/portable-text.tsx
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-black mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-black mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-black mt-6 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-black mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#016068] pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 space-y-1 text-sm text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#016068] underline hover:text-[#0E7377] transition"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-64 sm:h-80 my-6 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt ?? "Blog image"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

interface Props {
  value: any[];
}

function RichText({ value }: Props) {
  return (
    <div className="space-y-4">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}

export default RichText;