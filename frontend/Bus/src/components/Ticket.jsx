import { useEffect, useState } from "react";
import api from "../api/api";

export default function Ticket() {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    api.get("/latest-bookings")
      .then(res => setTicket(res.data))
      .catch(err => console.error(err));
  }, []);

  if (ticket.length === 0) return <p style={{ textAlign: "center", marginTop: 50 }}>No recent bookings</p>;

  const busName = ticket[0].bus_name;
  const departure = ticket[0].departure;
  const arrival = ticket[0].arrival;
  const type = ticket[0].type;
  const date = ticket[0].booking_date;
  const pricePerSeat = ticket[0].price;
  const seats = ticket.map(t => t.seat_number);
  const total = pricePerSeat * seats.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      maxWidth: 450,
      margin: "40px auto",
      borderRadius: 15,
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      border: "1px solid #ddd"
    }}>
      {/* Header */}
      <div style={{ backgroundColor: "#007bff", color: "white", padding: 15, textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>🎫 Bus Ticket</h2>
      </div>

      {/* Body */}
      <div style={{ padding: 20, backgroundColor: "#f9f9f9" }}>
        <h3 style={{ color: "#333", marginBottom: 10 }}>{busName}</h3>
        <p><b>Type:</b> {type}</p>
        <p><b>Date:</b> {date}</p>
        <p><b>Departure:</b> {departure} → <b>Arrival:</b> {arrival}</p>
        <p><b>Seats:</b> {seats.sort((a, b) => a - b).join(", ")}</p>
        <p><b>Price per Seat:</b> ₹{pricePerSeat}</p>
        <h3 style={{ textAlign: "center", marginTop: 15, color: "#28a745" }}>Total: ₹{total}</h3>
        <p style={{ textAlign: "center", marginTop: 10, fontWeight: "bold", color: "#28a745" }}>✅ Booking Confirmed</p>

        {/* Print Button */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button 
            onClick={handlePrint}
            style={{
              padding: "10px 25px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16
            }}
          >
            🖨 Print Ticket
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#eee", padding: 10, textAlign: "center", fontSize: 12 }}>
        Thank you for booking with our service!
      </div>
    </div>
  );
}
