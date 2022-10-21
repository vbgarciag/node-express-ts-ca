import { inject, injectable } from 'tsyringe';
import { UserAttributes, UserReadableAttributes } from '../domain/userEntity';
import { UserRepository } from '../domain/userRepository';

@injectable()
export class FindAllUsersUseCase {

  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserReadableAttributes[]> {
    const users = await this.userRepository.findAll();
    return this.mapper(users);
  }

  mapper(input: UserAttributes[]): UserReadableAttributes[] {
    return input.map((user) => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        role_id: user.role_id,
      };
    });
  }
}