import { ChildProps } from '@/types'
import React from 'react'

const RootLayout = ({children} :ChildProps) => {
  return (
    <div>{children}</div>
  )
}

export default RootLayout