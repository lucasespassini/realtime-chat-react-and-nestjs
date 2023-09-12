import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { Colors } from "../../constants/Colors";
import { ModalHandle } from "../../constants/Types";
import ModalChat from "../Modals/Chat";

type PopoverUserActionsProps = {
  children: JSX.Element;
};

export const PopoverUserActions = ({ children }: PopoverUserActionsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalChatRef = useRef<ModalHandle>(null);

  const openModalChat = useCallback(() => modalChatRef.current.onOpen(), []);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="auto"
      isLazy
    >
      <ModalChat ref={modalChatRef} />

      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent
        maxW="13rem"
        borderRadius="10px"
        backgroundColor={Colors.SECONDARY}
        border={`1px solid ${Colors.BORDER_COLOR}`}
        onClick={(e) => e.stopPropagation()}
      >
        <PopoverArrow border="0" bg={Colors.SECONDARY} />

        <PopoverBody display="flex" flexDir="column">
          <Button size="sm" variant="outline" color={Colors.WHITE}>
            Ver perfil
          </Button>
          <Button size="sm" onClick={openModalChat}>
            Abrir chat
          </Button>
          <Button size="sm">Adicionar a um grupo</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
