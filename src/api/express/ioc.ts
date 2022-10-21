import { container, delay } from 'tsyringe'
// repository implementations
import InMemoryUserRepository from '../../core/user/infrastructure/inMemoryUserRepository';
import InMemoryRoleRepository from '../../core/role/infrastructure/inMemoryRoleRepository';
// services
import BcryptjsService from '../../core/shared/infrastructure/adapters/bcrypt-password-encrypter';
import JsonWebToken from '../../core/shared/infrastructure/adapters/jwt';

// load all the repositories
container.register('UserRepository', {
  useClass: delay(() => InMemoryUserRepository)
});

container.register('RoleRepository', {
  useClass: delay(() => InMemoryRoleRepository)
})

// load all the services
container.register('PasswordEncrypterService', {
  useClass: delay(() => BcryptjsService)
});

container.register('TokenService', {
  useClass: delay(() => JsonWebToken)
});