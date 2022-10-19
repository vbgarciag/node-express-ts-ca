import { Optional } from './../../../types/common.d';
export interface UserAttributes {
  id: string; // based on uuid
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;