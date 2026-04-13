/**
 * Reads WordPress WXR export and writes lib/data/legacy-wordpress-blogs.json
 * Run: node scripts/generate-legacy-wp-blogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const xmlPath = path.join(root, "techniquelearningsolutions.WordPress.2026-04-13.xml");
const outPath = path.join(root, "lib", "data", "legacy-wordpress-blogs.json");

const xml = fs.readFileSync(xmlPath, "utf8");
const chunks = xml.split("<item>").slice(1);
const posts = [];

for (const chunk of chunks) {
  const item = chunk.split("</item>")[0];
  const pt = item.match(/<wp:post_type><!\[CDATA\[([^\]]*)\]\]><\/wp:post_type>/);
  const st = item.match(/<wp:status><!\[CDATA\[([^\]]*)\]\]><\/wp:status>/);
  if (!pt || pt[1] !== "post") continue;
  if (!st || st[1] !== "publish") continue;

  const nameM = item.match(/<wp:post_name><!\[CDATA\[([^\]]*)\]\]><\/wp:post_name>/);
  const slug = nameM ? nameM[1].trim() : "";
  if (!slug) continue;

  const titleM = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
  const title = titleM ? titleM[1].replace(/\s+/g, " ").trim() : "";

  const dateM = item.match(/<wp:post_date><!\[CDATA\[([^\]]*)\]\]><\/wp:post_date>/);
  const date = dateM ? dateM[1].trim() : "";

  const creatorM = item.match(/<dc:creator><!\[CDATA\[([^\]]*)\]\]><\/dc:creator>/);
  const author = creatorM ? creatorM[1].trim() : "";

  const catM = item.match(
    /<category domain="category" nicename="[^"]*"><!\[CDATA\[([^\]]*)\]\]><\/category>/,
  );
  const category = catM ? catM[1].trim() : "Uncategorized";

  const contentM = item.match(
    /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/,
  );
  const html = contentM ? contentM[1] : "";

  posts.push({ slug, title, date, author, category, html });
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(posts), "utf8");
console.log("Wrote", posts.length, "posts to", path.relative(root, outPath));
