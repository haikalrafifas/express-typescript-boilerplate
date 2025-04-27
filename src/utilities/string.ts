// String manipulation utility

/**
 * Capitalize first character.
 */
exports.ucfirst = (string: string): string => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};
