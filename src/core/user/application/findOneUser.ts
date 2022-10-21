import { inject, injectable } from "tsyringe";
import NotFoundError from "../../shared/domain/exceptions/NotFoundError";
import { UserAttributes, UserReadableAttributes } from "../domain/userEntity";
import { UserRepository } from "../domain/userRepository";

@injectable()
export class FindOneUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserReadableAttributes> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return this.mapper(user);
  }

  mapper(input: UserAttributes): UserReadableAttributes {
    return {
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      created_at: input.created_at,
      updated_at: input.updated_at,
      role_id: input.role_id,
    };
  }
}