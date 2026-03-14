import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Pathway } from "./PathwaysComparisonTable";

import CoursesImage from "@/app/assets/png/courses.jpg";
import SessionImage from "@/app/assets/png/session.jpg";
import TrainingImage from "@/app/assets/png/32743f1db038b2a1c51268ee3d04b3737c7bef67.jpg";
import CoursedetailsImage from "@/app/assets/png/coursedetails.jpg";
import CardImage from "@/app/assets/png/cardimage.png";

const PATHWAY_IMAGES: Record<string, typeof CoursesImage> = {
  courses: CoursesImage,
  session: SessionImage,
  training: TrainingImage,
  coursedetails: CoursedetailsImage,
  cardimage: CardImage,
};

interface PathwayCardProps {
  pathway: Pathway;
}

export function PathwayCard({ pathway }: PathwayCardProps) {
  const imageSrc =
    pathway.image && PATHWAY_IMAGES[pathway.image]
      ? PATHWAY_IMAGES[pathway.image]
      : CoursesImage;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={pathway.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 sm:p-8">
        <span className="inline-block px-3 py-1 bg-[#E99E20]/20 text-[#016068] text-xs font-semibold rounded-full mb-4 border border-[#E99E20]/40">
          {pathway.badge}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{pathway.title}</h3>
        <p className="text-gray-600 text-sm mb-6">{pathway.description}</p>
        {pathway.external ? (
          <Button asChild className="text-white rounded text-sm px-8 font-bold h-10 w-full bg-[#016068]">
            <a href={pathway.href} target="_blank" rel="noopener noreferrer">
              View Pathway
            </a>
          </Button>
        ) : (
          <Button asChild className="text-white rounded text-sm px-8 font-bold h-10 w-full bg-[#016068]">
            <Link href={pathway.href}>View Pathway</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
