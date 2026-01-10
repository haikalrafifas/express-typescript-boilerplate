import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Request } from 'express';

const langDir = join(__dirname, 'languages');

// Cache for loaded translations
const translations: Record<string, Record<string, any>> = {};

/**
 * Load translation file for a language and namespace
 */
function loadTranslation(lang: string, namespace: string): Record<string, any> {
  const key = `${lang}_${namespace}`;
  if (translations[key]) {
    return translations[key];
  }

  const filePath = join(langDir, lang, `${namespace}.json`);
  if (!existsSync(filePath)) {
    return {};
  }

  try {
    const data = readFileSync(filePath, 'utf-8');
    translations[key] = JSON.parse(data);
    return translations[key];
  } catch (err) {
    console.error(`Error loading translation file: ${filePath}`, err);
    return {};
  }
}

/**
 * Get translated string
 * @param key - Dot-separated key, e.g., 'auth.login.success'
 * @param lang - Language code, default 'en'
 * @param namespace - Namespace, auto-detected from key if not provided
 */
export function t(
  key: string,
  lang: string = 'en',
  namespace?: string,
): string {
  if (!namespace) {
    const parts = key.split('.');
    if (parts.length > 1) {
      namespace = parts.shift()!;
      key = parts.join('.');
    } else {
      namespace = 'general';
    }
  }

  const trans = loadTranslation(lang, namespace);
  const keys = key.split('.');
  let value: any = trans;

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Fallback to key if not found
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Get translation with placeholders
 * @param key - Translation key
 * @param lang - Language
 * @param placeholders - Object with placeholders, e.g., { name: 'John' }
 */
export function tWithPlaceholders(
  key: string,
  lang: string = 'en',
  placeholders: Record<string, string> = {},
): string {
  let text = t(key, lang);
  for (const [placeholder, value] of Object.entries(placeholders)) {
    text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
  }
  return text;
}

/**
 * Translate using request's language
 * @param req - Express request object
 * @param key - Translation key
 * @param placeholders - Placeholders
 */
export function translate(
  req: Request,
  key: string,
  placeholders: Record<string, string> = {},
): string {
  const lang = (req as any).lang || 'en';
  return tWithPlaceholders(key, lang, placeholders);
}
