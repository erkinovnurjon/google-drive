
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: "drive-4be00.firebaseapp.com",
      projectId: "drive-4be00",
      storageBucket: "drive-4be00.appspot.com",
      messagingSenderId: "781990867769",
      appId: "1:781990867769:web:3d72a0c7d26b3719cf6ee8"
};

const app = initializeApp(firebaseConfig);

!getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
export {db , storage}