import { Avatar, Flex, Heading } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";
import { useUserStore } from "../stores/user";
import { useAuthStore } from "../stores/auth";
import { CardUser } from "../components/Card/CardUser";
import { CardUserChat } from "../components/Card/CardUserChat";

export const HomePage = () => {
  const { users } = useUserStore();
  const { payload } = useAuthStore();

  return (
    <Flex gap={5}>
      <Flex
        w="300px"
        h="100vh"
        flexDir="column"
        borderRight={`1px solid ${Colors.BORDER_COLOR}`}
      >
        <Flex
          p="10px"
          alignItems="center"
          flexDir="column"
          gap={3}
          bgColor={Colors.SECONDARY}
          borderBottom={`1px solid ${Colors.BORDER_COLOR}`}
        >
          <Avatar />

          <Heading size="md">{payload.username}</Heading>

          {/* 
            perfil: 
            notificação: 
            sair: 
          */}
        </Flex>

        <Flex
          flexDir="column"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: Colors.SECONDARY,
            },
          }}
        >
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
          <CardUserChat username="teste" ulid="dsadas" isOnline={true} />
        </Flex>
      </Flex>

      <Flex alignItems="center" flexWrap="wrap" gap={3}>
        {users?.map(
          (user) =>
            user.ulid !== payload.ulid && <CardUser key={user.ulid} {...user} />
        )}
      </Flex>
    </Flex>
  );
};
