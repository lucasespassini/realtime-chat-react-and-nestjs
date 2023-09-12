import { create } from "zustand";
import { SocketUser } from "../constants/Types";

type ChatStore = {
  user: SocketUser | null;
  setUser: (user: SocketUser) => void;
  updateStatus: (isOnline: boolean) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateStatus: (isOnline) =>
    set((state) => ({ user: { ...state.user, isOnline } })),
}));
