/** Strip tags and decode a few common entities for comparing heading text to title. */
function htmlFragmentToPlainText(fragment: string): string {
  return fragment
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * WordPress exports often repeat the post title as the first <h1> while the Next
 * page already renders the title — remove that duplicate when it matches.
 */
export function sanitizeLegacyBlogBodyHtml(html: string, title: string): string {
  const trimmed = html.trimStart();
  const m = trimmed.match(/^<h1\b[^>]*>([\s\S]*?)<\/h1>\s*/i);
  if (!m) return html.trim();

  const innerPlain = htmlFragmentToPlainText(m[1]);
  const titlePlain = htmlFragmentToPlainText(title);
  if (
    innerPlain.length > 0 &&
    innerPlain.toLowerCase() === titlePlain.toLowerCase()
  ) {
    return trimmed.slice(m[0].length).trim();
  }

  return html.trim();
}
