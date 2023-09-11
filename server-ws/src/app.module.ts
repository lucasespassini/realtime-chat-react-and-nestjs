import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MessageModule, SocketModule, AuthModule],
})
export class AppModule {}
