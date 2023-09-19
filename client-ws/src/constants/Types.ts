export type ModalHandle = {
  onOpen: () => void;
  onClose: () => void;
};

export type SocketUser = {
  socketId?: string;
  ulid: string;
  username: string;
  isOnline: boolean;
};

export type NewMessage = {
  user: {
    ulid: string;
    username: string;
  };
  message: string;
  conversationUlid: string;
};
