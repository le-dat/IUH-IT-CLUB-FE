import { IUser } from "@/types/user-type";
import { create } from "zustand";

interface UserState {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users: IUser[]) => set({ users }),
}));

export default useUserStore;
