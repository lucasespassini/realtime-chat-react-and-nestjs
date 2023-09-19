import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";
import { SocketUser } from "../../constants/Types";

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const toast = useToast();
  const { socket } = useAuthStore();

  useEffect(() => {
    socket?.on("userConnected", async (user: SocketUser) => {
      // queryClient.invalidateQueries("users");
      console.log("teste");
      toast({
        description: `${user.username} está online!`,
        isClosable: false,
        status: "info",
        duration: 3000,
      });
    });
  }, [socket, toast]);

  useEffect(() => {
    socket?.on("userDisconnected", async (user: SocketUser) => {
      // queryClient.invalidateQueries("users");
      toast({
        description: `${user.username} agora está offline!`,
        isClosable: false,
        status: "info",
        duration: 3000,
      });
    });
  }, [socket, toast]);

  return children;
};
