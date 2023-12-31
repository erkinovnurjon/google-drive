import { create } from "zustand"

type FolderStore = {
      isOpen : boolean ;
      onOpen : () => void ;
      onClose : () => void;
} 

export const UseFolder  = create<FolderStore>((set) => {
      return {
            isOpen : false,
            onOpen : () => set({ isOpen : true}),
            onClose : () => set ({ isOpen : false})
      }
})