import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";

export const ChatProvider = ({ children }: { children: JSX.Element }) => {
  const { socket } = useAuthStore();

  useEffect(() => {
    socket?.on("receivedMessage", (data) => {
      console.log(data);
    });
  }, [socket]);

  return children;
};
