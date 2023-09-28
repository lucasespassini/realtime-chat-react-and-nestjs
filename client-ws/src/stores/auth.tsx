import Cookies from "js-cookie";
import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { api } from "../services/api";
import { ClientToServerEvents } from "../constants/Types";

type Payload = {
  ulid: string;
  username: string;
};

type AuthParams = {
  username: string;
  password: string;
};

type AuthStore = {
  socket: Socket<ClientToServerEvents> | null;
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
    const token = Cookies.get("token");
    const payload = Cookies.get("payload");

    if (token && payload) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${token}` },
      });
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
      const expirationTimeInDays = 12 / 24;
      Cookies.set("token", data.token, { expires: expirationTimeInDays });
      Cookies.set("payload", JSON.stringify(data.payload), {
        expires: expirationTimeInDays,
      });

      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${data.token}` },
      });
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      set({ socket, isAuthenticated: true, payload: data.payload });
    }
  },
  signup: async ({ username, password }) => {
    const { data, status } = await api.post("/auth/signup", {
      username,
      password,
    });

    if (status === 201) {
      const expirationTimeInDays = 12 / 24;
      Cookies.set("token", data.token, { expires: expirationTimeInDays });
      Cookies.set("payload", JSON.stringify(data.payload), {
        expires: expirationTimeInDays,
      });
      const socket = io(import.meta.env.VITE_BASE_URL, {
        extraHeaders: { Authorization: `Bearer ${data.token}` },
      });
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      set({ socket, isAuthenticated: true, payload: data.payload });
    }
  },
  signout: () => {
    Cookies.remove("token");
    Cookies.remove("payload");
    set((state) => {
      state.socket?.disconnect();
      api.defaults.headers["Authorization"] = null;
      return {
        isAuthenticated: false,
        payload: null,
        socket: null,
      };
    });
  },
}));
