import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
