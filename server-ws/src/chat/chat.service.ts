import { Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagePayload } from './types/messages';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async findRooms(ulid: string) {
    const rooms: string[] = [];
    const conversations = await this.prisma.conversation_participants.findMany({
      select: { conversations: true },
      where: { users: { usr_ulid: ulid } },
    });

    for (const conversation of conversations)
      rooms.push(conversation.conversations.cvt_ulid);

    return rooms;
  }

  createMessage(authenticatedUser: Payload, payload: SendMessagePayload) {
    return;
  }
}
