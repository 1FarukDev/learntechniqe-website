import AdmZip from "adm-zip";

const MAX_FILES = 5_000;
const MAX_UNCOMPRESSED_BYTES = 200 * 1024 * 1024;

export interface ExtractedFile {
  /** Path within the package, using forward slashes, no leading slash. */
  relativePath: string;
  data: Buffer;
}

/**
 * Unzips a SCORM package, strips a single common top-level folder (if all
 * files share it), filters `..` path segments, and enforces size limits.
 */
export function extractScormZip(buffer: Buffer): {
  files: ExtractedFile[];
  manifestEntryHint: string | null;
} {
  const zip = new AdmZip(buffer);
  const raw = zip
    .getEntries()
    .filter(
      (e) =>
        !e.isDirectory &&
        !e.entryName.includes("..") &&
        !e.entryName.startsWith("/") &&
        !e.entryName.startsWith("\\")
    )
    .map((e) => ({
      name: e.entryName.replace(/\\/g, "/").replace(/^\/+/, ""),
      data: e.getData(),
    }));

  if (raw.length > MAX_FILES) {
    throw new Error(
      `Package has too many files (${raw.length}). Max is ${MAX_FILES}.`
    );
  }

  const total = raw.reduce((n, f) => n + f.data.length, 0);
  if (total > MAX_UNCOMPRESSED_BYTES) {
    throw new Error("Uncompressed package is too large (max 200 MB).");
  }

  const stripped = stripCommonFolder(raw.map((r) => r.name));

  const files: ExtractedFile[] = raw.map((r, i) => ({
    relativePath: stripped[i],
    data: r.data,
  }));

  let manifestEntryHint: string | null = null;
  const manifestEntry = files.find((f) =>
    /(^|\/)imsmanifest\.xml$/i.test(f.relativePath)
  );
  if (manifestEntry) {
    try {
      const xml = manifestEntry.data.toString("utf8");
      const href =
        xml.match(/<resource[^>]+(?:adlcp:)?href\s*=\s*["']([^"']+)["']/i)?.[1] ||
        xml.match(/<resource[^>]+href\s*=\s*["']([^"']+)["']/i)?.[1];
      if (href && !href.includes("..")) {
        manifestEntryHint = href.replace(/\\/g, "/").replace(/^\/+/, "");
      }
    } catch {
      /* ignore */
    }
  }

  return { files, manifestEntryHint };
}

/**
 * Strip leading folder segments shared by every path (e.g. one SCORM root
 * folder). Never strips the last segment — single-file zips stay valid.
 */
function stripCommonFolder(paths: string[]): string[] {
  const split = paths.map((p) => p.split("/").filter(Boolean));
  if (split.length === 0) return paths;
  const minLen = Math.min(...split.map((p) => p.length));
  let depth = 0;
  while (depth < minLen - 1) {
    const seg = split[0]![depth]!;
    if (!split.every((p) => p[depth] === seg)) break;
    depth++;
  }
  return split.map((parts) => parts.slice(depth).join("/"));
}

export function guessMime(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html; charset=utf-8";
  if (lower.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (lower.endsWith(".css")) return "text/css; charset=utf-8";
  if (lower.endsWith(".json")) return "application/json; charset=utf-8";
  if (lower.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".woff2")) return "font/woff2";
  if (lower.endsWith(".woff")) return "font/woff";
  if (lower.endsWith(".ttf")) return "font/ttf";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  return "application/octet-stream";
}
