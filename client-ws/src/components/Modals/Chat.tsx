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

const ModalChat: ForwardRefRenderFunction<ModalHandle> = (_props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket } = useAuthStore();
  const { user } = useChatStore();

  const bottomRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  console.log(user);
  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  const scrollToBottom = useCallback(
    () => bottomRef.current.scrollIntoView({ behavior: "smooth" }),
    []
  );

  const sendMessage = useCallback(() => {
    const message = messageInputRef.current.value;

    socket.emit("sendMessage", {
      message,
      user,
    });

    scrollToBottom();

    return () => socket.off("sendMessage");
  }, [scrollToBottom, socket, user]);

  useEffect(() => {
    socket.on("receivedMessage", (message) => {
      console.log(message);
    });
  }, [socket]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Avatar />

          <Flex w="100%" flexDir="column" alignItems="flex-start" gap={1}>
            <Heading size="md">{user?.username}</Heading>
            <Badge
              colorScheme={user?.isOnline ? "green" : "red"}
              fontSize=".6rem"
            >
              {user?.isOnline ? "Online" : "Offline"}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody display="flex" flexDir="column" gap={2} overflow="auto">
          <Flex
            alignSelf="flex-end"
            maxW="75%"
            p={4}
            bg={Colors.SECONDARY}
            borderRadius={10}
            borderTopLeftRadius={0}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque quo
            amet, ex ullam ipsum quae, numquam quas eaque assumenda quibusdam
            facilis nihil quaerat molestiae placeat repellendus. Illum esse
            accusantium maxime!
          </Flex>

          <Flex
            alignSelf="flex-start"
            maxW="75%"
            p={4}
            bg={Colors.SECONDARY}
            borderRadius={10}
            borderTopLeftRadius={0}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque quo
            amet, ex ullam ipsum quae, numquam quas eaque assumenda quibusdam
            facilis nihil quaerat molestiae placeat repellendus. Illum esse
            accusantium maxime!
          </Flex>

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
