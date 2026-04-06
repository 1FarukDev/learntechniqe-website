export const CERTIFICATION_QUERY = `*[_type == "certification" && isActive == true][0] {
  _id,
  title,
  certifications[] {
    _key,
    image {
      asset ->,
      hotspot
    },
    alt,
    width
  },
  isActive
}`