import { SocketUser } from 'src/auth/types/auth';

type ConnectionParams = {
  userDisconnected?: SocketUser;
  userConnected?: SocketUser;
  users: SocketUser[];
};

export interface ServerToClientEvents {
  userDisconnected: (connectionParams: ConnectionParams) => void;
  userConnected: (connectionParams: ConnectionParams) => void;
  receivedMessage: () => void;
}
