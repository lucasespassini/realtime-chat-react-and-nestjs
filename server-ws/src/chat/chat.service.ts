import { Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagePayload } from './types/messages';
import { ulid } from 'ulid';
import { DateTime } from 'luxon';

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

  async createMessage(authenticatedUser: Payload, payload: SendMessagePayload) {
    const { usr_id: authenticatedUserId } = await this.prisma.users.findUnique({
      select: { usr_id: true },
      where: { usr_ulid: authenticatedUser.ulid },
    });
    const { usr_id: payloadId } = await this.prisma.users.findUnique({
      select: { usr_id: true },
      where: { usr_ulid: payload.user.ulid },
    });

    const { cvt_ulid } = await this.prisma.conversations.create({
      data: {
        cvt_ulid: ulid(),
        messages: {
          create: {
            msg_usr_id: authenticatedUserId,
            msg_content: payload.message,
          },
        },
        conversation_participants: {
          createMany: {
            data: [
              { cvp_usr_id: authenticatedUserId },
              { cvp_usr_id: payloadId },
            ],
          },
        },
      },
      select: { cvt_ulid: true },
    });

    return cvt_ulid;
  }
}
