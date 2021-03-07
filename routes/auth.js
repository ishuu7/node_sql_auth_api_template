const express = require('express');
const router = express.Router();
const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/auth');

// routes
router.post('/register', registerSchema, authController.register);
router.post('/login', loginSchema, authController.login);

module.exports = router;






