import { SocketUser } from 'src/auth/types/auth';

type ConnectionParams = {
  userDisconnected?: SocketUser;
  userConnected?: SocketUser;
  users: SocketUser[];
};

type ReceivedMessageParams = {
  message: string;
  user: SocketUser;
  conversationId: string;
};

export interface ServerToClientEvents {
  userDisconnected: (connectionParams: ConnectionParams) => void;
  userConnected: (connectionParams: ConnectionParams) => void;
  receivedMessage: (receivedMessageParams: ReceivedMessageParams) => void;
}
