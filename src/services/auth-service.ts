const query = require('@/config/query-builder');
const crypto = require('@/utilities/crypto');

exports.authenticate = async (email: string, password: string) => {
  const data = await query('users').where('email', email).first();
  if (!data) return false;

  await crypto.compare(password, data.password);

  return data;
};
