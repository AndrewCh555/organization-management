import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async register(@Body() signUpDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.registration(signUpDto);
  }

  @Post('login')
  async login(@Body() signUpDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.login(signUpDto);
  }
}
