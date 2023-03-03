import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';

@Injectable()
export class RoleService {
  constructor() {}

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async getUserRole(): Promise<Role> {
    return await this.roleRepository.findOneUser();
  }

  async getAdminRole(): Promise<Role> {
    return await this.roleRepository.findOneAdmin();
  }
}
