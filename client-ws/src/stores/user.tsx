import { create } from "zustand";

export type SocketUser = {
  socketId: string;
  ulid: string;
  username: string;
  isOnline: boolean;
};

type UserStore = {
  users: SocketUser[];
  setUsers: (users: SocketUser[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
