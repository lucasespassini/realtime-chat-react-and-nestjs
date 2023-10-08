import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";
import { queryClient } from "../../services/queryClient";

export const ChatProvider = ({ children }: { children: JSX.Element }) => {
  const { socket } = useAuthStore();

  useEffect(() => {
    socket?.on("receivedMessage", () => {
      queryClient.invalidateQueries("conversations");
      queryClient.invalidateQueries("messages");
    });
  }, [socket]);

  return children;
};
