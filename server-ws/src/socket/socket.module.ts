import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';

@Global()
@Module({
  imports: [AuthModule, ChatModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
