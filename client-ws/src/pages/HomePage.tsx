import { Container, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../stores/auth";
import { SocketUser, useUserStore } from "../stores/user";
import { CardUser } from "../components/CardUser";
import { api } from "../providers/api";

export const HomePage = () => {
  const { socket } = useAuthStore();
  const { users, setUsers } = useUserStore();

  useEffect(() => {
    socket.on("showUsers", async (users: SocketUser[]) => {
      const newusers = [];
      const { data } = await api.get("/users");
      for (const userData of data) {
        const newUser = users.find((user) => user.ulid === userData.usr_ulid);

        newusers.push({
          socketId: newUser ? newUser.socketId : null,
          ulid: newUser ? newUser.ulid : userData.usr_ulid,
          username: newUser ? newUser.username : userData.usr_username,
          isOnline: newUser ? true : false,
        });
      }
      setUsers(
        newusers.sort((a, b) => {
          if (a.isOnline > b.isOnline) return -1;
          if (a.isOnline < b.isOnline) return 1;
          return 0;
        })
      );
    });
  }, [setUsers, socket]);

  return (
    <Flex mt={5}>
      <Container maxW="70vw" display="flex" flexDir="column" gap={5}>
        <Heading size="md" textAlign="center">
          Usuários
        </Heading>

        <Flex alignItems="center" flexWrap="wrap" gap={3}>
          {users.map((user) => (
            <CardUser
              key={user.socketId}
              username={user.username}
              isOnline={user.isOnline}
            />
          ))}
        </Flex>
      </Container>

      <Container maxW="20vw" display="flex" flexDir="column">
        <Heading size="md">Histórico de conversas</Heading>
      </Container>
    </Flex>
  );
};
