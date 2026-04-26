import { cmsFetch } from "@/lib/cms/fetch";
import { headerQuery } from "@/lib/queries/navigation";
import { PATHWAYS_PAGE_QUERY } from "@/lib/queries/pathway";
import type { HeaderData } from "@/types/header";
import Header from "./header";

export interface PathwayNavItem {
  badge: string;
  href: string;
  external?: boolean;
  pathway: {
    title: string;
    slug: string;
    heroImage?: string;
    description?: any;
    price?: string | number;
    priceIncVat?: string | number;
    deposit?: string | number;
    duration?: string;
    paymentPlan?: string;
    monthlyInstalment?: string | number;
    instalments?: string | number;
  };
}

export default async function HeaderWrapper() {
  const [headerData, pathwaysPage] = await Promise.all([
    cmsFetch<HeaderData>(headerQuery),
    cmsFetch<{ pathways?: unknown[] } | null>(PATHWAYS_PAGE_QUERY).catch(
      () => null,
    ),
  ]);

  const pathwayNavItems: PathwayNavItem[] = (pathwaysPage?.pathways ?? [])
    .filter((p: any) => p.pathway?.slug && p.pathway?.title)
    .map((p: any) => ({
      badge: p.badge ?? "",
      href: p.href ?? `/pathways/${p.pathway.slug}`,
      external: p.external ?? false,
      pathway: {
        title: p.pathway.title,
        slug: p.pathway.slug,
        heroImage: p.pathway.heroImage ?? null,
        description: p.pathway.description ?? null,
        price: p.pathway.price ?? null,
        priceIncVat: p.pathway.priceIncVat ?? null,
        deposit: p.pathway.deposit ?? null,
        duration: p.pathway.duration ?? null,
        paymentPlan: p.pathway.paymentPlan ?? null,
        monthlyInstalment: p.pathway.monthlyInstalment ?? null,
        instalments: p.pathway.instalments ?? null,
      },
    }));

  return <Header data={headerData} pathwayNavItems={pathwayNavItems} />;
}