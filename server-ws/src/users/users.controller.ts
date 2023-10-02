import {
  Controller,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage_icons } from 'src/config/multer.config';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/types/auth';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('icon', { storage: storage_icons }))
  @Patch('update-icon')
  update(@Req() req: Request, @UploadedFile() icon: Express.Multer.File) {
    return this.usersService.update(req.user as Payload, icon);
  }
}
