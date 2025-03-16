// /controllers/tripController.js

const tripService = require('../services/tripService');
const authService = require('../services/authService');
const { loadSafariTrips, saveSafariTrips } = require('../services/dataService');

exports.offerTrip = (req, res) => {
  try {
    const tripData = {
      start_date: req.body.start_date,
      car_type: req.body.car_type,
      car_state: req.body.car_state,
      itinerary: JSON.parse(req.body.itinerary), // parse JSON string to array
      available_seats: parseInt(req.body.available_seats, 10),
      price_per_person: parseFloat(req.body.price_per_person),
      days: parseInt(req.body.days, 10)
    };

    const user = authService.getUserDetails(req);
    if (!user) {
      req.session.errorMessage = 'Unauthorized';
      return res.redirect('/login');
    }
    const offered_by = user.preferred_username;

    const newTrip = tripService.offerTrip(tripData, offered_by);

    const trips = loadSafariTrips();
    trips.push(newTrip);
    saveSafariTrips(trips);

    res.redirect(`/trips`);
  } catch (error) {
    console.error('Error offering trip:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getTrips = (req, res) => {
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
      trip.destinations.some(destination => destinationArray.includes(destination))
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

  const user = authService.getUserDetails(req);
  if (!user) {
    req.session.errorMessage = 'Unauthorized';
    return res.redirect('/login');
  }

  const successMessage = req.session.successMessage;
  const errorMessage = req.session.errorMessage;
  req.session.successMessage = null;
  req.session.errorMessage = null;

  if (req.xhr) {
    res.render('partials/safariResults', { safariTrips, layout: false }, (err, html) => {
      if (err) {
        console.error("Error rendering partial:", err);
        return res.status(500).send('Error rendering partial ' + err.message);
      }
      res.send(html);
    });
  } else {
    res.render('extended-search', {
      user,
      safariTrips,
      minDays,
      maxDays,
      minPrice,
      maxPrice,
      successMessage,
      errorMessage
    });
  }
};

exports.bookTrip = (req, res) => {
  console.log('Booking trip called on TripID ' + req.params.tripId);
  console.log('Request parameters:', req.params);
  console.log('Request body:', req.body);
  try {
    const { tripId } = req.params;
    const { seats } = req.body;
    const user = authService.getUserDetails(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const booking_user = user.preferred_username;
    console.log('Booking trip with ID:', tripId, ' by user:', booking_user, ' for ', seats, ' seats.');
    const result = tripService.bookTrip(tripId, seats, booking_user);
    
    // Set a session message for successful booking
    req.session.successMessage = "Booking successful, we will send you the confirmation per email";
    res.redirect('/trips');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchTrips = (req, res) => {
    try {
      const { start_date, end_date, car_type, itinerary } = req.query;
      let destArray = [];
      if (itinerary) {
        destArray = itinerary.split(',').map(s => s.trim());
      }
      const results = tripService.searchTrips({ start_date, end_date, car_type, itinerary: destArray });
      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.renderNewTripForm = (req, res) => {
  res.render('offerSafari', { title: 'Offer Safari Trip', user: req.user });
};