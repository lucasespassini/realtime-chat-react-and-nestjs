import {
  Controller,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage_icons } from 'src/config/multer.config';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Request, Response } from 'express';
import { Payload } from 'src/auth/types/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('icon/:username')
  async getImage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('username') username: string,
  ) {
    res.sendFile(await this.usersService.getImage(username));
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('icon', { storage: storage_icons }))
  @Patch('update-icon')
  update(@Req() req: Request, @UploadedFile() icon: Express.Multer.File) {
    return this.usersService.update(req.user as Payload, icon);
  }
}
