import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { create } from "zustand";

type UserStore = {
  socket: Socket | null;
  isAuthenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  socket: null,
  isAuthenticated: false,
  username: "",
  login: (username: string) => {
    const socket = io("http://localhost:3000");
    socket.emit("setUsername", username);
    set({ isAuthenticated: true, username, socket });
    localStorage.setItem("username", username);
    localStorage.setItem("isAuthenticated", "true");
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
    set((state) => {
      state.socket?.disconnect();

      return {
        isAuthenticated: false,
        username: "",
        socket: null,
      };
    });
  },
}));
