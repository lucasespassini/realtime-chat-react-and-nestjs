import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessageModule,
    SocketModule,
    AuthModule,
    PrismaModule,
    EventsModule,
    MessagesModule,
  ],
})
export class AppModule {}
