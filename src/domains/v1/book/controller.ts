import { Request, Response } from 'express';
import * as bookService from './service';

export const index = async (req: Request, res: Response) => {
  const { page, limit } = req.validated;

  const { data, meta } = await bookService.fetchPaginated({ page, limit });

  return res.success('Successfully get books!', data, meta);
};

export const show = async (req: Request, res: Response) => {
  const { isbn } = req.validated;

  const data = await bookService.findByISBN(isbn);
  if (!data) {
    return res.error(404, 'Book not found');
  }

  return res.success('Successfully get book by slug!', data.toJSON());
};

export const store = async (req: Request, res: Response) => {
  const payload = req.validated;

  const newRecord = await bookService.create(payload);

  return res.success('Successfully created new book!', newRecord.toJSON());
};

export const update = async (req: Request, res: Response) => {
  const payload = req.validated;
  const { isbn } = payload;

  const data = await bookService.findByISBN(isbn);
  if (!data) {
    return res.error(404, 'Book not found');
  }

  const updated = await bookService.update(data, payload);

  return res.success('Successfully updated book by slug!', updated.toJSON());
};

export const destroy = async (req: Request, res: Response) => {
  const payload = req.validated;
  const { isbn } = payload;

  const data = await bookService.findByISBN(isbn);
  if (!data) {
    return res.error(404, 'Book not found');
  }

  const deleted = await bookService.destroy(data);

  return res.success('Successfully deleted book by slug!', deleted.toJSON());
};
