/**
 * First <img src="..."> from WordPress HTML export (for blog cards).
 * Returns an absolute https URL when possible.
 */
export function extractFirstImageUrlFromHtml(html: string): string | null {
  if (!html || typeof html !== "string") return null;

  const imgTag = html.match(/<img\b[^>]*>/i);
  if (!imgTag) return null;

  const srcMatch = imgTag[0].match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!srcMatch?.[1]) return null;

  let src = srcMatch[1].trim().replace(/&amp;/g, "&");
  if (!src || src.startsWith("data:")) return null;

  if (src.startsWith("//")) {
    return `https:${src}`;
  }
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  if (src.startsWith("/")) {
    return `https://www.learntechnique.com${src}`;
  }
  return src;
}
