import bcrypt from 'bcrypt';
import JWTAuth from '../../../utilities/jwt.js';

import User from '../user/model.js';
import { findByUsername } from '../user/service.js';
import { generateUUID } from '../../../utilities/string/index.js';
import type { TokenUser } from './interface.js';

export { findByUsername };

export const findAccount = async (
  username: string,
  password: string,
): Promise<User | null> => {
  const user = await findByUsername(username);
  if (!user) return null;

  const storedHash = user.password;
  const isMatch = await bcrypt.compare(password, storedHash);

  if (!isMatch) return null;

  return user;
};

export const authenticate = async (user: User) => {
  const payload: TokenUser = {
    sub: user.uuid,
    username: user.username,
    name: user.name,
    image: user.image,
    role: user.role,
  };

  const accessToken = await JWTAuth.access.sign(payload);

  return {
    access: accessToken,
  };
};

export const create = async (user: User): Promise<User> => {
  user.uuid = generateUUID();
  user.password = await bcrypt.hash(user.password, 10);
  if (user.image) delete user.image;
  return await User.query().insert(user).returning('*');
};
