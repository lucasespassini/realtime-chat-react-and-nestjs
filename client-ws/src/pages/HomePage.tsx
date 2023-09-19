import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useChatStore } from "../stores/chat";
import { useUsersQuery } from "../query/useUsersQuery";
import { CardUser } from "../components/CardUser";

export const HomePage = () => {
  const { data: { users } = {} } = useUsersQuery();
  const { historyChat } = useChatStore();

  console.log(users);

  return (
    <Flex mt={5}>
      <Container maxW="70vw" display="flex" flexDir="column" gap={5}>
        <Heading size="md" textAlign="center">
          Usuários
        </Heading>

        <Flex alignItems="center" flexWrap="wrap" gap={3}>
          {users?.map((user) => (
            <CardUser key={user.ulid} {...user} />
          ))}
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
