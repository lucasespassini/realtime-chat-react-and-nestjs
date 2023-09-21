import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors";
import { SocketUser } from "../../constants/Types";
import { useChatStore } from "../../stores/chat";

export const CardUserChat = (user: SocketUser) => {
  const { username } = user;

  const lastMessage = "Last messageeeeee e eeeeeeeee e e e e e";

  const { setUser } = useChatStore();

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      gap={5}
      cursor="pointer"
      transition=".2s"
      _hover={{ backgroundColor: Colors.SECONDARY }}
      onClick={() => setUser(user)}
    >
      <Avatar ml={5} size="md" />

      <Flex
        position="relative"
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
            .substring(0, 27)
            .concat(lastMessage.length > 27 ? "..." : "")}
        </Text>

        <Box
          position="absolute"
          mr={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          top="calc(50% - 10px)"
          right="0"
          w="20px"
          h="20px"
          bgColor={Colors.BORDER_COLOR}
          borderRadius={999}
          fontSize=".9rem"
        >
          4
        </Box>
      </Flex>
    </Flex>
  );
};
