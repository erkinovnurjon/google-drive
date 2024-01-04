"use client"

import { IFolderAndFile } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ListItem from "./list-item"
import { useLayout } from "@/hooks/use-layout"
import SuggestCard from "../card/suggest-card"
import Empty from "./empty"


interface ListsProps {
      folders: IFolderAndFile[],
      files: IFolderAndFile[]
}

const Lists = ({ folders, files }: ListsProps) => {
      const { layout } = useLayout()
      return layout === "list" ? (

            <>
                  {[...folders, ...files].length === 0 ? (
                        <Empty />
                  ) : (
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
                                    {[...folders, ...files].map((folder) => (
                                          <ListItem key={folder.id} item={folder} />
                                    ))}
                              </TableBody>
                        </Table>

                  )}

            </>

      ) : (
            <>
                  <div className=" text-sm opacity-70 mt-6">Suggested </div>
                  {files.length === 0 ? <Empty /> : (
                        <div className=" grid grid-cols-4 gap-4 mt-4">
                              {files.map((file) => (
                                    <SuggestCard key={file.id} item={file} />
                              ))}
                        </div>

                  )}
                  {files.length === 0 && folders.length === 0 ? null : (

                        <>
                              <div className=" text-sm opacity-70 mt-6">Folders</div>
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

                        </>

                  )}


            </>)
}

export default Lists