import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { UseFolder } from '@/hooks/use-folder'


const FolderModal = () => {
  const { isOpen , onClose} = UseFolder()
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FolderModal