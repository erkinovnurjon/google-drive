"use client";

import { FileUp, Folder, FolderUp } from "lucide-react";
import { ElementRef, useRef } from "react";
import { Separator } from "../ui/separator";

import {
      addDoc,
      collection,
      doc,
      serverTimestamp,
      updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { toast } from "sonner";
import { UseFolder } from "@/hooks/use-folder";

const PopoverActions = () => {
      const inputRef = useRef<ElementRef<"input">>(null);
      const { onOpen } = UseFolder();
      const { user } = useUser();

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];
            let image = "";

            const reader = new FileReader();

            if (file) {
                  reader.readAsDataURL(file);
                  reader.onload = (e) => {
                        image = e.target?.result as string;
                  };
            }

            const promise = addDoc(collection(db, "files"), {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  uid: user?.id,
                  timestamp: serverTimestamp(),
                  isArchive: false,
            }).then((docs) => {
                  const refs = ref(storage, `files/${docs.id}/image`);
                  uploadString(refs, image, "data_url").then(() => {
                        getDownloadURL(refs).then((url) => {
                              updateDoc(doc(db, "files", docs.id), {
                                    image: url,
                              });
                        });
                  });
            });

            toast.promise(promise, {
                  loading: "Loading...",
                  success: "Uploaded!",
                  error: "Error uploading file",
            });
      };

      return (
            <>
                  <div
                        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                        role="button"
                        onClick={onOpen}
                  >
                        <Folder className="w-4 h-4" />
                        <span>New folder</span>
                  </div>
                  <Separator />
                  <label>
                        <div
                              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                              role="button"
                        >
                              <FileUp className="w-4 h-4" />
                              <span>File upload</span>
                        </div>
                        <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              ref={inputRef}
                              onChange={onChange}
                        />
                  </label>

                  <label>
                        <div
                              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                              role="button"
                        >
                              <FolderUp className="w-4 h-4" />
                              <span>Folder upload</span>
                        </div>
                        <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              ref={inputRef}
                              onChange={onChange}
                        />
                  </label>
            </>
      );
};

export default PopoverActions;