export type ModalHandle = {
  onOpen: () => void;
  onClose: () => void;
};

export type SocketUser = {
  usr_socket_id?: string;
  usr_ulid: string;
  usr_username: string;
};

export type ClientToServerEvents = {
  sendMessage: (data: SendMessage) => void;
  receivedMessage: (data: ReceivedMessage) => void;
};

export type SendMessage = {
  conversationId?: string;
  message: string;
  user: SocketUser;
};

export type ReceivedMessage = {
  conversationId: string;
  message: string;
  user: SocketUser;
};

export type UserConnect = {
  userConnected: SocketUser;
  users: SocketUser[];
};

export type UserDisconnect = {
  userDisconnected: SocketUser;
  users: SocketUser[];
};
