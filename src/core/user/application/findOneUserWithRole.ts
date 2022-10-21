import { RoleAttributes } from './../../role/domain/roleEntity';
import { inject, injectable } from "tsyringe";
import { RoleRepository } from "../../role/domain/roleRepository";
import NotFoundError from "../../shared/domain/exceptions/NotFoundError";
import { UserAttributes, UserReadableAttributes } from "../domain/userEntity";
import { UserRepository } from "../domain/userRepository";

interface FindOneUserWithRoleUseCaseResponse extends Omit<UserReadableAttributes, 'role_id'> {
  role: {
    id: string;
    name: string;
  };
}

@injectable()
export class FindOneUserWithRoleUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    @inject('RoleRepository') private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string): Promise<FindOneUserWithRoleUseCaseResponse> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const role = await this.roleRepository.findOne(user.role_id);
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    return this.mapper(user, role);
  }

  mapper(input: UserAttributes, role: RoleAttributes): FindOneUserWithRoleUseCaseResponse {
    return {
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      created_at: input.created_at,
      updated_at: input.updated_at,
      role: {
        id: role.id,
        name: role.name,
      },
    };
  }
}