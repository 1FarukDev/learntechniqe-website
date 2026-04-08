import { groq } from "next-sanity";

export const PATHWAYS_PAGE_QUERY = groq`
  *[_type == "pathwaysPage"][0] {
    _id,
    title,
    hero {
      title,
      subtitle,
      description,
      ctaPrimary,
      ctaSecondary,
      ctaSecondaryHref
    },
    comparison {
      title,
      description,
      disclaimer
    },
    process {
      title,
      subtitle,
      items[]
    },
    cta {
      title,
      headline,
      description,
      benefits[],
      buttonText,
      pathwayHref
    },
    calculator {
      courses[] {
        id,
        name,
        priceIncVat,
        paymentPlanAvailable
      },
      platinumUpgrade {
        name,
        priceIncVat,
        description
      }
    },
    pathways[] {
      badge,
      href,
      external,
      "pathway": pathway-> {
        title,
        "slug": slug.current,
        "heroImage": heroImage.asset->url,
        "description": description[0],
        price,
        priceIncVat,
        eligibility,
        attendance,
        duration,
        location,
        paymentPlan,
        deposit,
        monthlyPayment,
        monthlyInstalment,
        instalments,
        priceExVat,
        priceIncVat,
        exams,
      }
    }
  }
`;

export const PATHWAYS_QUERY = groq`
  *[_type == "pathwayDetail"] | order(title asc) {
    title,
    "slug": slug.current,
    price,
    heroImage,
    tags,
    description,
    duration,
  }
`;

export const PATHWAYS_CALC_QUERY = groq`
  *[_type == "pathwayDetail" && defined(priceIncVat)] | order(title asc) {
    title,
    "slug": slug.current,
    priceIncVat,
    deposit,
    paymentPlan,
    monthlyInstalment,
    instalments,
  }
`;

export const PATHWAY_DETAIL_QUERY = groq`
   *[_type == "pathwayDetail" && slug.current == $slug][0] {
     title,
     "slug": slug.current,
     tags,
     heroImage,
     price,
     originalPrice,
     pricingTagline,
     description,
     requestOverviewLink,
     qualifications[] {
       title,
       accreditedBy,
       accreditationLogoAlt,
       "accreditationLogo": accreditationLogo.asset->url,
     },
     duration,
     durationNote,
     durationNoteLink,
     detailsSummary,
     courseGoals,
     entryRequirements,
     syllabus,
     prerequisites,
     completionRewards,
     cademyEmbedUrl,
     cademyDirectUrl,
     dates,
     deposit,
     paymentPlan,
     priceIncVat,
     priceExVat,
     monthlyPayment,
     monthlyInstalment,
     instalments,
   }
 `;