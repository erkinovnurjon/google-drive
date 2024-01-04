import { create } from "zustand";

type SubscriptionPlan = {
      subscription: "Basic" | "Pro";
      setSubscription: (subscription: "Basic" | "Pro") => void;
      isLoading: boolean;
      setIsLoading: (isLoading: boolean) => void;
      totalStorage : number;
      setTotalstotage : (totalStorage : number) => void
};

export const useSubscription = create<SubscriptionPlan>((set) => ({
      subscription: "Basic",
      setSubscription: (subscription) => set({ subscription }),
      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),
      totalStorage : 0,
      setTotalstotage : (totalStorage) => set({totalStorage})
}));