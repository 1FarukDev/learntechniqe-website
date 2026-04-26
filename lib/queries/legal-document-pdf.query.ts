export const LEGAL_DOCUMENT_PDF_QUERY = `*[_type == "legalDocument" && slug.current == $slug][0]{
  "pdfUrl": pdf.asset->url
}`;
