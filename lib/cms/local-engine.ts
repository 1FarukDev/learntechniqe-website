import { urlFor } from "@/lib/sanity/image";
import {
  courseBySlugQuery,
  courseCardsQuery,
  coursesQuery,
} from "@/lib/queries/courses";
import {
  BLOG_BY_SLUG_QUERY,
  BLOG_CARDS_BY_SLUGS_QUERY,
  BLOG_SLUGS_FOR_SITEMAP_QUERY,
  RECENT_BLOGS_QUERY,
  RELATED_BLOGS_QUERY,
  SANITY_BLOG_INDEX_QUERY,
} from "@/lib/queries/blog";
import { CAMPAIGN_BANNER_QUERY } from "@/lib/queries/campaignBanner";
import { CERTIFICATION_QUERY } from "@/lib/queries/certification";
import { LEGAL_DOCUMENT_PDF_QUERY } from "@/lib/queries/legal-document-pdf.query";
import { headerQuery } from "@/lib/queries/navigation";
import {
  PATHWAYS_CALC_QUERY,
  PATHWAY_DETAIL_QUERY,
  PATHWAYS_PAGE_QUERY,
  PATHWAYS_QUERY,
} from "@/lib/queries/pathway";
import { practicalAssessmentCentresQuery } from "@/lib/queries/practical-assessments";
import { resolveMenuItemHref } from "./header-href";
import { normalizeGroq } from "./normalize-groq";
import { readLocalCmsStore, type SanityDoc } from "./store";

type DocMap = Map<string, SanityDoc>;

function slugCurrent(doc: SanityDoc): string | undefined {
  const s = doc.slug;
  if (s && typeof s === "object" && s !== null && "current" in s) {
    const c = (s as { current?: string }).current;
    return typeof c === "string" ? c : undefined;
  }
  return undefined;
}

function indexDocuments(docs: SanityDoc[]): DocMap {
  const m = new Map<string, SanityDoc>();
  for (const d of docs) {
    if (d._id && typeof d._id === "string") m.set(d._id, d);
  }
  return m;
}

function assetFieldToUrl(field: unknown): string | undefined {
  if (!field || typeof field !== "object") return undefined;
  const f = field as Record<string, unknown>;
  const asset = f.asset;
  if (asset && typeof asset === "object") {
    const a = asset as Record<string, unknown>;
    if (typeof a.url === "string") return a.url;
  }
  try {
    return urlFor(field as Parameters<typeof urlFor>[0]).url() ?? undefined;
  } catch {
    return undefined;
  }
}

function portableFirstSnippet(description: unknown): string | null {
  if (description == null) return null;
  if (typeof description === "string") return description;
  if (!Array.isArray(description) || description.length === 0) return null;
  const block = description[0];
  if (typeof block === "string") return block;
  if (block && typeof block === "object" && "children" in block) {
    const ch = (block as { children?: { text?: string }[] }).children;
    if (Array.isArray(ch)) {
      const t = ch.map((c) => c.text ?? "").join(" ").trim();
      return t.length > 0 ? t : null;
    }
  }
  return null;
}

function mapTags(raw: unknown, byId: DocMap): { label: string; color: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { label: string; color: string }[] = [];
  for (const t of raw) {
    if (!t || typeof t !== "object") continue;
    const o = t as Record<string, unknown>;
    if (typeof o.label === "string" && typeof o.color === "string") {
      out.push({ label: o.label, color: o.color });
      continue;
    }
    const ref = o._ref;
    if (typeof ref === "string") {
      const doc = byId.get(ref);
      if (
        doc &&
        typeof doc.label === "string" &&
        typeof doc.color === "string"
      ) {
        out.push({ label: doc.label, color: doc.color });
      }
    }
  }
  return out;
}

function projectQualifications(raw: unknown): unknown[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((q) => {
    if (!q || typeof q !== "object") return q;
    const row = { ...(q as Record<string, unknown>) };
    const logo = row.accreditationLogo;
    if (logo && typeof logo === "object") {
      const url = assetFieldToUrl(logo);
      if (url) row.accreditationLogo = url;
    }
    return row;
  });
}

function projectCourseListItem(c: SanityDoc): Record<string, unknown> {
  return {
    title: c.title,
    slug: slugCurrent(c),
    price: c.price ?? null,
    heroImage: c.heroImage ?? null,
    tags: c.tags ?? null,
    description: c.description ?? null,
    summary: c.summary ?? null,
    duration: c.duration ?? null,
  };
}

function projectCourseCard(c: SanityDoc, byId: DocMap): Record<string, unknown> {
  return {
    title: c.title,
    slug: slugCurrent(c),
    price: c.price ?? null,
    duration: c.duration ?? null,
    summary: c.summary ?? null,
    description: portableFirstSnippet(c.description),
    heroImage: assetFieldToUrl(c.heroImage) ?? null,
    tags: mapTags(c.tags, byId),
  };
}

function projectCourseDetail(c: SanityDoc): Record<string, unknown> {
  return {
    title: c.title,
    slug: slugCurrent(c),
    tags: c.tags ?? null,
    heroImage: c.heroImage ?? null,
    price: c.price ?? null,
    originalPrice: c.originalPrice ?? null,
    pricingTagline: c.pricingTagline ?? null,
    description: c.description ?? null,
    summary: c.summary ?? null,
    requestOverviewLink: c.requestOverviewLink ?? null,
    qualifications: projectQualifications(c.qualifications),
    duration: c.duration ?? null,
    durationNote: c.durationNote ?? null,
    durationNoteLink: c.durationNoteLink ?? null,
    detailsSummary: c.detailsSummary ?? null,
    courseGoals: c.courseGoals ?? null,
    entryRequirements: c.entryRequirements ?? null,
    syllabus: c.syllabus ?? null,
    prerequisites: c.prerequisites ?? null,
    showAccreditation: c.showAccreditation ?? null,
    completionRewards: c.completionRewards ?? null,
    cademyEmbedUrl: c.cademyEmbedUrl ?? null,
    cademyDirectUrl: c.cademyDirectUrl ?? null,
    courseReviewId: c.courseReviewId ?? null,
    dates: c.dates ?? null,
    bookASession: c.bookASession ?? null,
    showPracticalAssessmentBanner: c.showPracticalAssessmentBanner ?? null,
  };
}

function projectPathwayDetail(p: SanityDoc): Record<string, unknown> {
  return {
    title: p.title,
    slug: slugCurrent(p),
    tags: p.tags ?? null,
    heroImage: p.heroImage ?? null,
    price: p.price ?? null,
    originalPrice: p.originalPrice ?? null,
    pricingTagline: p.pricingTagline ?? null,
    description: p.description ?? null,
    requestOverviewLink: p.requestOverviewLink ?? null,
    qualifications: projectQualifications(p.qualifications),
    duration: p.duration ?? null,
    durationNote: p.durationNote ?? null,
    durationNoteLink: p.durationNoteLink ?? null,
    detailsSummary: p.detailsSummary ?? null,
    courseGoals: p.courseGoals ?? null,
    entryRequirements: p.entryRequirements ?? null,
    syllabus: p.syllabus ?? null,
    prerequisites: p.prerequisites ?? null,
    completionRewards: p.completionRewards ?? null,
    cademyEmbedUrl: p.cademyEmbedUrl ?? null,
    cademyDirectUrl: p.cademyDirectUrl ?? null,
    dates: p.dates ?? null,
    deposit: p.deposit ?? null,
    paymentPlan: p.paymentPlan ?? null,
    priceIncVat: p.priceIncVat ?? null,
    priceExVat: p.priceExVat ?? null,
    monthlyPayment: p.monthlyPayment ?? null,
    monthlyInstalment: p.monthlyInstalment ?? null,
    instalments: p.instalments ?? null,
  };
}

function projectPathwayListItem(p: SanityDoc): Record<string, unknown> {
  return {
    title: p.title,
    slug: slugCurrent(p),
    price: p.price ?? null,
    heroImage: p.heroImage ?? null,
    tags: p.tags ?? null,
    description: p.description ?? null,
    duration: p.duration ?? null,
  };
}

function projectPathwayCalc(p: SanityDoc): Record<string, unknown> | null {
  if (p.priceIncVat === undefined || p.priceIncVat === null) return null;
  return {
    title: p.title,
    slug: slugCurrent(p),
    priceIncVat: p.priceIncVat,
    deposit: p.deposit ?? null,
    paymentPlan: p.paymentPlan ?? null,
    monthlyInstalment: p.monthlyInstalment ?? null,
    instalments: p.instalments ?? null,
  };
}

function pathwayJoinedSummary(
  pd: SanityDoc | undefined,
): Record<string, unknown> | null {
  if (!pd) return null;
  return {
    title: pd.title,
    slug: slugCurrent(pd),
    heroImage: assetFieldToUrl(pd.heroImage) ?? null,
    description: portableFirstSnippet(pd.description),
    price: pd.price ?? null,
    priceIncVat: pd.priceIncVat ?? null,
    eligibility: pd.eligibility ?? null,
    attendance: pd.attendance ?? null,
    duration: pd.duration ?? null,
    location: pd.location ?? null,
    paymentPlan: pd.paymentPlan ?? null,
    deposit: pd.deposit ?? null,
    monthlyPayment: pd.monthlyPayment ?? null,
    monthlyInstalment: pd.monthlyInstalment ?? null,
    instalments: pd.instalments ?? null,
    priceExVat: pd.priceExVat ?? null,
    exams: pd.exams ?? null,
  };
}

function deref(byId: DocMap, ref: unknown): SanityDoc | undefined {
  if (!ref || typeof ref !== "object") return undefined;
  const r = (ref as { _ref?: string })._ref;
  if (typeof r !== "string") return undefined;
  return byId.get(r);
}

function projectHeader(doc: SanityDoc | undefined, byId: DocMap) {
  if (!doc) return null;
  const navLinks = Array.isArray(doc.navLinks)
    ? [...doc.navLinks].sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
    : [];
  const megaMenuColumns = Array.isArray(doc.megaMenuColumns)
    ? [...doc.megaMenuColumns].sort(
        (a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0),
      )
    : [];
  const footer = doc.megaMenuFooter as
    | { links?: unknown[]; socialLinks?: unknown[] }
    | undefined;
  return {
    navLinks: navLinks.map((l: any) => ({
      label: l.label,
      href: l.href,
    })),
    megaMenuColumns: megaMenuColumns.map((col: any) => ({
      title: col.title,
      description: col.description,
      cardColor: col.cardColor,
      subcategories: (col.subcategories ?? []).map((sub: any) => ({
        label: sub.label,
        items: (sub.items ?? []).map((item: any) => ({
          label: item.label,
          href: resolveMenuItemHref(item, byId),
        })),
      })),
    })),
    megaMenuFooter: {
      links: Array.isArray(footer?.links)
        ? [...footer.links]
            .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((x: any) => ({ label: x.label, href: x.href }))
        : [],
      socialLinks: Array.isArray(footer?.socialLinks)
        ? [...footer.socialLinks]
            .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((x: any) => ({ platform: x.platform, href: x.href }))
        : [],
    },
  };
}

function projectPathwaysPage(doc: SanityDoc | undefined, byId: DocMap) {
  if (!doc) return null;
  const pathways = Array.isArray(doc.pathways) ? doc.pathways : [];
  return {
    _id: doc._id,
    title: doc.title,
    hero: doc.hero,
    comparison: doc.comparison,
    process: doc.process,
    cta: doc.cta,
    calculator: doc.calculator,
    pathways: pathways.map((row: any) => {
      const pathwayDoc = deref(byId, row.pathway);
      return {
        badge: row.badge,
        href: row.href,
        external: row.external,
        pathway: pathwayJoinedSummary(pathwayDoc),
      };
    }),
  };
}

function projectPracticalCentres(docs: SanityDoc[]): unknown[] {
  const rows = docs
    .filter((d) => d._type === "practicalAssessmentCentre" && d.isActive === true)
    .map((d) => {
      const assessments = Array.isArray(d.assessments)
        ? d.assessments
            .filter((a: any) => a.isActive !== false)
            .map((a: any) => ({
              label: a.label,
              slug: slugCurrent(a as SanityDoc),
              embedUrl: a.embedUrl,
            }))
        : [];
      return {
        title: d.title,
        shortName: d.shortName,
        slug: slugCurrent(d),
        heroImageUrl: assetFieldToUrl(d.heroImage),
        addressLines: d.addressLines,
        assessments,
        order: typeof d.order === "number" ? d.order : 0,
      };
    });
  rows.sort((a: any, b: any) => {
    if (a.order !== b.order) return a.order - b.order;
    return String(a.title).localeCompare(String(b.title));
  });
  return rows.map(({ order: _o, ...rest }: any) => rest);
}

function projectBlogCard(p: SanityDoc): Record<string, unknown> {
  return {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    author: p.author,
    date: p.date,
    category: p.category,
    coverImage: p.coverImage,
    highlighted: p.highlighted,
  };
}

type Handler = (
  docs: SanityDoc[],
  byId: DocMap,
  params: Record<string, unknown> | undefined,
) => unknown;

function buildRegistry(): Map<string, Handler> {
  const m = new Map<string, Handler>();

  m.set(normalizeGroq(coursesQuery), (docs) => {
    const courses = docs
      .filter((d) => d._type === "course")
      .sort((a, b) =>
        String(a.title ?? "").localeCompare(String(b.title ?? "")),
      );
    return courses.map(projectCourseListItem);
  });

  m.set(normalizeGroq(courseCardsQuery), (docs, byId) => {
    const courses = docs
      .filter((d) => d._type === "course")
      .sort((a, b) =>
        String(a.title ?? "").localeCompare(String(b.title ?? "")),
      );
    return courses.map((c) => projectCourseCard(c, byId));
  });

  m.set(normalizeGroq(courseBySlugQuery), (docs, _byId, params) => {
    const slug = params?.slug;
    if (typeof slug !== "string") return null;
    const c = docs.find(
      (d) => d._type === "course" && slugCurrent(d) === slug,
    );
    return c ? projectCourseDetail(c) : null;
  });

  m.set(normalizeGroq(headerQuery), (docs, byId) => {
    const header = docs.find((d) => d._type === "header");
    return projectHeader(header, byId);
  });

  m.set(normalizeGroq(PATHWAYS_QUERY), (docs) => {
    return docs
      .filter((d) => d._type === "pathwayDetail")
      .sort((a, b) =>
        String(a.title ?? "").localeCompare(String(b.title ?? "")),
      )
      .map(projectPathwayListItem);
  });

  m.set(normalizeGroq(PATHWAYS_CALC_QUERY), (docs) => {
    return docs
      .filter((d) => d._type === "pathwayDetail")
      .map(projectPathwayCalc)
      .filter(Boolean)
      .sort((a: any, b: any) =>
        String(a.title ?? "").localeCompare(String(b.title ?? "")),
      );
  });

  m.set(normalizeGroq(PATHWAY_DETAIL_QUERY), (docs, _byId, params) => {
    const slug = params?.slug;
    if (typeof slug !== "string") return null;
    const p = docs.find(
      (d) => d._type === "pathwayDetail" && slugCurrent(d) === slug,
    );
    return p ? projectPathwayDetail(p) : null;
  });

  m.set(normalizeGroq(PATHWAYS_PAGE_QUERY), (docs, byId) => {
    const page = docs.find((d) => d._type === "pathwaysPage");
    return projectPathwaysPage(page, byId);
  });

  m.set(normalizeGroq(practicalAssessmentCentresQuery), (docs) => {
    return projectPracticalCentres(docs);
  });

  m.set(normalizeGroq(CERTIFICATION_QUERY), (docs) => {
    const c = docs.find((d) => d._type === "certification" && d.isActive === true);
    if (!c) return null;
    return {
      _id: c._id,
      title: c.title,
      certifications: Array.isArray(c.certifications) ? c.certifications : [],
      isActive: c.isActive,
    };
  });

  m.set(normalizeGroq(CAMPAIGN_BANNER_QUERY), (docs) => {
    const b = docs.find((d) => d._type === "campaignBanner" && d.isActive === true);
    if (!b) return null;
    return {
      _id: b._id,
      title: b.title,
      image: b.image,
      isActive: b.isActive,
    };
  });

  m.set(normalizeGroq(LEGAL_DOCUMENT_PDF_QUERY), (docs, _byId, params) => {
    const slug = params?.slug;
    if (typeof slug !== "string") return null;
    const d = docs.find(
      (x) => x._type === "legalDocument" && slugCurrent(x) === slug,
    );
    if (!d) return null;
    const pdfUrl = assetFieldToUrl(d.pdf);
    return { pdfUrl: pdfUrl ?? null };
  });

  m.set(normalizeGroq(BLOG_SLUGS_FOR_SITEMAP_QUERY), (docs) => {
    return docs
      .filter((d) => d._type === "blog" && d.isPublished === true)
      .map((d) => ({ slug: slugCurrent(d) ?? null }))
      .filter((r) => r.slug != null);
  });

  m.set(normalizeGroq(SANITY_BLOG_INDEX_QUERY), (docs) => {
    return docs
      .filter((d) => d._type === "blog" && d.isPublished === true)
      .map((d) => ({
        slug: slugCurrent(d) ?? "",
        date: d.date,
        category: d.category,
        highlighted: d.highlighted === true,
      }))
      .filter((r) => r.slug.length > 0);
  });

  m.set(normalizeGroq(BLOG_CARDS_BY_SLUGS_QUERY), (docs, _byId, params) => {
    const slugs = params?.slugs;
    if (!Array.isArray(slugs)) return [];
    const set = new Set(slugs.map((s) => String(s).toLowerCase()));
    return docs
      .filter(
        (d) =>
          d._type === "blog" &&
          d.isPublished === true &&
          set.has((slugCurrent(d) ?? "").toLowerCase()),
      )
      .map((d) => projectBlogCard(d));
  });

  m.set(normalizeGroq(BLOG_BY_SLUG_QUERY), (docs, _byId, params) => {
    const slug = params?.slug;
    if (typeof slug !== "string") return null;
    const p = docs.find(
      (d) => d._type === "blog" && slugCurrent(d) === slug,
    );
    if (!p) return null;
    return {
      _id: p._id,
      title: p.title,
      slug: p.slug,
      author: p.author,
      date: p.date,
      category: p.category,
      isPublished: p.isPublished,
      heroImage: p.heroImage,
      heroTitle: p.heroTitle,
      coverImage: p.coverImage,
      body: p.body,
      highlighted: p.highlighted,
    };
  });

  m.set(normalizeGroq(RECENT_BLOGS_QUERY), (docs) => {
    const published = docs.filter(
      (d) => d._type === "blog" && d.isPublished === true,
    );
    published.sort((a, b) => {
      const da = String(a.date ?? "");
      const db = String(b.date ?? "");
      return db.localeCompare(da);
    });
    return published.slice(0, 7).map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
    }));
  });

  m.set(normalizeGroq(RELATED_BLOGS_QUERY), (docs, _byId, params) => {
    const category = params?.category;
    const currentId = params?.currentId;
    if (typeof category !== "string" || typeof currentId !== "string") {
      return [];
    }
    const published = docs.filter(
      (d) =>
        d._type === "blog" &&
        d.isPublished === true &&
        d.category === category &&
        d._id !== currentId,
    );
    published.sort((a, b) => {
      const da = String(a.date ?? "");
      const db = String(b.date ?? "");
      return db.localeCompare(da);
    });
    return published.slice(0, 6).map((d) => projectBlogCard(d));
  });

  return m;
}

let registry: Map<string, Handler> | null = null;

function getRegistry(): Map<string, Handler> {
  if (!registry) registry = buildRegistry();
  return registry;
}

export async function runLocalCmsQuery<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const store = await readLocalCmsStore();
  const docs = store.documents;
  const byId = indexDocuments(docs);
  const key = normalizeGroq(query);
  const handler = getRegistry().get(key);
  if (!handler) {
    throw new Error(
      `Local CMS: unsupported GROQ query. Add a handler in lib/cms/local-engine.ts or turn off local mode in admin.`,
    );
  }
  return handler(docs, byId, params) as T;
}
