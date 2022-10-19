import { inject, injectable } from "tsyringe";
import { UserAttributes } from "../../../domain/entities/user";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import { UserRepository } from "../../../domain/repositories/user";

@injectable()
export class FindOneUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserAttributes> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}