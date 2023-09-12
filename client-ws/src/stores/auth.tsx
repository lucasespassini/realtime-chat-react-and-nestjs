import { create } from "zustand";
import { api } from "../providers/api";
import { Socket, io } from "socket.io-client";

type Payload = {
  ulid: string;
  username: string;
};

type AuthParams = {
  username: string;
  password: string;
};

type AuthStore = {
  socket: Socket | null;
  payload: Payload | null;
  isAuthenticated: boolean;
  authenticate: () => void;
  signin: ({ username, password }: AuthParams) => Promise<void>;
  signup: ({ username, password }: AuthParams) => Promise<void>;
  signout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  socket: null,
  payload: null,
  isAuthenticated: false,
  authenticate: () => {
    const token = localStorage.getItem("token");
    const payload = localStorage.getItem("payload");

    if (token && payload) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${token}` },
      });
      socket.emit("setUsername", "user");
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      set({ socket, isAuthenticated: true, payload: JSON.parse(payload) });
    }
  },
  signin: async ({ username, password }) => {
    const { data, status } = await api.post("/auth/signin", {
      username,
      password,
    });

    if (status === 201) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("payload", JSON.stringify(data.payload));
      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${data.token}` },
      });
      set({ socket, isAuthenticated: true, payload: data.payload });
    }
  },
  signup: async ({ username, password }) => {
    const { data, status } = await api.post("/auth/signup", {
      username,
      password,
    });

    if (status === 201) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("payload", JSON.stringify(data.payload));
      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${data.token}` },
      });
      set({ socket, isAuthenticated: true, payload: data.payload });
    }
  },
  signout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");
    set((state) => {
      state.socket?.disconnect();
      return {
        isAuthenticated: false,
        payload: null,
        socket: null,
      };
    });
  },
}));
