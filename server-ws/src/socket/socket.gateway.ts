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
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server;

  users: SocketUser[] = [];

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userDisconnected = this.users.find(
      (user) => client.id === user.socketId,
    );

    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.server.emit('userDisconnected', userDisconnected);
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) return;

    const user = await this.authService.decodeToken(token);

    const userConnected = {
      socketId: client.id,
      ulid: user.usr_ulid,
      username: user.usr_username,
    };

    this.users.push(userConnected);
    this.server.emit('userConnected', userConnected);
    this.logger.log(`Client Connected: ${client.id}`);
  }
}
