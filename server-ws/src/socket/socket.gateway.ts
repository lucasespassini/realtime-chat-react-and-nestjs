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
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server;

  users: SocketUser[] = [];

  async handleDisconnect(@ConnectedSocket() client: Socket) {
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
    const filteredUsers = await this.filterUsers();

    this.server.emit('userConnected', {
      userConnected,
      users: filteredUsers,
    });
    this.logger.log(`Client Connected: ${client.id}`);
  }

  private authenticateClient(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    return !token ? false : this.authService.decodeToken(token);
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
        ? filteredUsers.push(matchUser)
        : filteredUsers.push({
            socketId: null,
            ulid: user.usr_ulid,
            username: user.usr_username,
            isOnline: false,
          });
    }

    filteredUsers.sort((a, b) => {
      if (a.isOnline > b.isOnline) return -1;
      if (a.isOnline < b.isOnline) return 1;
      return 0;
    });

    return filteredUsers;
  }
}
