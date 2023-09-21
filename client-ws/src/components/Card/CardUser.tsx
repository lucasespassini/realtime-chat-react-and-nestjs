import { Avatar, Badge, Flex, Heading } from "@chakra-ui/react";
import { PopoverUserActions } from "../Popover/UserActions";
import { Colors } from "../../constants/Colors";
import { SocketUser } from "../../constants/Types";
import { useChatStore } from "../../stores/chat";

export const CardUser = (user: SocketUser) => {
  const { username, isOnline } = user;

  const { setUser } = useChatStore();

  return (
    <PopoverUserActions>
      <Flex
        px={6}
        py={5}
        w="280px"
        alignItems="center"
        justifyContent="flex-start"
        gap={6}
        cursor="pointer"
        bg={Colors.SECONDARY}
        borderRight={`1px solid ${Colors.BORDER_COLOR}`}
        borderBottom={`1px solid ${Colors.BORDER_COLOR}`}
        transition=".2s"
        _hover={{ backgroundColor: Colors.BORDER_COLOR }}
        onClick={() => setUser(user)}
      >
        <Avatar />

        <Flex w="100%" flexDir="column" alignItems="flex-start" gap={2}>
          <Heading size="md">
            {username.substring(0, 11)}
            {username.length > 11 && "..."}
          </Heading>
          <Badge colorScheme={isOnline ? "green" : "red"} fontSize=".6rem">
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </Flex>
      </Flex>
    </PopoverUserActions>
  );
};
