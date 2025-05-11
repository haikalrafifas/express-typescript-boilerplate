const Model = require('@/config/database/orm');

export interface UserData {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  verification_token?: string;
  email_verified_at?: Date | null;
  last_email_verify_requested_at?: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export class User extends Model {
  static softDelete = true;
  static tableName = 'users';
}
