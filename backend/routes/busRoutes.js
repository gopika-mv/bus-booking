const express = require("express");
const router = express.Router();
const controller = require("../controllers/busController");

router.get("/buses", controller.getBuses);
router.get("/buses/:id/seats", controller.getSeats);
router.post("/buses/:id/book", controller.bookSeats);

module.exports = router;
