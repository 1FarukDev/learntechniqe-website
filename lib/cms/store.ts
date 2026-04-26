import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { getLocalCmsDataPath } from "./config";

export type SanityDoc = Record<string, unknown> & {
  _id?: string;
  _type?: string;
};

export type LocalCmsStore = {
  version: 1;
  exportedAt?: string;
  documents: SanityDoc[];
};

export function storeAbsolutePath(): string {
  const p = getLocalCmsDataPath();
  return path.isAbsolute(p) ? p : path.join(process.cwd(), p);
}

export async function readLocalCmsStore(): Promise<LocalCmsStore> {
  const fp = storeAbsolutePath();
  const raw = await readFile(fp, "utf8");
  const parsed = JSON.parse(raw) as LocalCmsStore;
  if (!Array.isArray(parsed.documents)) {
    throw new Error(
      `Invalid local CMS store at ${fp}: expected { version, documents[] }`,
    );
  }
  return parsed;
}

export async function writeLocalCmsStore(store: LocalCmsStore): Promise<void> {
  const fp = storeAbsolutePath();
  await mkdir(path.dirname(fp), { recursive: true });
  const body = `${JSON.stringify(store, null, 2)}\n`;
  const tmp = `${fp}.tmp`;
  await writeFile(tmp, body, "utf8");
  await rename(tmp, fp);
}
