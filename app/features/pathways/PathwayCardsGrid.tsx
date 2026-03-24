import React from "react";
import { PathwayCard } from "./PathwayCard";
import type { Pathway } from "./PathwaysComparisonTable";

interface PathwayCardsGridProps {
  pathways: Pathway[];
}

export function PathwayCardsGrid({ pathways }: PathwayCardsGridProps) {
  return (
    <section className="bg-[#E0ECED] py-12 sm:py-20 md:px-0 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((pathway) => (
            <PathwayCard
              key={pathway.pathway?.slug ?? pathway.href}
              pathway={pathway}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
