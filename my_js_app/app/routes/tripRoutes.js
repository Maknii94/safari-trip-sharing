// /routes/tripRoutes.js

const express = require('express');
const router = express.Router();
const { keycloak } = require('../middleware/auth');
const tripController = require('../controllers/tripController');

router.post('/', keycloak.protect(), tripController.offerTrip);

router.get('/', tripController.getTrips);

router.get('/new', keycloak.protect(), tripController.renderNewTripForm);

router.post('/:tripId/book', keycloak.protect(), tripController.bookTrip);

//router.get('/search', keycloak.protect(), tripController.searchTrips);

router.get('/:tripId/book', keycloak.protect(), (req, res) => {
  res.redirect('/');
});

module.exports = router;
