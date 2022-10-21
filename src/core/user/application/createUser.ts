import { inject, injectable } from 'tsyringe';
import { Optional } from '../../../../types/common';
import { RoleRepository } from '../../role/domain/roleRepository';
import RequestConflictError from '../../shared/domain/exceptions/RequestConflictError';
import { TokenService } from '../../shared/domain/services/token';
import { UserAttributes, UserCreationAttributes, UserReadableAttributes } from "../domain/userEntity";
import { UserRepository } from '../domain/userRepository';

interface CreateUserInput 
extends Optional<UserCreationAttributes, 'created_at' | 'updated_at'> {}

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    @inject('RoleRepository') private readonly roleRepository: RoleRepository,
    @inject('TokenService') private readonly tokenService: TokenService<{ id: string, email: string }>,
  ) {}

  async execute(input: CreateUserInput): Promise<{ user: UserReadableAttributes, token: string }> {
    const { email, first_name, last_name, role_id } = input;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new RequestConflictError('User already exists');
    }
    const role = await this.roleRepository.findOne(role_id);
    if (!role) {
      throw new RequestConflictError('Role id provided was not found');
    }
    const user = await this.userRepository.create({
      email,
      first_name,
      last_name,
      role_id,
      created_at: new Date(),
      updated_at: null,
    });

    const token = await this.tokenService.generateToken({ id: user.id, email: user.email });

    return {
      user: this.mapper(user),
      token,
    };
  }

  mapper(input: UserAttributes): UserReadableAttributes {
    return {
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      role_id: input.role_id,
      created_at: input.created_at,
      updated_at: input.updated_at,
    };
  }
}