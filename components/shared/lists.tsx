import { IFolderAndFile } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ListItem from "./list-item"


interface ListsProps {
      folders : IFolderAndFile[],
      files : IFolderAndFile[]
}

const Lists = ({folders , files} :ListsProps) => {
  return (
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

  )
}

export default Lists