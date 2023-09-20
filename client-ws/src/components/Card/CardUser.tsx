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
        px={4}
        py={3}
        w="15rem"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={4}
        cursor="pointer"
        bg={Colors.SECONDARY}
        border={`1px solid ${Colors.BORDER_COLOR}`}
        borderRadius="10px"
        onClick={() => setUser(user)}
      >
        <Avatar />

        <Flex w="100%" flexDir="column" alignItems="flex-start" gap={1}>
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
