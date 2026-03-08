import { useEffect, useState } from "react";

function App() {
  const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch booked slots
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
      setTimeout(() => setSuccess(false), 4000); // hide message after 4s
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">
          Taffi's Studio - <br></br>
          Photography Studio Booking
        </h1>
        <p className="text-gray-500 text-center mb-6">Reserve your studio session</p>

        {/* Equipment */}
        <div className="bg-orange-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-orange-600 mb-2">Studio Equipment Included</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li> Professional Lighting Kit</li>
            <li> Multiple Backdrops</li>
            <li> Tripods & Camera Stands</li>
            <li> Editing Workstation</li>
          </ul>
        </div>

        {/* Time Slots */}
        <h2 className="font-semibold mb-3 text-blue-600">Select Time Slot</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {slots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`
                  p-2 rounded-lg border text-sm
                  ${isBooked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : selectedSlot === slot
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-blue-100"}
                `}
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
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleReservation}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Book Studio Session
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded text-sm text-center">
            Booking confirmed! Thanks for Booking with Taffi Studios !
             Your studio session has been reserved.
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
