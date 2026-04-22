import { notFound } from "next/navigation";

/**
 * Visiting `/404` renders the global `not-found.tsx` UI with HTTP 404.
 * Middleware redirects disabled e-learning routes here when the platform is off.
 */
export default function Explicit404Page() {
  notFound();
}
