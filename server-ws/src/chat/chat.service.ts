import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessagePayload } from './types/messages';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllConversations(user: Payload) {
    return this.prisma.users.findMany({
      select: {
        messages_messages_msg_usr_received_idTousers: {
          where: {},
        },
      },
      where: {
        messages_messages_msg_usr_sender_idTousers: {
          some: {
            users_messages_msg_usr_sender_idTousers: { usr_ulid: user.ulid },
          },
        },
      },
    });

    // return this.prisma.messages.findMany({
    //   select: {
    //     msg_content: true,
    //     msg_read: true,
    //     msg_date_send: true,
    //     users_messages_msg_usr_sender_idTousers: {
    //       select: { usr_ulid: true, usr_username: true },
    //     },
    //   },
    //   where: {
    //     OR: [
    //       {
    //         users_messages_msg_usr_sender_idTousers: { usr_ulid: user.ulid },
    //       },
    //       {
    //         users_messages_msg_usr_received_idTousers: { usr_ulid: user.ulid },
    //       },
    //     ],
    //   },
    // });
  }

  // async findAllConversations(user: Payload) {
  //   return this.prisma.conversations.findMany({
  //     select: {
  //       cvt_ulid: true,
  //       messages: {
  //         select: {
  //           msg_content: true,
  //           msg_date_send: true,
  //           users: { select: { usr_ulid: true, usr_username: true } },
  //         },
  //         take: 1,
  //         orderBy: { msg_id: 'desc' },
  //       },
  //       conversation_participants: {
  //         select: { users: { select: { usr_ulid: true, usr_username: true } } },
  //         where: { NOT: { users: { usr_ulid: user.ulid } } },
  //       },
  //     },
  //     where: {
  //       conversation_participants: {
  //         some: {
  //           users: { usr_ulid: user.ulid },
  //         },
  //       },
  //     },
  //   });
  // }

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
    await this.prisma.messages.create({
      data: {
        msg_content: payload.message,
        users_messages_msg_usr_sender_idTousers: {
          connect: { usr_ulid: authenticatedUser.ulid },
        },
        users_messages_msg_usr_received_idTousers: {
          connect: { usr_ulid: payload.user.ulid },
        },
      },
    });
  }
}
