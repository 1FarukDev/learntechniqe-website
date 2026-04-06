export interface CertificationItem {
  _key: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: { x: number; y: number }
  }
  alt: string
  width: 'w-20' | 'w-30' | 'w-32' | 'w-40' | 'w-44'
}

export interface CertificationType {
  _id: string
  title: string
  certifications: CertificationItem[]
  isActive: boolean
}