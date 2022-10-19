import { container, delay } from 'tsyringe'
import { UserRepository } from '../../../domain/repositories/user';
import InMemoryUserRepository from '../../../infrastructure/implementations/data-access-layer/inMemory/repositories/user';

container.register<UserRepository>('UserRepository', {
  useClass: delay(() => InMemoryUserRepository)
});