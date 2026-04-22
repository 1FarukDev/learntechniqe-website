import { client } from "../sanity/client";

export async function getLegalDocumentPdf(slug: string) {
  return client.fetch(
    `*[_type == "legalDocument" && slug.current == $slug][0]{
      "pdfUrl": pdf.asset->url
    }`,
    { slug }
  );
}