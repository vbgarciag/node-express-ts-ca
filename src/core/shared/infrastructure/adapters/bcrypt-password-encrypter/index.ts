import Bcryptjs from 'bcryptjs';
import { PasswordEncrypterService } from '../../../domain/services/passwordEncrypter';

export default class BcryptjsService implements PasswordEncrypterService {
  private readonly bcryptjs: typeof Bcryptjs;

  constructor() {
    this.bcryptjs = Bcryptjs;
  }

  async encryptPassword(password: string): Promise<{ hash: string }> {
    const hash = await this.bcryptjs.hash(password, 10);
    return { hash };
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.bcryptjs.compare(password, hash);
  }
}