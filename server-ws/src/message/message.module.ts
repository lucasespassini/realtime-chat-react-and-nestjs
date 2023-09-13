import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [AuthModule, SocketModule],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
