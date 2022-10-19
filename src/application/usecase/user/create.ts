import { UserCreationAttributes, UserAttributes } from './../../../domain/entities/user';
import { UserRepository } from "../../../domain/repositories/user";
import RequestConflictError from '../../../domain/exceptions/RequestConflictError';
import { Optional } from '../../../../types/common';
import { inject, injectable } from 'tsyringe';

interface CreateUserInput 
extends Optional<UserCreationAttributes, 'created_at' | 'updated_at'> {}

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<UserAttributes> {
    const { email, first_name, last_name, password } = input;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new RequestConflictError('User already exists');
    }
    const user = await this.userRepository.create({
      email,
      first_name,
      last_name,
      password,
      created_at: new Date(),
      updated_at: null,
    });

    return user;
  }
}