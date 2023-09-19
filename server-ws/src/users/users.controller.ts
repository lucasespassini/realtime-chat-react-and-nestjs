import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/auth.interface';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.usersService.findAll(req.user as Payload);
  }
}
