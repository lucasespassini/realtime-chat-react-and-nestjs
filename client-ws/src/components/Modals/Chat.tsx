/* eslint-disable react-refresh/only-export-components */
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useRef,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ModalHandle } from "../../constants/Types";
import { Colors } from "../../constants/Colors";
import { useChatStore } from "../../stores/chat";
import { useAuthStore } from "../../stores/auth";
import { useMessagesQuery } from "../../query/useMessagesQuery";
import { DateTime } from "luxon";

const ModalChat: ForwardRefRenderFunction<ModalHandle> = (_props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket, payload } = useAuthStore();
  const { user, setUser } = useChatStore();
  const { data: { messages } = {} } = useMessagesQuery(user?.cvt_ulid);

  const bottomRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const message = messageInputRef.current.value;

    socket.emit("sendMessage", {
      message,
      user,
    });

    messageInputRef.current.value = "";
    return () => socket.off("sendMessage");
  }, [socket, user]);

  const resetModal = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetModal}>
      <ModalOverlay />
      <ModalContent
        maxW="40rem"
        h="75vh"
        color={Colors.WHITE}
        bg={Colors.PRIMARY}
        border={`1px solid ${Colors.BORDER_COLOR}`}
      >
        <ModalCloseButton />

        <ModalHeader display="flex" alignItems="center" gap={5}>
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/users/icon/${
              user?.usr_username
            }`}
          />

          <Flex w="100%" flexDir="column" alignItems="flex-start" gap={1}>
            <Heading size="md">{user?.usr_username}</Heading>
            <Badge
              colorScheme={user?.usr_socket_id ? "green" : "red"}
              fontSize=".6rem"
            >
              {user?.usr_socket_id ? "Online" : "Offline"}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody
          display="flex"
          flexDir="column"
          gap={2}
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
          {messages?.map((message, i) => (
            <Flex
              key={i}
              maxW="75%"
              p={4}
              alignSelf={
                payload.ulid === message.users.usr_ulid
                  ? "flex-end"
                  : "flex-start"
              }
              flexDir="column"
              bg={Colors.SECONDARY}
              borderRadius={10}
              borderTopLeftRadius={
                payload.ulid === message.users.usr_ulid ? 10 : 0
              }
              borderTopRightRadius={
                payload.ulid === message.users.usr_ulid ? 0 : 10
              }
            >
              <Text>{message.msg_content}</Text>
              <Box as="small" fontSize=".7rem" textAlign="end">
                {DateTime.fromISO(message.msg_date_send).toFormat(
                  "dd/MM/yyyy HH:mm"
                )}
              </Box>
            </Flex>
          ))}

          <Box ref={bottomRef} />
        </ModalBody>

        <ModalFooter gap={4}>
          <Input
            ref={messageInputRef}
            size="sm"
            bg={Colors.SECONDARY}
            borderRadius={999}
            border={`1px solid ${Colors.BORDER_COLOR}`}
            placeholder="Escreva sua mensagem"
            _focusVisible={{}}
            _hover={{}}
          />

          <Flex
            m={-1}
            p={1}
            borderRadius={999}
            cursor="pointer"
            onClick={sendMessage}
          >
            <RiSendPlane2Fill size={24} color={Colors.BORDER_COLOR} />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalChat);
