import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch booked slots from backend
  const fetchReservations = async () => {
    const res = await fetch("http://localhost:5000/reservations");
    const data = await res.json();
    const booked = data.map((r) => r.time);
    setBookedSlots(booked);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleReservation = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    if (!name || !email) {
      alert("Please enter your name and email");
      return;
    }

    const reservation = { name, email, time: selectedSlot };

    const response = await fetch("http://localhost:5000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });

    if (response.ok) {
      setSuccess(true);
      fetchReservations();
      setSelectedSlot("");
      setName("");
      setEmail("");
      setTimeout(() => setSuccess(false), 4000);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h1>Taffi's Studio</h1>

      <p>Photography Studio Booking . <br>
      </br>Reserve your studio session .</p>

      {/* Equipment */}
      <div className="equipment">
        <h2>Studio Equipment Included</h2>
        <ul>
          <li>1. Professional Lighting Kit</li>
          <li>2. Multiple Backdrops</li>
          <li>3. Tripods & Camera Stands</li>
          <li>4. Editing Workstation</li>
        </ul>
      </div>

      {/* Time Slots */}
      <div className="slots">
        {slots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          return (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              disabled={isBooked}
              className={`slot-button ${
                selectedSlot === slot ? "selected" : ""
              } ${isBooked ? "disabled" : ""}`}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="book-button" onClick={handleReservation}>
        Book Studio Session
      </button>

      {/* Success message */}
      {success && (
        <div className="success-message">
          Booking confirmed! . Thanks for Booking with Taffi's Studio !! <br>
          </br>Your studio session has been reserved.
        </div>
      )}
    </div>
  );
}

export default App;
