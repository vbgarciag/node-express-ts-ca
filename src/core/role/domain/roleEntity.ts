import { Optional } from "../../../../types/common";

export interface RoleAttributes {
  id: string; // based on uuid
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export enum RoleName {
  ADMIN = "ADMIN",
  USER = "USER",
  CLIENT = "CLIENT"
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}