import { create } from "zustand";
import { NewMessage, SocketUser } from "../constants/Types";

type ChatStore = {
  user: SocketUser | null;
  historyChat: NewMessage[];
  setHistoryChat: (newMessage: NewMessage) => void;
  setUser: (user: SocketUser) => void;
  updateStatus: (isOnline: boolean) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  historyChat: [],
  setHistoryChat: (history) =>
    set((state) => ({ historyChat: [...state.historyChat, history] })),
  setUser: (user) => set({ user }),
  updateStatus: (isOnline) =>
    set((state) => ({ user: { ...state.user, isOnline } })),
}));
