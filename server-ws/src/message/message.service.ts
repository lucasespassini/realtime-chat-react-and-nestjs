import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { ulid } from 'ulid';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async sendMessage(client: Socket, messageDto: MessageDto) {
    // const token = client.handshake.headers.authorization?.split(' ')[1];
    // if (!token) return;
    // const user = await this.authService.decodeToken(token);
    // const userSocket = await this.prisma.users.findUnique({
    //   where: { usr_ulid: messageDto.user.ulid },
    // });
    // const conversation = await this.prisma.conversations.create({
    //   data: {
    //     cvt_ulid: ulid(),
    //     conversation_participants: {
    //       createMany: {
    //         data: [
    //           { cvp_usr_id: user.usr_id },
    //           { cvp_usr_id: userSocket.usr_id },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await this.prisma.messages.create({
    //   data: {
    //     msg_content: messageDto.message,
    //     users: { connect: { usr_ulid: user.usr_ulid } },
    //   },
    // });
    // client.join(conversation.cvt_ulid);
    // this.socketGateway.server.to(messageDto.user.socketId).emit('newMessage', {
    //   user: {
    //     ulid: user.usr_ulid,
    //     username: user.usr_username,
    //   },
    //   message: messageDto.message,
    //   conversationUlid: conversation.cvt_ulid,
    // });
  }
}
