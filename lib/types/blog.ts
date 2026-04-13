
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  author: string
  date: string
  category: string

  heroImage: {
    asset: { _ref: string; _type: 'reference' }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  heroTitle: string

  coverImage: {
    asset: { _ref: string; _type: 'reference' }
    alt: string
    hotspot?: { x: number; y: number }
  }

  body: any[]
  highlighted: boolean
  isPublished: boolean
  /** First <img> from legacy WordPress HTML — used for listing cards only. */
  legacyCardImageUrl?: string
}