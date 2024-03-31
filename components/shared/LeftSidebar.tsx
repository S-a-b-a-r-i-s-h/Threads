"use client"

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'
import { SignedIn,SignOutButton } from "@clerk/nextjs"
import { useTheme } from '@/context/ThemeProvider'
import Color from './Color'


const LeftSidebar = () => {
  const {mode,color} = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return (
            <Link 
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive ? `gradient-${color}` : '' } `}

            >
              <Image 
                src={isActive ? link.imgURL: mode === 'dark' ? link.imgURL: link.imgURLdark}
                alt={link.label}
                width={24}
                height={24}
              />
  
              <p className={`dark:text-light-1 text-dark-1 max-lg:hidden ${isActive ? 'text-light-1' : '' }`}>{link.label}</p>
            </Link>  
          )})}
          <Color />
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
                <Image 
                  src={mode === 'dark' ? '/assets/logout.svg' : '/assets/logout-dark.svg'}
                  alt="logout"
                  width={24}
                  height={24}
                />
                <p className='dark:text-light-2 text-dark-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar