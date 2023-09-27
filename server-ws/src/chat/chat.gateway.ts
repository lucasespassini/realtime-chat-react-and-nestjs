import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ServerToClientEvents } from 'src/socket/types/events';
import { WsJwtGuard } from 'src/auth/jwt/ws-jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { SendMessagePayload } from './types/messages';
import { ChatService } from './chat.service';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class ChatGateway {
  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket<any, ServerToClientEvents>,
    @MessageBody() payload: SendMessagePayload,
  ) {
    const { authorization } = client.handshake.headers;
    const authenticatedUser = this.authService.isValidAuthHeader(authorization);

    const cvt_id = await this.chatService.createMessage(
      authenticatedUser,
      payload,
    );

    await client.join(cvt_id);

    client.to(payload.user.socketId).emit('receivedMessage', {
      message: payload.message,
      user: payload.user,
      conversationId: cvt_id,
    });
  }
}
