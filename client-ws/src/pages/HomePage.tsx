import { Avatar, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import { CardUser } from "../components/Card/CardUser";
import { CardUserChat } from "../components/Card/CardUserChat";
import { MessageInput } from "../components/Form/MessageInput";
import { useConversationsQuery } from "../query/useConversationsQuery";
import { useUserStore } from "../stores/user";
import { useAuthStore } from "../stores/auth";

export const HomePage = () => {
  const { users } = useUserStore();
  const { payload } = useAuthStore();
  const { data: { conversations } = {} } = useConversationsQuery();

  const [search, setSearch] = useState("");

  const filteredUsers =
    search.length > 0
      ? users.filter(
          (user) =>
            user.username.toUpperCase().indexOf(search.toUpperCase()) > -1
        )
      : [];

  return (
    <Flex>
      <Flex
        minW="350px"
        h="100vh"
        flexDir="column"
        borderRight={`1px solid ${Colors.BORDER_COLOR}`}
      >
        <Flex
          p="15px"
          alignItems="center"
          flexDir="column"
          gap={3}
          bgColor={Colors.SECONDARY}
          borderBottom={`1px solid ${Colors.BORDER_COLOR}`}
        >
          <Avatar />

          <Heading size="md">{payload.username}</Heading>
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
          {/* {conversations?.map((conversation) => (
            <CardUserChat key={conversation.cvt_ulid} {...conversation} />
          ))} */}
        </Flex>
      </Flex>

      <Flex width="100%" flexDir="column">
        <Flex mx="30%" my={3}>
          <MessageInput
            placeholder="Pesquisar usuário"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>

        <Flex
          alignContent="flex-start"
          justifyContent="center"
          flexWrap="wrap"
          overflow="auto"
        >
          {filteredUsers.length > 0 || search.length > 0
            ? filteredUsers?.map(
                (user) =>
                  user.ulid !== payload.ulid && (
                    <CardUser key={user.ulid} {...user} />
                  )
              )
            : users?.map(
                (user) =>
                  user.ulid !== payload.ulid && (
                    <CardUser key={user.ulid} {...user} />
                  )
              )}
        </Flex>
      </Flex>
    </Flex>
  );
};
