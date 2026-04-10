import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Ampersands in course titles can break Zapier / downstream parsers; use plain "and" in webhook payloads. */
export function formatCourseNameForZapier(name: string): string {
  return name.replaceAll("&", "and")
}
