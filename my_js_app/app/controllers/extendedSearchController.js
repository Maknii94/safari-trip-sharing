// controllers/extendedSearchController.js

const { loadSafariTrips } = require('../services/dataService');

// Render the Extended Search Page with All Trips or Filtered Results
exports.renderExtendedSearchPage = (req, res) => {
  const { destinations, start_date, end_date, min_days, max_days, car_type, car_state } = req.query;
  const allTrips = loadSafariTrips();
  let safariTrips = allTrips
  const daysArray = allTrips.map(trip => trip.days);
  const priceArray = allTrips.map(trip => trip.price_per_person);
  const minDays = Math.min(...daysArray);
  const maxDays = Math.max(...daysArray);
  const minPrice = Math.min(...priceArray);
  const maxPrice = Math.max(...priceArray);
  // Filter based on query parameters
  if (destinations) {
    const destinationArray = Array.isArray(destinations) ? destinations : [destinations];
    safariTrips = safariTrips.filter(trip =>
      trip.itinerary.some(destination => destinationArray.includes(destination))
    );
  }

  if (start_date) {
    const startDate = new Date(start_date);
    safariTrips = safariTrips.filter(trip => new Date(trip.start_date) >= startDate);
  }

  if (end_date) {
    const endDate = new Date(end_date);
    safariTrips = safariTrips.filter(trip => new Date(trip.start_date + trip.days) <= endDate);
  }

  if (min_days) {
    safariTrips = safariTrips.filter(trip => trip.days >= parseInt(min_days, 10));
  }

  if (max_days) {
    safariTrips = safariTrips.filter(trip => trip.days <= parseInt(max_days, 10));
  }

  if (req.query.min_price) {
    safariTrips = safariTrips.filter(trip => trip.price_per_person >= parseInt(req.query.min_price, 10));
  }
  if (req.query.max_price) {
    safariTrips = safariTrips.filter(trip => trip.price_per_person <= parseInt(req.query.max_price, 10));
  }

  if (car_type) {
    safariTrips = safariTrips.filter(trip => trip.car_type === car_type);
  }
  if (car_state) {
    const carStateRank = {
      "slightly used": 1,
      "moderately used": 2,
      "heavily used": 3
    };
    const selectedRank = carStateRank[car_state];
    safariTrips = safariTrips.filter(trip => {
      const tripRank = carStateRank[trip.car_state];
      return tripRank <= selectedRank;
    });
  }
  
  if (req.xhr) {
    res.render('partials/safariResults', { safariTrips, layout: false }, (err, html) => {
      if (err) {
        console.error("Error rendering partial:", err);
        return res.status(500).send('Error rendering partial ' + err.message);
      }
      res.send(html);
    });
  } else {
    res.render('extended-search', { user: req.user, safariTrips, minDays, maxDays, minPrice, maxPrice });
  }
};