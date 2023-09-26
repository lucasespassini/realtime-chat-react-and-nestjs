import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SocketModule,
    AuthModule,
    PrismaModule,
    MessagesModule,
  ],
})
export class AppModule {}
