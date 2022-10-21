import { inject, injectable } from "tsyringe";
import RequestConflictError from "../../shared/domain/exceptions/RequestConflictError";
import { PasswordEncrypterService } from "../../shared/domain/services/passwordEncrypter";
import { TokenService } from "../../shared/domain/services/token";
import { UserAttributes } from "../../user/domain/userEntity";
import { UserRepository } from "../../user/domain/userRepository";

interface SignInInputParams {
  email: string, password: string
}
interface CreateUserOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
type TokenPayloadParams = Omit<UserAttributes, 
  'password' | 
  'password_salt' | 
  'created_at' | 
  'updated_at'>;

@injectable()
export default class SignInUseCase {
  constructor(
    @inject('TokenService') private readonly tokenService: TokenService<TokenPayloadParams>,
    @inject('PasswordEncrypterService') private readonly passwordEncrypter: PasswordEncrypterService,
    @inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute({
    email,
    password
  }: SignInInputParams): Promise<{ token: string, user: CreateUserOutput }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new RequestConflictError('Invalid credentials');
    const isValidPassword = await this.passwordEncrypter.comparePassword(password, user.password!);
    if (!isValidPassword) throw new RequestConflictError('Invalid credentials');
    const token = await this.tokenService.generateToken(user);
    return { 
      token,
      user: this.mapper(user),
    };
  }

  mapper(input: UserAttributes): CreateUserOutput {
    return {
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
    };
  }
}