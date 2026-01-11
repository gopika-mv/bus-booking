const Bus = require("../models/busModel");
const Booking = require("../models/bookingModel");
const db = require("../config/db"); // added to run custom queries

// Get all buses
exports.getBuses = (req, res) => {
  Bus.getAllBuses((err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Get booked seats for a bus on a specific date
exports.getSeats = (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  Booking.getBookedSeats(id, date, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result.map(r => r.seat_number));
  });
};

// Book seats for a bus
exports.bookSeats = (req, res) => {
  const { id } = req.params;
  const { seats, date } = req.body;

  Booking.bookSeats(id, seats, date, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Booking Confirmed" });
  });
};

// Get latest booking(s) for ticket confirmation
exports.getLatestBooking = (req, res) => {
  const query = `
    SELECT 
      b.name AS bus_name,
      b.type,
      b.departure,
      b.arrival,
      b.price,
      bs.seat_number,
      bs.booking_date
    FROM booked_seats bs
    JOIN buses b ON bs.bus_id = b.id
    ORDER BY bs.id DESC
    LIMIT 10
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};
