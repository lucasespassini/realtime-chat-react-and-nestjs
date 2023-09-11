import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessageModule,
    SocketModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
