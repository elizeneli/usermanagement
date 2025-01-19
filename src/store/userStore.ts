import { create } from "zustand";

interface UserStore {
  user: { id: number; name: string; email: string } | null;
  setUser: (user: { id: number; name: string; email: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
