import { Socket } from 'socket.io';
import { AuthService } from '../auth.service';

export type SocketIOMiddleware = {
  (client: Socket, next: (error?: Error) => void);
};

export const SocketAuthMiddleware = (
  authService: AuthService,
): SocketIOMiddleware => {
  return (client, next) => {
    try {
      const { authorization } = client.handshake.headers;
      authService.isValidAuthHeader(authorization);
      next();
    } catch (error) {
      next(error);
    }
  };
};
