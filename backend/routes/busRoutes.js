const express = require("express");
const router = express.Router();
const controller = require("../controllers/busController");

// Fetch all buses
router.get("/buses", controller.getBuses);

// Fetch booked seats for a bus on a specific date
router.get("/buses/:id/seats", controller.getSeats);

// Book seats for a bus
router.post("/buses/:id/book", controller.bookSeats);

// Fetch latest bookings (for ticket confirmation)
router.get("/latest-bookings", controller.getLatestBooking);

module.exports = router;
