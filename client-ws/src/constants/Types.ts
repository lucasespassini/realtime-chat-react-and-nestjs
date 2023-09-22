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

export type UserConnect = {
  userConnected: SocketUser;
  users: SocketUser[];
};

export type UserDisconnect = {
  userDisconnected: SocketUser;
  users: SocketUser[];
};

export type ErrorMessage = {
  error?: { status?: number };
  message: string;
};
