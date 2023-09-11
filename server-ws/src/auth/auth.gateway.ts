import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Server, Socket } from 'socket.io';

interface User {
  id: string;
  username: string;
}

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  users: User[] = [];

  @SubscribeMessage('setUsername')
  create(@ConnectedSocket() client: Socket, @MessageBody() username: string) {
    client.data.username = username;
    this.users.push({ id: client.id, username });
    this.server.emit('showUsers', this.users);
    // return this.authService.create(createAuthDto);
  }

  @SubscribeMessage('setUsername')
  findAll() {
    // this.server.emit();
  }
}
