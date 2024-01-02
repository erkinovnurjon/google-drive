import Header from '@/components/shared/header'
import TrashItem from '@/components/shared/trash-item'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/lib/firebase'
import { auth } from '@clerk/nextjs'
import { collection, getDocs, query, where } from 'firebase/firestore'


const getData = async (uid: string, type: "files" | "folders") => {
      let data: any[] = [];
      const q = query(
            collection(db, type),
            where("uid", "==", uid),
            where("isArchive", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
      });

      return data;
};

const TrashPage = async () => {

      const { userId } = auth()
      const folders = await getData(userId!, "folders")
      const files = await getData(userId!, "files")
  return (
    <>

    <Header label='trash' />
              <Table className=" mt-4">

                    <TableHeader>
                          <TableRow>
                                <TableHead >Name</TableHead>
                                <TableHead>Archived Time</TableHead>

                                <TableHead>File size</TableHead>
                              
                          </TableRow>
                    </TableHeader>
                    <TableBody>
                          {[...folders, ...files].map((folder) => (
                                <TrashItem key={folder.id} item={folder} />
                          ))}
                    </TableBody>
              </Table>
    </>
  )
}

export default TrashPage