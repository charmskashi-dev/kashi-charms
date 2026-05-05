import React from 'react'
import { Title } from './ui/ui/text';
import Link from 'next/link';
import Image from 'next/image';
import { banner_1 } from '@/images/products';

function HomeBanner() {
  return (
    <div className='py-16 md:py-0 bg-shop-light-pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
      <div className='space-y-5'>
        <Title>
          Grab upto 50% off on <br /> your first order!
        </Title>
        <Link href={"/shop"} className='bg-shop-btn-dark-green/90 text-white /90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop-dark-green hoverEffect'> Buy Now </Link>
      </div>
      <div>
        <Image src={banner_1} alt="banner 1" className='hidden md:inline-flex w-96' />
      </div>
    </div>
  );
}

export default HomeBanner;