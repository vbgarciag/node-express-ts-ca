import { UserAttributes, UserReadableAttributes } from './../domain/userEntity';
import { autoInjectable, inject } from "tsyringe";
import NotFoundError from "../../shared/domain/exceptions/NotFoundError";
import RequestConflictError from "../../shared/domain/exceptions/RequestConflictError";
import { UserCreationAttributes } from "../domain/userEntity";
import { UserRepository } from "../domain/userRepository";

@autoInjectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, data: Partial<UserCreationAttributes>): Promise<UserReadableAttributes> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (data.email) {
      const userExistsByEmailAddress = await this.userRepository.findByEmail(data.email);
      if (userExistsByEmailAddress && userExistsByEmailAddress.id !== id) {
        throw new RequestConflictError('Email already in use');
      }
    }
    const updatedUser = await this.userRepository.update(id, data);
    return this.mapper(updatedUser);
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