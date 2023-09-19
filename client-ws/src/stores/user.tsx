import { create } from "zustand";
import { SocketUser } from "../constants/Types";

type UserStore = {
  users: SocketUser[];
  addAllUser: (users: SocketUser[]) => void;
  addUserConnected: (user: SocketUser) => void;
  removeUserDisconnect: (user: SocketUser) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addAllUser: (users) => set({ users }),
  addUserConnected: (userConnected) =>
    set((state) => ({ users: [...state.users, userConnected] })),
  removeUserDisconnect: (userDisconnect) =>
    set((state) => ({
      users: state.users.filter((user) => user.ulid !== userDisconnect.ulid),
    })),
}));
