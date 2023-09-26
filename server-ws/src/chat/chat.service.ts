import { Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagePayload } from './types/messages';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async joinRoom(client: Socket, ulid: string) {
    const rooms = await this.prisma.conversation_participants.findMany({
      select: { conversations: true },
      where: { users: { usr_ulid: ulid } },
    });

    rooms.map((room) => client.join(room.conversations.cvt_ulid));
  }

  createMessage(authenticatedUser: Payload, payload: SendMessagePayload) {
    return;
  }
}
