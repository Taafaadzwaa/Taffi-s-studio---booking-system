import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const [page, setPage] = useState("welcome"); // "welcome" | "booking" | "gallery"
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch booked slots
  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:5000/reservations");
      const data = await res.json();
      const booked = data.map((r) => r.slot);
      setBookedSlots(booked);
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleReservation = async () => {
    if (!selectedSlot) return alert("Select a time slot");
    if (!name || !email) return alert("Enter your name and email");

    const reservation = { name, email, slot: selectedSlot };

    try {
      const response = await fetch("http://localhost:5000/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      const data = await response.json();

      if (response.ok) {
        setBookedSlots([...bookedSlots, selectedSlot]);
        setSelectedSlot("");
        setName("");
        setEmail("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setPage("gallery"); // Redirect to gallery/services page
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };

  const allBooked = bookedSlots.length === slots.length;


  // the welcome page
  if (page === "welcome") {
    return (
      <div className="container welcome-page">
        <h1>Welcome to Taffi's Studio!</h1>
        <p>Capture your moments professionally with us.</p>
        <button className="book-button" onClick={() => setPage("booking")}>
          Book Your Session
        </button>
      </div>
    );
  }

  // Gallery and services page
  if (page === "gallery") {
    return (
      <div className="container">
        <h1>Thanks for booking with Taffi's studio!</h1>
        <p>Explore our services and gallery:</p>

        <h2>Our Services</h2>
        <ul className="services">
          <li>Portrait photography</li>
          <li>Product shoots</li>
          <li>Event coverage</li>
          <li>Editing & retouching</li>
        </ul>

        <h2>Studio Gallery</h2>
        <div className="gallery">
          <img src="data:image/jpeg;base64,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" alt="Studio 1" />
          <img src="data:image/jpeg;base64,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" alt="Studio 2" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCU3dU2LTpZebU5npoOmDZX0p4IsTB4ZGiig&s" alt="Studio 3" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5vlbrAF9iUxw_RuGZ7-hZ0j6nCvLaZu6-g&s" alt="Studio 4" />
        </div>

        <button className="book-button" onClick={() => setPage("booking")}>
          Book another session
        </button>
      </div>
    );
  }

  // Booking Page
  return (
    <div className="container">
      <h1>Taffi's Studio</h1>
      <p>Photography Studio Booking. Reserve your studio session.</p>

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
      {!allBooked ? (
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
      ) : (
        <div className="success-message">
          All slots are booked for today. Please book tomorrow!
        </div>
      )}

      {/* Form */}
      {!allBooked && (
        <>
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
        </>
      )}

      {/* Success message */}
      {success && (
        <div className="success-message">
          Booking confirmed! Redirecting you to our gallery...
        </div>
      )}
    </div>
  );
}

export default App;






