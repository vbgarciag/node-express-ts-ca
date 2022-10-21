import { singleton } from "tsyringe";
import { UserAttributes, UserCreationAttributes } from "../domain/userEntity";
import { UserRepository } from "../domain/userRepository";

@singleton()
export default class InMemoryUserRepository implements UserRepository {
  private users: UserAttributes[] = [];

  async create(input: UserCreationAttributes): Promise<UserAttributes> {
    const user = {
      ...input,
      id: Math.random().toString(36).substring(7),
      password: null,
      password_salt: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<UserAttributes | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async update(id: string, input: Partial<UserCreationAttributes>, ): Promise<UserAttributes> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = {
      ...user,
      ...input,
      updated_at: new Date(),
    };
    this.users = this.users.map((user) => user.id === id ? updatedUser : user);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
    return Promise.resolve();
  }

  async findOne(id: string): Promise<UserAttributes | null> {
    return Promise.resolve(this.users.find((user) => user.id === id) || null);
  }
  
  async findAll(): Promise<UserAttributes[]> {
    return this.users;
  }
}