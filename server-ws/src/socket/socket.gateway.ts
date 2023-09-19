import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
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

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userDisconnected = this.users.find(
      (user) => client.id === user.socketId,
    );

    this.users = this.users.filter((user) => user.socketId !== client.id);
    client.broadcast.emit('userDisconnected', userDisconnected);
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = await this.authenticateClient(client);

    if (!user) {
      client.disconnect();
      return;
    }

    const userConnected: SocketUser = {
      socketId: client.id,
      ulid: user.usr_ulid,
      username: user.usr_username,
      isOnline: true,
    };

    this.users.push(userConnected);
    client.broadcast.emit('userConnected', userConnected);
    this.logger.log(`Client Connected: ${client.id}`);
  }

  private authenticateClient(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];

    return !token ? false : this.authService.decodeToken(token);
  }
}
