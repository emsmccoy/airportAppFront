import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Home from "./pages/Home";
import Airports from "./pages/Airports";
import Flights from "./pages/Flights";
import AirportFlightList from "./components/lists/AirportFlightList";
import './App.css'

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airports" element={<Airports />} />
            <Route path="/airports/:id/flights" element={<AirportFlightList />} />
            <Route path="/flights" element={<Flights />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App
