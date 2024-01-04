/* eslint-disable react/no-unescaped-entities */
"use client"

import { UsePlan } from '@/hooks/use-plan'

import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import Image from 'next/image'

const PlanModal = () => {
  const { isOpen , onClose } = UsePlan()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className=' max-w-3xl'>
          <DialogHeader>
            <Image src={"/one.svg"} alt='one' width={50} height={50} />
          </DialogHeader>
          <div className=' opacity-75 text-center'>
            Choose the Google One plan that's wight for you
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default PlanModal