"use client"


import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { UseFolder } from '@/hooks/use-folder'
import * as z from "zod"
import { formSchema } from '@/lib/validation'
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const FolderModal = () => {
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  })

  const  onSubmit = (values: z.infer<typeof formSchema>) => {
      const promise = addDoc(collection( db , "folders") , {
        name: values.name ,
        timestamp : serverTimestamp(),
        uid: user?.id , 
        isArchive : false 
      }).then(() => {
        form.reset(),
        onClose()
        router.refresh()
      })

      toast.promise(promise , {
        loading : "Loading...",
        success : "Folder created",
        error : "Error creating folder"
      })
    
  }
  const { isOpen , onClose} = UseFolder()
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent  className=' w-full'>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div className='flex  flex-col space-y-2'>
          <Form {...form} >
            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <Input placeholder="Folder Name" {...field} className='rounded-none outline-none' />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <div className=' flex justify-end items-center space-x-2'>
                <Button variant={"link"} size={"sm"} onClick={onClose} type='button'>Cancel</Button>
                <Button variant={"outline"} size={"sm"} type='submit'>Create</Button>

              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FolderModal