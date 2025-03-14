// /models/tripModel.js

class Trip {
    constructor({ id, title, start_date, itinerary, days, car_type, car_state, available_seats, price_per_person, image, offeredBy }) {
      this.id = id;
      this.title = title;
      this.start_date = start_date;
      this.days = days;
      this.car_type = car_type;
      this.car_state = car_state;
      this.itinerary = itinerary;
      this.available_seats = available_seats;
      this.price_per_person = price_per_person;
      this.image = image;
      this.offered_by = offeredBy;
      this.created_at = new Date();
      this.bookings = [];
    }
  }
  
  module.exports = Trip;
  