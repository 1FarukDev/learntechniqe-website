// types/campaignBanner.ts
export interface CampaignBannerType {
  _id: string
  title: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
    hotspot?: {
      x: number
      y: number
    }
  }
  isActive: boolean
}