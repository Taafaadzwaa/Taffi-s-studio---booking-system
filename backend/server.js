const express = require("express");
const cors = require("cors");

const reservationRoutes = require("./reservations");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use reservation routes
app.use("/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("Studio Reservation API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

