import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessageModule,
    SocketModule,
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
})
export class AppModule {}
