const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define endpoints and associate them with controller methods
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
