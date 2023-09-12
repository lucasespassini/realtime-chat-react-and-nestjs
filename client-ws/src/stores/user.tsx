import { create } from "zustand";
import { SocketUser } from "../constants/Types";

type UserStore = {
  users: SocketUser[];
  setUsers: (users: SocketUser[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
