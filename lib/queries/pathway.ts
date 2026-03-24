import { groq } from 'next-sanity'

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
      id,
      image {
        asset->{
          url
        },
        alt,
        hotspot
      },
      title,
      badge,
      description,
      href,
      external,
      eligibility[],
      attendance,
      exams,
      duration,
      location,
      priceExVat,
      priceIncVat,
      paymentPlan,
      deposit,
      monthlyInstalment,
      instalments
    }
  }
`