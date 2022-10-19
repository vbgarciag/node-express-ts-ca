import { UserAttributes } from './../../../domain/entities/user';
import { UserRepository } from "../../../domain/repositories/user";
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindAllUsersUseCase {

  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserAttributes[]> {
    return this.userRepository.findAll();
  }
}