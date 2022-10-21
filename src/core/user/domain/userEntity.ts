import { Optional } from '../../../../types/common';
export interface UserAttributes {
  id: string; // based on uuid
  first_name: string;
  last_name: string;
  email: string;
  password: string | null;
  password_salt: string | null;
  role_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'password' | 'password_salt'>;
export type UserReadableAttributes = Optional<UserAttributes, 'password' | 'password_salt'>;