import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { omit } from 'lodash';
import { User } from 'src/modules/user/entities/user.entity';
import { compare } from 'bcrypt';

const EXPIRE_TIME = 15 * 60 * 1000; // In seconds
const ACCESS_TOKEN_EXPIRE_TIME = '15m';
const REFRESH_TOKEN_EXPIRE_TIME = '20m';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (user && (await compare(loginDto.password, user.password))) {
      const rest = omit(user, 'password');
      return rest;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(user, {
          expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(user, {
          expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: User) {
    const person = await this.userService.findByEmail(user.email);

    return {
      user: person,
      accessToken: await this.jwtService.signAsync(user, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(user, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
