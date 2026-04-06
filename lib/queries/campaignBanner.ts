export const CAMPAIGN_BANNER_QUERY = `*[_type == "campaignBanner" && isActive == true][0] {
  _id,
  title,
  image {
    asset ->,
    alt,
    hotspot
  },
  isActive
}`
