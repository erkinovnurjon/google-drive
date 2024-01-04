import SuggestCard from '@/components/card/suggest-card'
import Empty from '@/components/shared/empty'
import Header from '@/components/shared/header'
import ListItem from '@/components/shared/list-item'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/lib/firebase'
import { auth } from '@clerk/nextjs'
import { collection, getDocs, query, where } from 'firebase/firestore'


const getData = async (uid: string, type: "files" | "folders") => {
      let data: any[] = []
      const q = query(
            collection(db, type),
            where("uid", "==", uid),
            where("isArchive", "==", false),
            where("isStar", "==", true)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
      })

      return data
}

const StarredPage = async () => {

      const { userId } = auth()
      const folders = await getData(userId!, "folders")
      const files = await getData(userId!, "files")
      return (
            <>
                  <Header label='Starred' />
                  {[...files, ...folders].length === 0 ? <Empty /> : (
                        <>

                              <div className=" text-sm opacity-70 mt-6">Suggested</div>
                              <div className=" grid grid-cols-4 gap-4 mt-4">
                                    {files.map((file) => (
                                          <SuggestCard key={file.id} item={file} />
                                    ))}
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
                        </>
                  )}

            </>
      )
}

export default StarredPage