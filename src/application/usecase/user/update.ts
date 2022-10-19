import { UserCreationAttributes } from './../../../domain/entities/user';
import { autoInjectable, inject } from "tsyringe";
import { UserAttributes } from "../../../domain/entities/user";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import RequestConflictError from "../../../domain/exceptions/RequestConflictError";
import { UserRepository } from "../../../domain/repositories/user";

@autoInjectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, data: Partial<UserCreationAttributes>): Promise<UserAttributes> {
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
    return this.userRepository.update(id, data);
  }
}