import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('setUsername')
  create(@ConnectedSocket() client: Socket, @MessageBody() username: string) {
    client.data.username = username;

    // return this.authService.create(createAuthDto);
  }

  @SubscribeMessage('setUsername')
  findAll() {
    // this.server.emit();
  }
}
