import express from 'express';

import { accessToken } from '../../../middlewares/authentication.js';
import validate from '../../../middlewares/request-validation.js';
import * as schemas from './schema.js';
import * as bookController from './controller.js';

const router = express.Router();

router.get('/', validate({ query: schemas.query }), bookController.index);
router.get('/:slug', validate({ param: schemas.param }), bookController.show);

router.use(accessToken);
router.post('/', validate({ body: schemas.body }), bookController.store);
router.patch(
  '/:slug',
  validate({ body: schemas.body, optional: 'body' }),
  bookController.update,
);
router.delete(
  '/:slug',
  validate({ param: schemas.param }),
  bookController.destroy,
);

export default router;
