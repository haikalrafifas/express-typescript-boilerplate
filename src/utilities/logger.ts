import { ucfirst } from './string';

const logEnabled = (process.env.ENABLE_LOG || 'true') === 'true';

/**
 * Utility on top of `console` function.
 * Sends log to terminal.
 *
 * @param level
 * @param args
 */
const _log = (level: keyof Console, ...args: any[]): void => {
  if (logEnabled) {
    // Get the current timestamp in Y-m-d H:i:s format
    const timestamp = new Date().toISOString().slice(0, -1).replace('T', ' ');

    // Prepend timestamp and log level
    args.unshift(`[${timestamp}] ${ucfirst(level)}:`);

    // Output the log to the console
    (console[level] as (...args: any[]) => void)(...args);
  }
};

export const log = (...args: any[]): void => _log('log', ...args);
export const info = (...args: any[]): void => _log('info', ...args);
export const error = (...args: any[]): void => _log('error', ...args);
