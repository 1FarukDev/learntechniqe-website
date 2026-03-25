import React from "react";
import CourseCard from "@/components/course-card";
import type { CourseCardData } from "@/lib/course-categories";
import type { Pathway } from "./PathwaysComparisonTable";

interface PathwayCardsGridProps {
  pathways: Pathway[];
}

function extractText(val: unknown): string | null {
  if (typeof val === "string") return val;
  if (val && typeof val === "object" && "children" in val) {
    const children = (val as any).children;
    if (Array.isArray(children))
      return children.map((c: any) => c.text ?? "").join("");
  }
  return null;
}

function toCardData(p: Pathway): CourseCardData {
  const pw = p.pathway;
  const price = pw?.priceIncVat
    ? typeof pw.priceIncVat === "number"
      ? `£${pw.priceIncVat.toLocaleString()}`
      : String(pw.priceIncVat)
    : null;

  const desc =
    extractText((pw as any)?.description) ??
    extractText(p.description) ??
    null;

  return {
    title: pw?.title ?? p.title ?? "Pathway",
    slug: pw?.slug ?? p.href?.replace(/^\/pathways\//, "") ?? "#",
    price,
    duration: pw?.duration ?? null,
    description: desc,
    heroImage: pw?.heroImage ?? null,
    tags: p.badge ? [{ label: p.badge, color: "#016068" }] : null,
  };
}

export function PathwayCardsGrid({ pathways }: PathwayCardsGridProps) {
  return (
    <section className="bg-[#F5F5F5] py-12 sm:py-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {pathways.map((pathway) => {
            const card = toCardData(pathway);
            return (
              <div
                key={card.slug}
                className="snap-start shrink-0 w-[max(220px,min(260px,calc(100vw-56px)))] sm:w-[260px] md:w-0 md:min-w-0 md:flex-1"
              >
                <CourseCard
                  course={card}
                  hrefPrefix={pathway.external ? "" : "/pathways"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
