import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as util from 'node:util';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/schemas/user.schema';

const encryptIterations = 50_000;
const encryptKeyLength = 64;
const encryptDigest = 'sha512';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.encryptPassword(dto.password);
    return await this.userService.createUser(dto);
  }

  async login(dto: CreateUserDto): Promise<CreateUserDto> {
    const user: User = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Login User not found');
    }

    if (!(await this.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }
    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };
    return this.jwtService.sign(payload);
  }

  private async encryptPassword(plainPassword: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      plainPassword,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );

    return salt + ':' + encryptedPassword.toString('hex');
  }

  private async checkPassword(
    password: string,
    existPassword: string,
  ): Promise<boolean> {
    const [salt, key] = existPassword.split(':');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      password,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );
    return key === encryptedPassword.toString('hex');
  }
}
