// components/CampaignBanner.tsx
import React from 'react'
import Image from 'next/image'
import { client } from "@/lib/sanity/client";
import { CampaignBannerType } from "@/lib/types/campaignBanner";
import { CAMPAIGN_BANNER_QUERY } from "@/lib/queries/campaignBanner";
import { urlFor } from "@/lib/sanity/image";

async function CampaignBanner() {
  const data = await client.fetch<CampaignBannerType>(CAMPAIGN_BANNER_QUERY)

  if (!data?.isActive || !data?.image) return null

  return (
    <section className='py-15 sm:py-30 -mx-5 md:px-0 px-4'>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        <Image
          src={urlFor(data.image).url()}
          alt={data.image.alt ?? 'Campaign Banner'}
          className="w-full h-auto rounded-md"
          width={1200}
          height={600}
        />
      </div>
    </section>
  )
}

export default CampaignBanner