import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient<Socket>();
    const token = client.handshake.query.token;
    console.log(client);
    const userDecoded = this.authService.decodeToken(token as string);

    if (userDecoded instanceof WsException) client.disconnect();

    return next.handle();
  }
}
