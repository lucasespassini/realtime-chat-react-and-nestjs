import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";
import { useUserStore } from "../../stores/user";
import { SocketUser } from "../../constants/Types";

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const toast = useToast();
  const { socket } = useAuthStore();
  const { addUserConnected, removeUserDisconnect } = useUserStore();

  useEffect(() => {
    socket?.on("userConnected", async (user: SocketUser) => {
      addUserConnected(user);
      toast({
        description: `${user.username} está online!`,
        isClosable: false,
        status: "info",
        duration: 3000,
      });
    });
  }, [addUserConnected, socket, toast]);

  useEffect(() => {
    socket?.on("userDisconnected", async (user: SocketUser) => {
      removeUserDisconnect(user);
      toast({
        description: `${user.username} agora está offline!`,
        isClosable: false,
        status: "info",
        duration: 3000,
      });
    });
  }, [removeUserDisconnect, socket, toast]);

  return children;
};
