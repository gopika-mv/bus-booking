import { useEffect, useState } from "react";
import api from "../api/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data);
      } catch(err) {
        console.error(err);
        alert("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  if (!bookings.length) return <p style={{ textAlign: "center" }}>No bookings yet</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Bookings</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.bus_name}</td>
              <td>{b.booking_date}</td>
              <td>{b.seats.join(", ")}</td>
              <td>₹{b.price * b.seats.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
