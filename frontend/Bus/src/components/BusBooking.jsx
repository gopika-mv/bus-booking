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
    const res = await api.get("/buses");
    setBuses(res.data);
  };

  const handleSelectBus = async (bus) => {
    setSelectedBus(bus);
    setShowSeats(true);
    setSelectedSeats([]);

    const res = await api.get(`/buses/${bus.id}/seats?date=${date}`);
    setBookedSeats(res.data);
  };

  const toggleSeat = (seat) => {
    setSelectedSeats(
      selectedSeats.includes(seat)
        ? selectedSeats.filter(s => s !== seat)
        : [...selectedSeats, seat]
    );
  };

  const confirmBooking = async () => {
    await api.post(`/buses/${selectedBus.id}/book`, {
      seats: selectedSeats,
      date
    });
    alert("Booking Confirmed");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bus Booking System</h1>

      <select onChange={e => setFrom(e.target.value)}>
        <option>From</option>{cities.map(c => <option key={c}>{c}</option>)}
      </select>

      <select onChange={e => setTo(e.target.value)}>
        <option>To</option>{cities.map(c => <option key={c}>{c}</option>)}
      </select>

      <input type="date" onChange={e => setDate(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {!showSeats && buses.map(bus => (
        <div key={bus.id}>
          <h3>{bus.name} ₹{bus.price}</h3>
          <button onClick={() => handleSelectBus(bus)}>Select Seats</button>
        </div>
      ))}

      {showSeats && (
        <>
          <h2>{selectedBus.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[...Array(totalSeats)].map((_, i) => {
              const seat = i + 1;
              const booked = bookedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  disabled={booked}
                  onClick={() => toggleSeat(seat)}
                  style={{
                    margin: 5,
                    background: booked ? "gray" :
                      selectedSeats.includes(seat) ? "green" : "white"
                  }}
                >
                  {seat}
                </button>
              );
            })}
          </div>
          <button onClick={confirmBooking}>Confirm Booking</button>
        </>
      )}
    </div>
  );
}
