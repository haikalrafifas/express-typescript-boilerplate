const router = require('express').Router();

const { refreshToken } = require('@/middlewares/auth-middleware');
const validate = require('@/middlewares/request-validation-middleware');
const fields = require('@/validators/auth-validator');
const authController = require('@/controllers/auth-controller');

router.post('/register', validate({ body: fields.register }), authController.register);
router.post('/login', validate({ body: fields.login }), authController.login);
router.post('/refresh', refreshToken, authController.refresh);

module.exports = router;
