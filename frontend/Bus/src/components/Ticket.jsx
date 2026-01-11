import { useEffect, useState } from "react";
import api from "../api/api";

export default function Ticket() {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get("/latest-bookings");
        setTicket(res.data);
      } catch(err) {
        console.error(err);
      }
    };
    fetchTicket();
  }, []);

  if (!ticket.length) return <p style={{ textAlign: "center", marginTop: 50 }}>No recent bookings</p>;

  const busName = ticket[0].bus_name;
  const departure = ticket[0].departure;
  const arrival = ticket[0].arrival;
  const type = ticket[0].type;
  const date = ticket[0].booking_date;
  const pricePerSeat = ticket[0].price;
  const seats = ticket.map(t => t.seat_number);
  const total = pricePerSeat * seats.length;

  return (
    <div style={{ maxWidth: 450, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 15 }}>
      <div style={{ backgroundColor: "#007bff", color: "#fff", padding: 10, textAlign: "center" }}>
        <h2>🎫 Bus Ticket</h2>
      </div>
      <div style={{ padding: 15 }}>
        <h3>{busName}</h3>
        <p><b>Type:</b> {type}</p>
        <p><b>Date:</b> {date}</p>
        <p><b>Departure:</b> {departure} → <b>Arrival:</b> {arrival}</p>
        <p><b>Seats:</b> {seats.join(", ")}</p>
        <p><b>Price per Seat:</b> ₹{pricePerSeat}</p>
        <h3>Total: ₹{total}</h3>
        <button onClick={() => window.print()}>🖨 Print Ticket</button>
      </div>
    </div>
  );
}
