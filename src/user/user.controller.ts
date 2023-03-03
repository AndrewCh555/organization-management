import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthUser } from './decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

export enum StrategiesEnum {
  JWT = 'jwt',
}

@Controller('user')
@UseGuards(AuthGuard(StrategiesEnum.JWT))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Get('me')
  async getMyProfile(@AuthUser() user): Promise<CreateUserDto> {
    return await this.userService.getUserById(user._id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
