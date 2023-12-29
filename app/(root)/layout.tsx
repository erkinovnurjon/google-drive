import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import { ChildProps } from '@/types'
import React from 'react'

const RootLayout = ({children} :ChildProps) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
      
      </div>
  )
}

export default RootLayout