import { create } from "zustand"

type PlanStore = {
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
}

export const UsePlan = create<PlanStore>((set) => {
      return {
            isOpen: false,
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false })
      }
})