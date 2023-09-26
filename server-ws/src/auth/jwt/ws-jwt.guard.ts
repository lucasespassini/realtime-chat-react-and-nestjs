import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): any {
    if (context.getType() !== 'ws') return true;

    const client = context.switchToWs().getClient<Socket>();
    const { authorization } = client.handshake.headers;
    const payload = this.authService.isValidAuthHeader(authorization);

    return payload;
  }
}
