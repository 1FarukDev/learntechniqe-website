/** Collapse whitespace so template / hand-written GROQ matches reliably. */
export function normalizeGroq(q: string): string {
  return q.replace(/\s+/g, " ").trim();
}
