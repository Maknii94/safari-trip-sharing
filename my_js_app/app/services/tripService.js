// /services/tripService.js
const { v4: uuidv4 } = require('uuid');

const { loadSafariTrips, saveSafariTrips } = require('../services/dataService');

const Trip = require('../models/tripModel');

// In-memory store for trips
let trips = [];

// Fixed list of available destinations
const DESTINATIONS = ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro', 'Manyara', 'Kilimanjaro', 'Natron'];

function validateTripOffer(tripData) {
  const { start_date, car_type, itinerary, available_seats, price_per_person } = tripData;
  if (!start_date) {
    throw new Error("A date for the trip is required.");
  }
  if (!car_type || (car_type !== "pop-up roof minivan" && car_type !== "pop-up roof 4x4 vehicle" && car_type !== "open-sided 4x4 vehicle")) {
    throw new Error("Invalid car type. Invalid car type. Allowed values are 'pop-up roof minivan' or 'pop-up roof 4x4 vehicle' or 'pen-sided 4x4 vehicle'.");
  }
  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    throw new Error("Itinerary must be a non-empty array.");
  }
  // Validate that each destination is in the fixed list
  for (const dest of itinerary) {
    if (!DESTINATIONS.includes(dest)) {
      throw new Error(`Invalid destination: ${dest}. Allowed: ${DESTINATIONS.join(', ')}`);
    }
  }
  if (!Number.isInteger(available_seats) || available_seats < 1 || available_seats > 7) {
    throw new Error("Free places must be an integer between 1 and 7.");
  }
  if (typeof price_per_person !== 'number' || price_per_person > 1000 || price_per_person < 1) {
    throw new Error("Price per place must be a number between 1 and 1000.");
  }
}

function offerTrip(rideData, offeredBy) {
  console.log('rideData:', rideData);
  validateTripOffer(rideData);

  const id = uuidv4();
  const image = "safari0.jpg";
  const title = "Safari Trip - TODO Add title field";
  const newTrip = new Trip({ id, offeredBy, image, title, ...rideData });

  trips.push(newTrip);
  return newTrip;
}

function getTrips() {
  try {
    trips = loadSafariTrips();
  }
  catch (error) {
    console.error('Error loading trips:', error);
  }
  return trips;
}

function bookTrip(tripId, seats, booking_user) {
  trips = getTrips();
  const trip = trips.find(r => r.id === tripId);

  if (!trip) {
    console.error(trips)
    throw new Error("Trip not found.");
  }
  trip.offered_by = trip.offered_by || "Random User";
  if (trip.offered_by === booking_user) {
    throw new Error("You cannot book your own trip.");
  }
  if (seats > trip.freePlaces) {
    throw new Error("Not enough seats available.");
  }

  console.log('Type of available_seats:', typeof trip.available_seats, "; value = ", trip.available_seats);
  const total_cost = trip.days * seats * trip.price_per_person;

  const seats_to_book = parseInt(seats, 10);
  trip.available_seats -= seats_to_book;
  const booking = {
    booking_user,
    seats_to_book,
    total_cost,
    bookedAt: new Date()
  };
  trip.bookings = trip.bookings || [];
  trip.bookings.push(booking);
  saveSafariTrips(trips);
  return { message: 'Booking successful' };
}

function searchTrips({ startDate, endDate, carType, destinations }) {
  return trips.filter(trip => {
    let match = true;

    if (startDate) {
      const rideDate = new Date(trip.rideDateTime);
      if (rideDate < new Date(startDate)) match = false;
    }
    if (endDate) {
      const rideDate = new Date(trip.rideDateTime);
      if (rideDate > new Date(endDate)) match = false;
    }

    if (carType && trip.carType !== carType) {
      match = false;
    }

    // Assumes 'destinations' is an array of destination strings.
    if (destinations && destinations.length > 0) {
      // trip must include all requested destinations
      for (const dest of destinations) {
        if (!trip.itinerary.includes(dest)) {
          match = false;
          break;
        }
      }
    }

    return match;
  });
}

module.exports = { offerTrip, getTrips, bookTrip, searchTrips, DESTINATIONS };
