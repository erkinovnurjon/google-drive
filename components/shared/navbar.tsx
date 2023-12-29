import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { HelpCircle, Settings } from 'lucide-react'
import { auth } from '@clerk/nextjs'
import UserBox from './user-box'
import { Avatar, AvatarFallback } from '../ui/avatar'

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className='h-[10vh] fixed top-0 left-0 right-0 bg-[#F9F6FC] dark:bg-[#1f1f1f]'>
      <div className='flex items-center justify-between my-4 mx-6'>
        <Link href={'/'} >
          <div className='flex items-center'>
            <Image src={'./logo.svg'} alt='logo' width={40} height={40} />
            <span className='pl-2 text-[22px] opacity-75'>Drive</span>

          </div>
        </Link>

        <div className=' flex items-center space-x-2'>
          <ModeToggle />

          <div className='p-2 hover:bg-secondary rounded-full transition' role='button'>
            <HelpCircle className='w-5 h-5' />
          </div>
          <div className='p-2 hover:bg-secondary rounded-full transition' role='button'>
            <Settings className='w-5 h-5' />
          </div>

          {
            userId ? (
              <UserBox />
            ) : (
              <Avatar className=' cursor-pointer' >
                <AvatarFallback>
                  NE
                </AvatarFallback>
              </Avatar>

            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar