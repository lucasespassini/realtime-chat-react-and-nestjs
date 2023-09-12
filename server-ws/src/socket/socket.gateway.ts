import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { SocketUser } from 'src/auth/auth.interface';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}
  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server;

  users: SocketUser[] = [];

  handleDisconnect(client: Socket) {
    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.server.emit('showUsers', this.users);

    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) return;

    const decodedUser = this.authService.decodeToken(token);

    this.users.push({
      socketId: client.id,
      ulid: decodedUser.ulid,
      username: decodedUser.username,
    });

    this.server.emit('showUsers', this.users);

    this.logger.log(`Client Connected: ${client.id}`);
  }
}
