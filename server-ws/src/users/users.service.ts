import { Injectable } from '@nestjs/common';
import { Payload, SocketUser } from 'src/auth/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async findAll(authUser: Payload) {
    const filteredUsers: SocketUser[] = [];
    const users = await this.prisma.users.findMany({
      select: { usr_ulid: true, usr_username: true },
    });

    for (const user of users) {
      if (user.usr_ulid === authUser.ulid) continue;

      const matchUser = this.socketGateway.users.find(
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

    return filteredUsers;
  }
}
