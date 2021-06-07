const router = require('express').Router();

const authController = require('../controllers/auth');

// /auth/login
router.post('/login', authController.postLogin);

module.exports = router;