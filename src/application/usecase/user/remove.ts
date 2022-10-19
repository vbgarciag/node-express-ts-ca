import { inject, injectable } from "tsyringe";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import { UserRepository } from "../../../domain/repositories/user";

@injectable()
export class RemoveUserUseCase {
    constructor(
        @inject('UserRepository') private readonly userRepository: UserRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        await this.userRepository.delete(id);
    }
}