import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({className, spanDesign}:{className?: string, spanDesign?: string}) => {
  return <Link href={"/"} className='inline-flex'>
    <h2 className={cn("text-2xl text-shop-dark-green font-black tracking-wider        uppercase hover:text-shop-light-green hoverEffect group font-sans",className)}>
        Kash<span className={cn("text-shop-light-green group-hover:text-shop-dark-green hoverEffect", spanDesign)}>i</span> Charm<span className={cn("text-shop-light-green group-hover:text-shop-dark-green hoverEffect", spanDesign)}>s</span>
    </h2>
  </Link>
  
}

export default Logo