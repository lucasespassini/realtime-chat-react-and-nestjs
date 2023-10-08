import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";
import { useUserStore } from "../../stores/user";
import { UserConnect, UserDisconnect } from "../../constants/Types";

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const toast = useToast();
  const { socket } = useAuthStore();
  const { setUsers } = useUserStore();

  useEffect(() => {
    socket?.on("userConnected", (data: UserConnect) => {
      setUsers(data.users);

      data.userConnected.usr_socket_id !== socket.id &&
        toast({
          description: `${data.userConnected.usr_username} está online!`,
          isClosable: false,
          status: "info",
          duration: 3000,
        });
    });
  }, [setUsers, socket, toast]);

  useEffect(() => {
    socket?.on("userDisconnected", (data: UserDisconnect) => {
      setUsers(data.users);

      toast({
        description: `${data.userDisconnected.usr_username} agora está offline!`,
        isClosable: false,
        status: "info",
        duration: 3000,
      });
    });
  }, [setUsers, socket, toast]);

  return children;
};
