import { ChildProps } from '@/types'
import React from 'react'

const AuthLayout = ({children} :ChildProps) => {
  return (
    <div>{children}</div>
  )
}

export default AuthLayout