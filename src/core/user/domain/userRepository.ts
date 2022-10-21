
import { BaseRepository } from "../../shared/domain/baseRepository";
import { UserAttributes, UserCreationAttributes } from "./userEntity";

export interface UserRepository extends BaseRepository<UserCreationAttributes, UserAttributes> {
  findByEmail: (email: string) => Promise<UserAttributes | null>;
}