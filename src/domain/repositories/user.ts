import { UserAttributes, UserCreationAttributes } from "../entities/user";
import { BaseRepository } from "./base";

export interface UserRepository extends BaseRepository<UserCreationAttributes, UserAttributes> {
  findByEmail: (email: string) => Promise<UserAttributes | null>;
}