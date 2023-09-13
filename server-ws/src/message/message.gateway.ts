import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageDto: MessageDto,
  ) {
    return this.messageService.sendMessage(client, messageDto);
  }
}
