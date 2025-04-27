const router = require('express').Router();

const welcomeRoutes = require('./welcome-routes');
const authRoutes = require('./auth-routes');

router.use('/', welcomeRoutes);
router.use('/auth', authRoutes);

module.exports = router;
