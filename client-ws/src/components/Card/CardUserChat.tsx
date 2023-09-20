import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors";
import { SocketUser } from "../../constants/Types";
import { useChatStore } from "../../stores/chat";

export const CardUserChat = (user: SocketUser) => {
  const { username, isOnline } = user;

  const lastMessage = "Last messageeeee eeeeeeeeeee eeeeee eeeeeeeeee e e e e";

  const { setUser } = useChatStore();

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      gap={3}
      cursor="pointer"
      onClick={() => setUser(user)}
    >
      <Avatar ml={3} size="sm" />

      <Flex
        py={3}
        w="100%"
        flexDir="column"
        alignItems="flex-start"
        gap={1}
        borderBottom={`1px solid ${Colors.BORDER_COLOR}`}
      >
        <Heading fontSize="1rem">
          {username.substring(0, 25).concat(username.length > 25 ? "..." : "")}
        </Heading>

        <Text fontSize=".9rem">
          {lastMessage
            .substring(0, 28)
            .concat(lastMessage.length > 28 ? "..." : "")}
        </Text>
      </Flex>
    </Flex>
  );
};
