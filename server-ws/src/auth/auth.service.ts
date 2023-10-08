import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { ulid } from 'ulid';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { Payload } from './types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  isValidAuthHeader(authorization: string) {
    const token = authorization.split(' ')[1];
    return this.jwtService.verify<Payload>(token);
  }

  async signup(authDto: AuthDto) {
    if (!authDto.username || !authDto.password) throw new BadRequestException();

    const user = await this.prisma.users.findUnique({
      where: { usr_username: authDto.username },
    });

    if (user)
      throw new NotFoundException('Usuário com mesmo nome já cadastrado!');

    const newUser = await this.prisma.users.create({
      data: {
        usr_ulid: ulid(),
        usr_username: authDto.username,
        usr_password: hashSync(authDto.password, 10),
      },
    });

    const payload: Payload = {
      ulid: newUser.usr_ulid,
      username: newUser.usr_username,
      icon: newUser.usr_icon,
    };

    return { token: this.jwtService.sign(payload), payload };
  }

  async signin(authDto: AuthDto) {
    if (!authDto.username || !authDto.password) throw new BadRequestException();

    const user = await this.prisma.users.findUnique({
      where: { usr_username: authDto.username },
    });

    if (!user) throw new NotFoundException('Usuário não existe!');

    if (!compareSync(authDto.password, user.usr_password))
      throw new BadRequestException('Senha incorreta!');

    const payload: Payload = {
      ulid: user.usr_ulid,
      username: user.usr_username,
      icon: user.usr_icon,
    };

    return { token: this.jwtService.sign(payload), payload };
  }
}
