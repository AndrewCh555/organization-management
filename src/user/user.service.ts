import { ConflictException, Injectable } from "@nestjs/common";
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(_id: string): Promise<User> {
    return this.userRepository.findOne({
      _id,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const userEmailCheck = await this.findByEmail(dto.email);
    if (userEmailCheck) {
      throw new ConflictException(`Error create new user`);
    }
        const role = await this.roleService.getUserRole();
    const createdUser = await this.userRepository.create(dto, dto.role.id);
    return this.userRepository.create({
      ...dto,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneEmail(email);

    return user || null;
  }
}
