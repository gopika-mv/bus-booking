const Bus = require("../models/busModel");
const Booking = require("../models/bookingModel");

exports.getBuses = (req, res) => {
  Bus.getAllBuses((err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.getSeats = (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  Booking.getBookedSeats(id, date, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result.map(r => r.seat_number));
  });
};

exports.bookSeats = (req, res) => {
  const { id } = req.params;
  const { seats, date } = req.body;

  Booking.bookSeats(id, seats, date, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Booking Confirmed" });
  });
};
