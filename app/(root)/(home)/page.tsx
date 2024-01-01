import Header from "@/components/shared/header";
import Lists from "@/components/shared/lists";
import { db } from "@/lib/firebase";
import { UserButton, auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";

const getData = async ( uid : string , type : "files" | "folders") => {
  let data : any [] = []
  const q = query(
    collection(db , type),
      where("uid" , "=="  , uid),
      where("isArchive" , "==" , false)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) =>{
    data.push({...doc.data() , id : doc.id})
  })

  return data
}

const HomePage = async () => {
   const { userId} = auth()
   const folders = await getData(userId! , "folders")
   const files = await getData(userId! , "files")
  return (
    <>
      <Header label={"My Drive"} isHome />
      <Lists 
      files={JSON.parse(JSON.stringify(files))}
      folders={JSON.parse(JSON.stringify(folders))} /> 
    </>
  );
};

export default HomePage;