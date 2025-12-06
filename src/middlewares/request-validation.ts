import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

type RequestLocation = 'body' | 'query' | 'param';
interface ValidationOption {
  body?: z.ZodObject;
  query?: z.ZodObject;
  param?: z.ZodObject;
  optional?: RequestLocation | RequestLocation[] | '*';
}

type ValidationIssue = {
  expected?: string;
  code: string;
  path: (string | number)[];
  message: string;
};

type ValidationResponse = {
  [key: string]: string[];
};

function validationFailed(
  res: Response,
  error: z.ZodError<Record<string, unknown>>,
) {
  const errorParsed = mapValidationErrors(JSON.parse(error.message));
  return res.error(400, 'Validation failed', errorParsed);
}

/**
 * Converts an array of validation issues (e.g. from Zod) into
 * a Laravel-style validation error map.
 *
 * Example:
 * [
 *   { path: ['email'], message: 'Invalid email' },
 *   { path: ['password'], message: 'Too short' }
 * ]
 * ->
 * { email: ['Invalid email'], password: ['Too short'] }
 */
function mapValidationErrors(
  errors: ValidationIssue[] | undefined | null,
): ValidationResponse {
  const result: ValidationResponse = {};

  if (!errors) return result;

  for (const err of errors) {
    // Extract the field name (first element in path)
    const field = err.path?.[0] as string;
    if (!field) continue;

    // Add message to array for this field
    if (!result[field]) result[field] = [];
    result[field].push(err.message);
  }

  return result;
}

/**
 * HTTP Request Validation Middleware.
 *
 * Example usage:
 * validate({ body, query, param, optional: 'query' });
 *
 * @param option
 * @returns
 */
export default function validate(option: ValidationOption) {
  return async function (req: Request, res: Response, next: NextFunction) {
    let body,
      query,
      param = null;

    // apply optional to all location
    if (option.optional === '*') {
      if (option.body) option.body = option.body.partial();
      if (option.query) option.query = option.query.partial();
      if (option.param) option.param = option.param.partial();
    }

    body = { ...req.body };
    if (body && option.body) {
      if (option.optional === 'body') {
        option.body = option.body.partial();
      }
      body = option.body.safeParse(body);

      if (!body.success) return validationFailed(res, body.error);
    }

    param = { ...req.params };
    if (param && option.param) {
      if (option.optional === 'param') {
        option.param = option.param.partial();
      }
      param = option.param.safeParse(param);

      if (!param.success) return validationFailed(res, param.error);
    }

    query = { ...req.query };
    if (query && option.query) {
      if (option.optional === 'query') {
        option.query = option.query.partial();
      }
      query = option.query.safeParse(query);

      if (!query.success) return validationFailed(res, query.error);
    }

    req.validated = {
      ...body.data,
      ...(param.data as object),
      ...(query.data as object),
    };

    return next();
  };
}
