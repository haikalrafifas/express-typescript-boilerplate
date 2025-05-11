import { User, UserData } from '@/models/user-model';
const crypto = require('@/utilities/crypto');
const jwt = require('@/utilities/jwt');
const jwtConfig = require('@/config/jwt');
const toResource = require('@/utilities/resource');
const userResource = require('@/resources/user-resource');

exports.findUserByEmail = async (
  email: string,
): Promise<UserData | null> => {
  return await User.query().findOne({ email });
};

exports.findUserByRefreshToken = async (
  refreshToken: string,
): Promise<UserData | null> => {
  return await User.query().findByOne({ remember_token: refreshToken });
};

exports.register = async (
  user: any,
): Promise<UserData> => {
  return await User.query().insert(user);
};

exports.verify = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await crypto.compare(password, hashedPassword);
};

interface TokenData {
  type: string;
  access: string;
  refresh: string;
  expiresIn: string;
}

exports.authenticate = async (
  user: any,
): Promise<Record<string, Partial<UserData> | TokenData>> => {
  // filter visible columns
  const visibleColumns = ['id', 'email', 'role', 'last_email_verify_requested_at'];
  const userData = toResource(user, { only: visibleColumns });

  // sign token
  const accessToken = jwt.access.sign(userData);
  const refreshToken = jwt.refresh.sign();

  // update refresh token on the database
  await User.query().findById(user.id).patch({ remember_token: refreshToken });

  return {
    user: toResource(user, userResource),
    token: {
      type: 'bearer',
      access: accessToken,
      refresh: refreshToken,
      expiresIn: jwtConfig.access.ttl,
    },
  };
};
