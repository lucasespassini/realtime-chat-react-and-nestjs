import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getImage(username: string) {
    const { usr_icon } = await this.prisma.users.findUnique({
      select: { usr_icon: true },
      where: { usr_username: username },
    });

    if (!usr_icon) throw new HttpException('', HttpStatus.NO_CONTENT);

    const imagePath = path.join(
      __dirname,
      '../../public/uploads/icons/',
      usr_icon,
    );

    if (!fs.existsSync(imagePath))
      throw new HttpException('', HttpStatus.NO_CONTENT);

    return imagePath;
  }

  async update(user: Payload, icon: Express.Multer.File) {
    await this.prisma.users.update({
      data: { usr_icon: `/uploads/icons/${icon.filename}` },
      where: { usr_ulid: user.ulid },
    });
  }
}
