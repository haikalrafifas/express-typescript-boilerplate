import { v4 as uuidv4 } from 'uuid';

/**
 * Capitalize first character.
 */
export const ucfirst = (string: string): string => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};

/**
 * Generate random alphabet-numeric
 */
export const generateRandomAlphanum = (length: number): string => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
};

/**
 * Generate Universal Unique ID v4
 */
export const generateUUID = (): string => {
  return uuidv4();
};

/**
 * Simple pluralizer based on common English suffix rules
 */
export const pluralize = (domain: string): string => {
  if (domain.endsWith('uth')) {
    return domain;
  } else if (domain.endsWith('y')) {
    // city -> cities, party -> parties
    return domain.slice(0, -1) + 'ies';
  } else if (
    domain.endsWith('s') ||
    domain.endsWith('x') ||
    domain.endsWith('z') ||
    domain.endsWith('ch') ||
    domain.endsWith('sh')
  ) {
    // bus -> buses, box -> boxes
    return domain + 'es';
  } else {
    return domain + 's'; // default: add 's'
  }
};
