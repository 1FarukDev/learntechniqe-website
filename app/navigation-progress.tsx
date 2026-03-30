"use client";

import NextTopLoader from "nextjs-toploader";

export function NavigationProgress() {
  return (
    <NextTopLoader
      color="#E99D21"
      height={2}
      showSpinner={false}
      shadow="none"
      speed={200}
      crawlSpeed={120}
      easing="ease-in-out"
    />
  );
}
