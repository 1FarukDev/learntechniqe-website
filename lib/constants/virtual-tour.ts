/**
 * Virtual tour iframe URL for the homepage “Our training centres” section (EyeSpy360).
 * Override in `.env.local` if needed:
 *   NEXT_PUBLIC_VIRTUAL_TOUR_EMBED_URL="https://..."
 */
const DEFAULT_VIRTUAL_TOUR_EMBED_URL =
  "https://eyespy360.vr-360-tour.com/e/Hq8BnWySkP8/e";

export function getVirtualTourEmbedUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VIRTUAL_TOUR_EMBED_URL?.trim();
  return fromEnv && fromEnv.length > 0
    ? fromEnv
    : DEFAULT_VIRTUAL_TOUR_EMBED_URL;
}
