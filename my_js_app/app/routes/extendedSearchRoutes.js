// routes/extendedSearchRoutes.js

const express = require('express');
const router = express.Router();
const { renderExtendedSearchPage } = require('../controllers/extendedSearchController');

// Route to display the extended search page
router.get('/', renderExtendedSearchPage);

module.exports = router;
