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
import { SocketGateway } from 'src/socket/socket.gateway';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class ChatGateway {
  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket<any, ServerToClientEvents>,
    @MessageBody() payload: SendMessagePayload,
  ) {
    const { authorization } = client.handshake.headers;
    const authenticatedUser = this.authService.isValidAuthHeader(authorization);

    await this.chatService.createMessage(authenticatedUser, payload);

    this.socketGateway.server
      .to(client.id)
      .to(payload.user.usr_socket_id)
      .emit('receivedMessage', {
        message: payload.message,
        user: payload.user,
      });
  }
}
