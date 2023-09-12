export type ModalHandle = {
  onOpen: () => void;
  onClose: () => void;
};

export type SocketUser = {
  socketId?: string;
  ulid: string;
  username: string;
  isOnline?: boolean;
};
