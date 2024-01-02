"use client"

import { IFolderAndFile } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ListItem from "./list-item"
import { useLayout } from "@/hooks/use-layout"
import SuggestCard from "../card/suggested-card"


interface ListsProps {
      folders : IFolderAndFile[],
      files : IFolderAndFile[]
}

const Lists = ({folders , files} :ListsProps) => {
      const {layout} = useLayout()
  return  layout ==="list" ? (
        <Table className=" mt-4">
              
              <TableHeader>
                    <TableRow>
                          <TableHead >Name</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Created at</TableHead>
                          <TableHead>File size</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
              </TableHeader>
              <TableBody>
                   {[...folders , ...files].map((folder) => (
                        <ListItem key={folder.id} item={folder} />
                   ))}
              </TableBody>
        </Table>

  ) : ( <>
    <div className=" text-sm opacity-70 mt-6">Suggested
     <div className=" grid grid-cols-4 gap-4 mt-4">
        {files.map((file) => (
            <SuggestCard key={file.id} item={file} />
        ))}
     </div>
    </div>
    <div className=" text-sm opacity-70 mt-6">Folders
                    <Table className=" mt-4">

                          <TableHeader>
                                <TableRow>
                                      <TableHead >Name</TableHead>
                                      <TableHead>Owner</TableHead>
                                      <TableHead>Created at</TableHead>
                                      <TableHead>File size</TableHead>
                                      <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                          </TableHeader>
                          <TableBody>
                                {files.map((folder) => (
                                      <ListItem key={folder.id} item={folder} />
                                ))}
                          </TableBody>
                    </Table>
    </div>
  </> )
}

export default Lists