import React from 'react'
import Image from 'next/image'
import DiscountImage from '@/app/assets/png/discount.jpg'

function Discount() {
  return (
    <section className='max-w-6xl rounded-md mx-auto py-30 px-4'>
      <div className="relative w-full">
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