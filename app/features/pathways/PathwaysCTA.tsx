import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PathwaysCTAProps {
  title: string;
  headline: string;
  description: string;
  benefits: string[];
  buttonText: string;
  pathwayHref: string;
}

export function PathwaysCTA({
  title,
  headline,
  description,
  benefits,
  buttonText,
  pathwayHref,
}: PathwaysCTAProps) {
  return (
    <section className="relative py-15 sm:py-25 overflow-hidden md:px-0 px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, #016068 0%, #014757 50%, #001431 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[#016068]/95" />
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 opacity-90">{title}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{headline}</h3>
        <p className="text-lg text-white/90 mb-6">{description}</p>
        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-[#E99E20]">✔</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#E99E20] hover:bg-[#d88e10]">
          <Link href={pathwayHref}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
