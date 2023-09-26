import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SocketModule,
    AuthModule,
    PrismaModule,
    ChatModule,
  ],
})
export class AppModule {}
