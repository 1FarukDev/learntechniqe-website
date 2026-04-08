import React from "react";
import NextImage from "next/image";
import BackgroundImage from "@/app/assets/png/courses.jpg";

interface HeroSectionProps {
  backgroundImage?: { src?: string; blurDataURL?: string; width?: number; height?: number } | string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  height?: string;
  gradientFrom?: string;
  gradientTo?: string;
  /** Bottom curve fill — match the next section’s background to avoid a white “slice” above grey blocks */
  waveColor?: string;
}

function HeroSection({
  backgroundImage = BackgroundImage,
  title = (
    <>
      Complete Guide to Air Conditioning <br className="hidden sm:block" />
      Training: Start Your HVAC Career in 2026
    </>
  ),
  height = "h-80 sm:h-96 md:h-120",
  description,
  gradientFrom = "#00000061",
  gradientTo = "#016068",
  waveColor = "#ffffff",
}: HeroSectionProps) {
  const isStaticImport = typeof backgroundImage !== "string" && "src" in backgroundImage;

  return (
    <section className={`relative z-0 w-full ${height} overflow-hidden`}>
      <NextImage
        src={isStaticImport ? backgroundImage as typeof BackgroundImage : (typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src ?? "")}
        alt=""
        aria-hidden="true"
        fill
        className="absolute inset-0 object-cover object-top z-0"
        sizes="100vw"
        quality={80}
        priority
        {...(isStaticImport ? { placeholder: "blur" } : {})}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
        }}
      />

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-6 pb-16 sm:pb-20 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide md:mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        </div>
      </div>

      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 md:h-40 z-30 block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q720,160 1440,0 L1440,160 L0,160 Z"
          fill={waveColor}
        />
      </svg>
    </section>
  );
}

export default HeroSection;