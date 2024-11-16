import { AuthStorage } from "@/lib/local-storage";
import { IUser } from "@/types/user-type";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isAdmin: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
  isAuthenticated: !!AuthStorage.getAccessToken(),
  user: null,
  isAdmin: true,
  login: (user: IUser) =>
    set({
      isAuthenticated: true,
      user,
      isAdmin: user?.role === "admin",
      // true,
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
