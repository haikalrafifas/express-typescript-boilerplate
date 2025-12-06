import bcrypt from 'bcrypt';

/**
 * Converts string into hashed string
 */
export const hash = async (string: string): Promise<string> => {
  return await bcrypt.hash(string, 10);
};

/**
 * Compares string to a hashed string
 */
export const compare = async (
  string: string,
  hashedString: string,
): Promise<boolean> => {
  return await bcrypt.compare(string, hashedString);
};
