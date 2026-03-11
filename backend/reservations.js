const express = require("express");
const router = express.Router();
const db = require("./database");

// Get all reservations
router.get("/", (req, res) => {
  const reservations = db.prepare("SELECT * FROM reservations").all();
  res.json(reservations);
});

// Create a reservation
router.post("/", (req, res) => {
  const { name, email, time } = req.body;

  if (!name || !email || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Prevent double booking
  const slotTaken = db
    .prepare("SELECT * FROM reservations WHERE time = ?")
    .get(time);

  if (slotTaken) {
    return res.status(409).json({ message: "This time slot is already booked" });
  }

  const stmt = db.prepare("INSERT INTO reservations (name, email, time) VALUES (?, ?, ?)");
  const info = stmt.run(name, email, time);

  res.status(201).json({ id: info.lastInsertRowid, name, email, time });
});

// Reset all reservations (optional, for testing)
router.delete("/reset", (req, res) => {
  db.prepare("DELETE FROM reservations").run();
  res.json({ message: "All slots have been reset" });
});

module.exports = router;
