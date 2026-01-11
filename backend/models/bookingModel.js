const db = require("../config/db");

exports.getBookedSeats = (busId, date, callback) => {
  db.query(
    "SELECT seat_number FROM booked_seats WHERE bus_id=? AND booking_date=?",
    [busId, date],
    callback
  );
};

exports.bookSeats = (busId, seats, date, callback) => {
  const values = seats.map(seat => [busId, seat, date]);
  db.query(
    "INSERT INTO booked_seats (bus_id, seat_number, booking_date) VALUES ?",
    [values],
    callback
  );
};
