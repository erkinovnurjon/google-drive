import { IFolderAndFile } from "@/types"
import { Download, MoreVertical, Pencil, Star, Trash, UserPlus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import React from "react"


interface ListActionProps{
      item : IFolderAndFile
}

const ListAction = ({item} : ListActionProps) => {
      const {refresh} = useRouter()
      const type = item.size ? "files" : "folders"

      const onDelete = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
         e.stopPropagation()


         const ref =doc(db , type ,  item.id )
         const promise = setDoc(ref , {...item ,
             isArchive : true , 
            archivedTime : new Date()})
            .then(() => refresh());

            toast.promise(promise , {
                  loading : "Loading...",
                  success : " Archived",
                  error : "Failed to Archive"
            })
      }

      const onAddStar = (e : React.MouseEvent<HTMLDivElement , MouseEvent>) => {
         e.stopPropagation()
         
         const ref = doc(db  , type , item.id)
         const promise = setDoc(ref , {...item , isStar : true}).then(() => refresh())

         toast.promise(promise , {
            loading : "Loading ...",
            success : "Starred!" ,
            error: " Failed to Starred"
         })
      }

      const onRemoveStar = (e: React.MouseEvent<HTMLDivElement , MouseEvent>) => {
            e.stopPropagation()
            const ref = doc(db, type , item.id)

            const promise = setDoc(ref , {...item , isStar : false}).then(() => refresh())

            toast.promise(promise , {
                  loading: "Loading",
                  success : "unstarred!",
                  error: " Failed to unstarred"
            })
      }
  return (
    <div className="flex items-center space-x-1">
      <div role="button" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0
       group-hover:opacity-100"
       onClick={onDelete}>
            <Trash className=" w-4 h-4 opacity-50" />
      </div>
      {item.isStar ? (
                    <div role="button" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0
                  group-hover:opacity-100"
                          onClick={onRemoveStar}>
                          <Star className=" w-4 h-4  fill-yellow-400 text-yellow-400" />
                    </div>
      ) : (

              <div role="button" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0
                  group-hover:opacity-100"
                  onClick={onAddStar}>
              <Star className=" w-4 h-4 opacity-50" />
             </div>
      )}

      <Popover>
            <PopoverTrigger className=" flex justify-start" asChild>
                  <div role="button" className="p-2 hover:bg-secondary rounded-full transition">
                        <MoreVertical className=" h-4 w-4" />
                  </div>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-2">
                  <div className=" flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm" role="button">
                        <Download  className="w-4 h-4"/>
                        <span>Download</span>
                  </div>
                  <div className=" flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm" role="button">
                        <Pencil  className="w-4 h-4"/>
                        <span>Download</span>
                  </div>
                  <Separator />
                          <div className=" flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm" role="button">
                                <UserPlus className="w-4 h-4" />
                                <span>Share</span>
                          </div>
                          <div 
                           onClick={onDelete}
                          className=" flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm" role="button">
                                <Trash className="w-4 h-4" />
                                <span>Move to trash</span>
                          </div>
            </PopoverContent>
      </Popover>
    </div>
  )
}

export default ListAction