import React from 'react'
import Image from 'next/image'
import DiscountImage from '@/app/assets/png/discount.jpg'

function Discount() {
  return (
    <section className='py-15 sm:py-30 -mx-5 px-0'>
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
        <Image
          src={DiscountImage}
          alt="Discount"
          className="w-full h-auto rounded-md"
          width={1200}
          height={600}
        />
      </div>
    </section>
  )
}

export default Discount