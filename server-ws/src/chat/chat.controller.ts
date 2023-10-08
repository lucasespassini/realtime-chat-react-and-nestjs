import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { Payload } from 'src/auth/types/auth';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/conversations')
  findAllConversations(@Req() req: Request) {
    return this.chatService.findAllConversations(req.user as Payload);
  }

  @Get('/messages/:conversationsULID')
  findMessages(
    @Req() req: Request,
    @Param('conversationsULID') conversationsULID: string,
  ) {
    return this.chatService.findMessages(
      req.user as Payload,
      conversationsULID,
    );
  }
}
