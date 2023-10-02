import { Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/types/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async update(user: Payload, icon: Express.Multer.File) {
    await this.prisma.users.update({
      data: { usr_icon: `/uploads/icons/${icon.filename}` },
      where: { usr_ulid: user.ulid },
    });
  }
}
