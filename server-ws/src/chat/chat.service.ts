import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagePayload } from './types/messages';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllConversations(user: Payload) {
    return this.prisma.conversations.findMany({
      select: {
        cvt_ulid: true,
        messages: {
          select: {
            msg_content: true,
            msg_date_send: true,
            users: {
              select: { usr_ulid: true, usr_username: true },
            },
          },
          take: 1,
          orderBy: { msg_id: 'desc' },
        },
        conversation_participants: {
          select: {
            users: {
              select: {
                usr_ulid: true,
                usr_socket_id: true,
                usr_username: true,
                usr_icon: true,
              },
            },
          },
          where: { NOT: { users: { usr_ulid: user.ulid } } },
        },
      },
      where: {
        conversation_participants: {
          some: {
            users: { usr_ulid: user.ulid },
          },
        },
      },
    });
  }

  async findMessages(user: Payload) {
    return this.prisma.messages.findMany({
      select: {
        msg_content: true,
        msg_read: true,
        msg_date_send: true,
        users: {
          select: { usr_ulid: true, usr_username: true, usr_icon: true },
        },
      },
      where: {
        conversations: {
          conversation_participants: {
            some: { users: { usr_ulid: user.ulid } },
          },
        },
      },
    });
  }

  async findRooms(usr_ulid: string) {
    const rooms: string[] = [];
    const conversations = await this.prisma.conversation_participants.findMany({
      select: { conversations: true },
      where: { users: { usr_ulid } },
    });

    for (const conversation of conversations)
      rooms.push(conversation.conversations.cvt_ulid);

    return rooms;
  }

  async createMessage(authenticatedUser: Payload, payload: SendMessagePayload) {
    return this.prisma.$transaction(async (tx) => {
      const { cvt_ulid } = await tx.conversations.create({
        data: {
          cvt_ulid: ulid(),
          messages: {
            create: {
              msg_content: payload.message,
              users: { connect: { usr_ulid: authenticatedUser.ulid } },
            },
          },
        },
      });

      await Promise.all([
        tx.conversation_participants.create({
          data: {
            users: { connect: { usr_ulid: authenticatedUser.ulid } },
            conversations: { connect: { cvt_ulid } },
          },
        }),
        tx.conversation_participants.create({
          data: {
            users: { connect: { usr_ulid: payload.user.usr_ulid } },
            conversations: { connect: { cvt_ulid } },
          },
        }),
      ]);

      return cvt_ulid;
    });
  }
}
