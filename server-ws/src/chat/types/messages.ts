import { SocketUser } from 'src/auth/types/auth';

export interface SendMessagePayload {
  message: string;
  user: SocketUser;
}
