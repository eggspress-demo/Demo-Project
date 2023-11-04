import React from 'react'
import Logo from '../../public/logo.png'
import Eggsmark from '../../public/eggsmark.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='px-3 md:px-0 py-8 min-w-full duration-100 bg-gray-100 dark:bg-gray-700 pt-12'>
      <div className="container flex justify-between dark:text-gray-200">
        <div className="w-1/2 md:w-2/3">
            Contact
        </div>
        <div className="w-1/2 md:w-1/3">
          <Link href='/'>
            <Image src={Logo} alt='logo' height='132' width='132' style={{width: 'auto', height: 'auto'}} className='grayscale opacity-50 dark:brightness-[3] ml-auto' />
          </Link>
        </div>
      </div>
      <div className="flex w-full text-center h-48">
        <div className="mx-auto mt-auto inline-block text-xs text-gray-500 select-none font-normal hover:font-bold duration-150 delay-100">
          <Link href="https://github.com/dentonzh/Eggspress">
            <span>
              Made with 
            </span>
            <Image className="inline-block mx-1" src={Eggsmark} alt='Eggspress brand icon'></Image>
            <span>
              Eggspress
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer