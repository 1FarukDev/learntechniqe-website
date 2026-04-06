// lib/cademy.ts

import { CourseDate } from "@/lib/types/course";

function parseDateTime(raw: string): {
  month: string;
  day: number;
  display: string;
} {
  // raw looks like: "3/23/26, 8:30 AM GMT" or "4/13/26, 8:30 AM GMT+1"
  // Convert M/D/YY to a parseable format
  const cleaned = raw
    .trim()
    .replace(/GMT\+\d+/, "UTC")
    .replace("GMT", "UTC");
  const d = new Date(cleaned);

  if (isNaN(d.getTime())) {
    // fallback: extract month/day manually from "3/23/26"
    const match = raw.match(/(\d+)\/(\d+)\/(\d+)/);
    if (match) {
      const month = parseInt(match[1]);
      const day = parseInt(match[2]);
      const monthNames = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      return {
        month: monthNames[month - 1] || "N/A",
        day,
        display: raw.trim(),
      };
    }
    return { month: "N/A", day: 0, display: raw.trim() };
  }

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return {
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    display: raw.trim(),
  };
}

export async function getCademyDates(
  embedUrl: string,
  directUrl: string,
): Promise<CourseDate[]> {
  try {
    const res = await fetch(embedUrl, {
      next: { revalidate: 3600 }, // cache for 1 hour
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NextJS/14)",
      },
    });

    if (!res.ok) return [];

    const html = await res.text();
    const dates: CourseDate[] = [];


    // Split into list items — each date block starts with a month/day pattern
    // The HTML structure from Cademy looks like:
    // * Mar23\n  From: ...\n  To: ...\n  N spaces left\n  Delivered In-Person in LocationLocation\n  £XXX+ VAT\n  Book
    const blocks = html.split(/\n\*\s+/).slice(1); // remove first empty element

    for (const block of blocks) {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      // Extract From
      const fromLine = lines.find((l) => l.startsWith("From:"));
      // Extract To
      const toLine = lines.find((l) => l.startsWith("To:"));
      // Extract spaces
      const spacesLine = lines.find((l) => l.includes("spaces left"));
      // Extract location — "Delivered In-Person in Clay CrossClay Cross" or "Scotland"
      const locationLine = lines.find((l) =>
        l.startsWith("Delivered In-Person in"),
      );
      // Extract price
      const priceLine = lines.find((l) => l.startsWith("£"));

      if (!fromLine || !toLine) continue;

      const fromRaw = fromLine.replace("From:", "").trim();
      const toRaw = toLine.replace("To:", "").trim();

      const from = parseDateTime(fromRaw);
      const to = parseDateTime(toRaw);

      const spacesMatch = spacesLine?.match(/(\d+)\s+spaces left/);
      const spaces = spacesMatch ? parseInt(spacesMatch[1]) : null;

      // Location is duplicated in Cademy HTML e.g. "Clay CrossClay Cross" → "Clay Cross"
      let location = "TBC";
      if (locationLine) {
        const rawLocation = locationLine
          .replace("Delivered In-Person in", "")
          .trim();
        // Remove duplication — "Clay CrossClay Cross" → "Clay Cross"
        const half = rawLocation.slice(0, rawLocation.length / 2);
        location = half.trim() || rawLocation;
      }

      const price = priceLine?.replace("+ VAT", "+ VAT").trim() ?? "Contact us";

      dates.push({
        month: from.month,
        day: from.day,
        from: from.display,
        to: to.display,
        spaces,
        location,
        price,
        bookUrl: directUrl,
      });
    }

    return dates;
  } catch (err) {
    console.error("Failed to fetch Cademy dates:", err);
    return [];
  }
}
