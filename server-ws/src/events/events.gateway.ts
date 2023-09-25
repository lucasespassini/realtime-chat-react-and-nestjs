import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerToClientEvents } from './types/events';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('EventsGateway');

  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  handleConnection(
    @ConnectedSocket() client: Socket<any, ServerToClientEvents>,
  ) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(
    @ConnectedSocket() client: Socket<any, ServerToClientEvents>,
  ) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  // sendMessage(message) {
  //   this.
  // }
}
