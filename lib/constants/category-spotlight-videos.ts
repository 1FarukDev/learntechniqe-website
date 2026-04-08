/**
 * YouTube Shorts spotlight for trade category pages (/courses/plc, etc.).
 * IDs from share links: youtube.com/shorts/{id}
 */
export const CATEGORY_SPOTLIGHT_VIDEOS = {
  plc: {
    youtubeId: "8Dna8TVE75o",
    headline: "PLC training in action",
  },
  "aircon-refrigeration": {
    youtubeId: "pxACbzA5RYo",
    headline: "Air conditioning & refrigeration",
  },
  electrical: {
    youtubeId: "xqybvehrt8Q",
    headline: "Electrical training on the bench",
  },
} as const;

export type CategorySpotlightSlug = keyof typeof CATEGORY_SPOTLIGHT_VIDEOS;

export function categorySpotlightEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}
