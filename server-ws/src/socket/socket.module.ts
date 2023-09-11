import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, AuthModule],
  providers: [SocketGateway],
})
export class SocketModule {}
