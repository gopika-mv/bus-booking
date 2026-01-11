import { useState } from "react";
import BusBooking from "./components/BusBooking.jsx";
import Ticket from "./components/Ticket.jsx";

export default function App() {
  const [view, setView] = useState("book"); // default: Book Tickets

  const buttonStyle = {
    padding: "10px 20px",
    marginRight: 10,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14
  };

  const activeStyle = { ...buttonStyle, backgroundColor: "#007bff", color: "white" };
  const inactiveStyle = { ...buttonStyle, backgroundColor: "#f0f0f0", color: "#333" };

  return (
    <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>🚌 Bus Booking System</h1>

      {/* Navigation Buttons */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button
          style={view === "book" ? activeStyle : inactiveStyle}
          onClick={() => setView("book")}
        >
          Book Tickets
        </button>
        <button
          style={view === "ticket" ? activeStyle : inactiveStyle}
          onClick={() => setView("ticket")}
        >
          View Ticket
        </button>
      </div>

      {/* Render Views */}
      <div>
        {view === "book" && <BusBooking />}
        {view === "ticket" && <Ticket />}
      </div>
    </div>
  );
}
