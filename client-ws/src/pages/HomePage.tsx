import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useAuthStore } from "../stores/auth";
import { useUserStore } from "../stores/user";
import { useChatStore } from "../stores/chat";
import { CardUser } from "../components/CardUser";

export const HomePage = () => {
  const { socket } = useAuthStore();
  const { users } = useUserStore();
  const { historyChat } = useChatStore();

  console.log(users);

  return (
    <Flex mt={5}>
      <Container maxW="70vw" display="flex" flexDir="column" gap={5}>
        <Heading size="md" textAlign="center">
          Usuários
        </Heading>

        <Flex alignItems="center" flexWrap="wrap" gap={3}>
          {users.map(
            (user) =>
              user.socketId !== socket.id && (
                <CardUser key={user.ulid} {...user} />
              )
          )}
        </Flex>
      </Container>

      <Container maxW="20vw" display="flex" flexDir="column">
        <Heading size="md">Histórico de conversas</Heading>
        {historyChat.map((chat) => (
          <Text key={chat.conversationUlid}>{chat.message}</Text>
        ))}
      </Container>
    </Flex>
  );
};
