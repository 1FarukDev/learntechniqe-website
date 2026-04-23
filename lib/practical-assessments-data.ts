import { client } from "@/lib/sanity/client";
import { practicalAssessmentCentresQuery } from "@/lib/queries/practical-assessments";

export type PracticalAssessmentItem = {
  slug: string;
  label: string;
  embedUrl?: string;
};

export type PracticalAssessmentCentre = {
  slug: string;
  title: string;
  shortName: string;
  heroImageUrl?: string;
  addressLines?: string[];
  assessments: PracticalAssessmentItem[];
};

type PracticalAssessmentCentreRow = {
  slug: string;
  title: string;
  shortName: string;
  heroImageUrl?: string;
  addressLines?: string[];
  assessments?: {
    slug?: string;
    label?: string;
    embedUrl?: string;
  }[];
};

async function fetchPracticalCentres(): Promise<PracticalAssessmentCentre[]> {
  const rows = await client.fetch<PracticalAssessmentCentreRow[]>(
    practicalAssessmentCentresQuery,
  );

  return rows
    .filter((row) => row.slug && row.title && row.shortName)
    .map((row) => ({
      slug: row.slug,
      title: row.title,
      shortName: row.shortName,
      heroImageUrl: row.heroImageUrl,
      addressLines: row.addressLines ?? [],
      assessments: (row.assessments ?? [])
        .filter(
          (item): item is { slug: string; label: string; embedUrl?: string } =>
            Boolean(item.slug && item.label),
        )
        .map((item) => ({
          slug: item.slug,
          label: item.label,
          embedUrl: item.embedUrl,
        })),
    }));
}

export async function getPracticalCentres(): Promise<PracticalAssessmentCentre[]> {
  return fetchPracticalCentres();
}

export async function getPracticalCentre(
  slug: string,
): Promise<PracticalAssessmentCentre | null> {
  const centres = await fetchPracticalCentres();
  return centres.find((centre) => centre.slug === slug) ?? null;
}

export async function getPracticalAssessment(
  centreSlug: string,
  assessmentSlug: string,
) {
  const centre = await getPracticalCentre(centreSlug);
  if (!centre) return null;
  const assessment =
    centre.assessments.find((item) => item.slug === assessmentSlug) ?? null;
  if (!assessment) return null;
  return { centre, assessment };
}
