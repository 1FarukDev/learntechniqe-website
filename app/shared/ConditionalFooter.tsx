"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the main site footer on the learner portal (/learn/*), which provides
 * its own minimal chrome.
 */
export function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/learn") || pathname?.startsWith("/admin"))
    return null;
  return <>{children}</>;
}
