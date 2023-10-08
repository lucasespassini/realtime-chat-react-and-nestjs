import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketAuthMiddleware } from 'src/auth/jwt/ws.middleware';
import { ServerToClientEvents } from './types/events';
import { WsJwtGuard } from 'src/auth/jwt/ws-jwt.guard';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
@Injectable()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server<ServerToClientEvents>;

  afterInit(@ConnectedSocket() client: Socket) {
    client.use(SocketAuthMiddleware(this.authService) as any);
  }

  async handleConnection(
    @ConnectedSocket() client: Socket<ServerToClientEvents>,
  ) {
    const { authorization } = client.handshake.headers;
    const user = this.authService.isValidAuthHeader(authorization);

    const userConnected = await this.prisma.users.update({
      select: { usr_socket_id: true, usr_ulid: true, usr_username: true },
      data: { usr_socket_id: client.id },
      where: { usr_ulid: user.ulid },
    });

    const users = await this.prisma.users.findMany({
      select: { usr_socket_id: true, usr_ulid: true, usr_username: true },
    });

    const rooms = await this.chatService.findRooms(user.ulid);
    rooms.map(async (room) => await client.join(room));

    this.server.emit('userConnected', {
      userConnected,
      users,
    });

    this.logger.log(`Client Connected: ${client.id}`);
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket<ServerToClientEvents>,
  ) {
    const { authorization } = client.handshake.headers;
    const user = this.authService.isValidAuthHeader(authorization);

    const userDisconnected = await this.prisma.users.update({
      select: { usr_socket_id: true, usr_ulid: true, usr_username: true },
      data: { usr_socket_id: null },
      where: { usr_ulid: user.ulid },
    });

    const users = await this.prisma.users.findMany({
      select: { usr_socket_id: true, usr_ulid: true, usr_username: true },
    });

    client.broadcast.emit('userDisconnected', {
      userDisconnected,
      users,
    });

    this.logger.log(`Client Disconnected: ${client.id}`);
  }
}
