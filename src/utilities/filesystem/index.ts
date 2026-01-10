/**
 * Cloud storage library.
 */
import { getStorage } from '../../config/filesystem.js';

type StorageAction = 'upload' | 'remove' | 'update';
const doFile = async (action: StorageAction, ...args: any[]): Promise<any> => {
  const storage = await getStorage();
  const medium = await import(`./${storage.driver}.js`);

  if (typeof medium[action] !== 'function') {
    throw new Error(
      `Driver '${storage.driver}' does not implement action '${action}()'`,
    );
  }

  return await medium[action](...args);
};

export const upload = async (...args: UploadArgs) =>
  await doFile('upload', ...args);
export const remove = async (...args: RemoveArgs) =>
  await doFile('remove', ...args);
export const update = async (...args: UpdateArgs) =>
  await doFile('update', ...args);

export type UploadArgs = [file: File, directory?: string];
export type UpdateArgs = [
  oldFilePath: string | null | undefined,
  newFile: File,
  directory?: string,
];
export type RemoveArgs = [filePath: string];
