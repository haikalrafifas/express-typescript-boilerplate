import Book from './model.js';
import {
  PaginatedResult,
  PaginationInput,
  generatePaginatedData,
} from '../../../utilities/pagination/index.js';
import * as filesystem from '../../../utilities/filesystem/index.js';

export const fetchPaginated = async (
  params: PaginationInput,
): Promise<PaginatedResult<Book>> => {
  let baseQuery = Book.query().whereNull('deleted_at');

  return generatePaginatedData<Book>(baseQuery, params);
};

export const findByISBN = async (isbn: string): Promise<Book | undefined> => {
  return await Book.query().findOne({ isbn }).whereNull('deleted_at');
};

export const create = async (payload: Book): Promise<Book> => {
  if (payload.image) {
    const blob = payload.image as unknown as File;
    payload.image = await filesystem.upload(blob, 'books');
  }

  return await Book.query().insert(payload).returning('*');
};

export const update = async (entity: Book, payload: Book): Promise<Book> => {
  if (payload.image) {
    const blob = payload.image as unknown as File;
    payload.image = await filesystem.update(entity.image, blob, 'books');
  }

  return (await entity
    .$query()
    .patch({ ...payload })
    .returning('*')
    .first()) as Book;
};

export const destroy = async (entity: Book) => {
  if (entity.image) {
    await filesystem.remove(entity.image);
  }

  await entity.$query().delete();
  return entity;
};
