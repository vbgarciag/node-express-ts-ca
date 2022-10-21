
import { BaseRepository } from "../../shared/domain/baseRepository";
import { RoleAttributes, RoleCreationAttributes } from "./roleEntity";

export interface RoleRepository extends BaseRepository<RoleCreationAttributes, RoleAttributes> {
  findByName: (name: string) => Promise<RoleAttributes | null>;
}