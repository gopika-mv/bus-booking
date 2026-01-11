import { useState } from "react";
import api from "../api/api";

export default function BusBooking() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);

  const cities = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Pune"];
  const totalSeats = 40;

  const handleSearch = async () => {
    if (!from || !to || !date) return alert("Please select From, To, and Date");

    try {
      const res = await api.get(`/buses?from=${from}&to=${to}&date=${date}`);
      setBuses(res.data);
      setShowSeats(false);
    } catch(err) {
      console.error(err);
      alert("Failed to fetch buses");
    }
  };

  const handleSelectBus = async (bus) => {
    setSelectedBus(bus);
    setShowSeats(true);
    setSelectedSeats([]);

    try {
      const res = await api.get(`/buses/${bus.id}/seats?date=${date}`);
      setBookedSeats(res.data);
    } catch(err) {
      console.error(err);
      alert("Failed to load seats");
    }
  };

  const toggleSeat = (seat) => {
    setSelectedSeats(
      selectedSeats.includes(seat)
        ? selectedSeats.filter(s => s !== seat)
        : [...selectedSeats, seat]
    );
  };

  const confirmBooking = async () => {
    if (!selectedSeats.length) return alert("Select at least 1 seat");
    try {
      await api.post(`/buses/${selectedBus.id}/book`, { seats: selectedSeats, date });
      alert("Booking Confirmed");
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);
    } catch(err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20, backgroundColor: "#f9f9f9", borderRadius: 12, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 25, color: "#007bff" }}>🚌 Book a Bus</h2>

      {/* Search Form */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <select value={from} onChange={e => setFrom(e.target.value)} style={inputStyle}>
          <option value="">From</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={to} onChange={e => setTo(e.target.value)} style={inputStyle}>
          <option value="">To</option>
          {cities.filter(c => c !== from).map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />

        <button onClick={handleSearch} style={searchButton}>Search</button>
      </div>

      {/* Bus List */}
      {!showSeats && buses.map(bus => (
        <div key={bus.id} style={busCard}>
          <div>
            <h3 style={{ margin: 0 }}>{bus.name}</h3>
            <p style={{ margin: "5px 0" }}>Price: ₹{bus.price}</p>
            <p style={{ margin: "5px 0" }}>From: {from} → To: {to}</p>
          </div>
          <button onClick={() => handleSelectBus(bus)} style={selectButton}>Select Seats</button>
        </div>
      ))}

      {/* Seat Selection */}
      {showSeats && selectedBus && (
        <div>
          <h3 style={{ marginBottom: 15, color: "#007bff" }}>{selectedBus.name} - Select Seats</h3>
          
          {/* Seats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, justifyItems: "center", marginBottom: 15 }}>
            {[...Array(totalSeats)].map((_, i) => {
              const seat = i + 1;
              const booked = bookedSeats.includes(seat);
              const selected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  disabled={booked}
                  onClick={() => toggleSeat(seat)}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 8,
                    border: "1px solid #333",
                    backgroundColor: booked ? "#d3d3d3" : selected ? "#28a745" : "#fff",
                    color: booked ? "#888" : "#000",
                    cursor: booked ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    transition: "all 0.2s"
                  }}
                >
                  {seat}
                </button>
              );
            })}
          </div>

          {/* Seat Legend */}
          <div style={{ display: "flex", justifyContent: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 20, height: 20, backgroundColor: "#fff", border: "1px solid #333", borderRadius: 4 }}></div> Available
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 20, height: 20, backgroundColor: "#28a745", borderRadius: 4 }}></div> Selected
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 20, height: 20, backgroundColor: "#d3d3d3", borderRadius: 4 }}></div> Booked
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <button 
              onClick={confirmBooking} 
              disabled={selectedSeats.length === 0}
              style={confirmButton}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const inputStyle = {
  flex: 1,
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  minWidth: 120
};

const searchButton = {
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold"
};

const busCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  marginBottom: 10,
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const selectButton = {
  padding: "8px 12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold"
};

const confirmButton = {
  padding: "10px 25px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16
};
