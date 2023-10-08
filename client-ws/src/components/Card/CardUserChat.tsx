import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { Colors } from "../../constants/Colors";
import { useChatStore } from "../../stores/chat";
import { Conversation } from "../../query/useConversationsQuery";
import { SocketUser } from "../../constants/Types";
import { PopoverUserActions } from "../Popover/UserActions";

export const CardUserChat = (conversation: Conversation) => {
  const user: SocketUser = {
    usr_ulid: conversation?.conversation_participants[0]?.users.usr_ulid,
    cvt_ulid: conversation?.cvt_ulid,
    usr_socket_id:
      conversation?.conversation_participants[0]?.users?.usr_socket_id,
    usr_username:
      conversation?.conversation_participants[0]?.users.usr_username,
  };

  const { setUser } = useChatStore();

  return (
    <PopoverUserActions>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        cursor="pointer"
        transition=".2s"
        _hover={{ backgroundColor: Colors.SECONDARY }}
        onClick={() => setUser(user)}
      >
        <Avatar
          ml={5}
          size="md"
          src={`${import.meta.env.VITE_BASE_URL}/users/icon/${
            user?.usr_username
          }`}
        />

        <Flex
          position="relative"
          py={3}
          w="100%"
          flexDir="column"
          alignItems="flex-start"
          gap={1}
          borderBottom={`1px solid ${Colors.BORDER_COLOR}`}
        >
          <Flex width="100%" pr={3} justifyContent="space-between">
            <Heading fontSize="1rem">
              {user.usr_username
                ?.substring(0, 25)
                ?.concat(user.usr_username?.length > 25 ? "..." : "")}
            </Heading>

            <Text as="small">
              {DateTime.fromISO(
                conversation?.messages[0]?.msg_date_send
              ).toFormat("HH:mm")}
            </Text>
          </Flex>

          <Text fontSize=".9rem">
            {conversation?.messages[0]?.msg_content
              ?.substring(0, 27)
              ?.concat(
                conversation?.messages[0]?.msg_content?.length > 27 ? "..." : ""
              )}
          </Text>
        </Flex>
      </Flex>
    </PopoverUserActions>
  );
};
