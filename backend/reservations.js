const express = require("express");
const router = express.Router();

let reservations = []; // In-memory storage for bookings

// Get all reservations
router.get("/", (req, res) => {
  res.json(reservations);
});

// Create a new reservation
router.post("/", (req, res) => {
  const { name, slot } = req.body;

  // Check if the slot is already booked
  const exists = reservations.find(r => r.slot === slot);
  if (exists) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  reservations.push({ name, slot });
  res.json({ message: "Reservation confirmed", slot });
});

module.exports = router;
