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
import { SocketUser } from 'src/auth/types/auth';
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
  users: SocketUser[] = [];

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

    const userConnected: SocketUser = {
      socketId: client.id,
      ulid: user.ulid,
      username: user.username,
      isOnline: true,
    };

    this.users.push(userConnected);
    const filteredUsers = await this.filterUsers();

    const rooms = await this.chatService.findRooms(user.ulid);
    rooms.map(async (room) => await client.join(room));

    this.server.emit('userConnected', {
      userConnected,
      users: filteredUsers,
    });

    this.logger.log(`Client Connected: ${client.id}`);
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket<ServerToClientEvents>,
  ) {
    const userDisconnected = this.users.find(
      (user) => client.id === user.socketId,
    );

    this.users = this.users.filter((user) => user.socketId !== client.id);
    const filteredUsers = await this.filterUsers();

    client.broadcast.emit('userDisconnected', {
      userDisconnected,
      users: filteredUsers,
    });

    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  private async filterUsers() {
    const filteredUsers: SocketUser[] = [];
    const users = await this.prisma.users.findMany({
      select: { usr_ulid: true, usr_username: true },
    });

    for (const user of users) {
      const matchUser = this.users.find(
        (onlineUser) => onlineUser.ulid === user.usr_ulid,
      );

      matchUser
        ? filteredUsers.unshift(matchUser)
        : filteredUsers.push({
            socketId: null,
            ulid: user.usr_ulid,
            username: user.usr_username,
            isOnline: false,
          });
    }

    return filteredUsers;
  }
}
