// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { keycloak } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Login route: requires authentication via Keycloak
router.get('/login', keycloak.protect(), authController.getLoginPage);

// Optional logout route
router.get('/app-logout', authController.getLogoutPage);

module.exports = router;
