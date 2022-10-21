import { inject, injectable } from "tsyringe";
import RequestConflictError from "../../shared/domain/exceptions/RequestConflictError";
import { PasswordEncrypterService } from "../../shared/domain/services/passwordEncrypter";
import { TokenService } from "../../shared/domain/services/token";
import { UserRepository } from "../domain/userRepository";

interface SetUpPasswordInputParams { token: string, password: string};
@injectable()
export class SetUpPassword {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    @inject('PasswordEncrypterService') private readonly passwordEncrypter: PasswordEncrypterService,
    @inject('TokenService') private readonly tokenService: TokenService<{ id: string, email: string }>,
  ) {}

  async execute({ 
    token, 
    password 
  }: SetUpPasswordInputParams): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = await this.tokenService.verifyToken(token);

    if (! decoded) {
      throw new RequestConflictError('Invalid token');
    }

    const user = await this.userRepository.findOne(decoded.id);

    if (!user) {
      throw new RequestConflictError('Invalid token');
    }

    const { hash, salt } = await this.passwordEncrypter.encryptPassword(password);

    await this.userRepository.update(
      decoded.id,
      { password: hash, password_salt: salt },
    );

    const accessToken = await this.tokenService.generateToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}