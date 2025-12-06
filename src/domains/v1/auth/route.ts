import express from 'express';

const router = express.Router();

// import { refreshToken } from '@/middlewares/authentication';
import validate from '@/middlewares/request-validation';
import * as schemas from '@/schemas/auth';
import * as authController from './controller';

router.post(
  '/register',
  validate({ body: schemas.register }),
  authController.register,
);

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', validate({ body: schemas.login }), authController.login);

// router.post('/refresh', refreshToken, authController.refresh);
// router.delete('/logout', refreshToken, authController.logout);

export default router;
