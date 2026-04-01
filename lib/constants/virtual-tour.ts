/**
 * Virtual tour video shown from the homepage “Our training centres” section.
 * Override in `.env.local` if needed:
 *   NEXT_PUBLIC_VIRTUAL_TOUR_EMBED_URL="https://www.youtube.com/embed/YOUR_VIDEO_ID"
 * (Vimeo / other iframe embed URLs work the same way.)
 */
const DEFAULT_VIRTUAL_TOUR_EMBED_URL =
  "https://www.youtube.com/embed/WUdt1QqlI7Q";

export function getVirtualTourEmbedUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VIRTUAL_TOUR_EMBED_URL?.trim();
  return fromEnv && fromEnv.length > 0
    ? fromEnv
    : DEFAULT_VIRTUAL_TOUR_EMBED_URL;
}
