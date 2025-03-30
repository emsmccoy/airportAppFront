import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AirportList from '../components/lists/AirportList';
import AirportFlightList from '../components/lists/AirportFlightList';

const Airports = () => {
  return (
    <Routes>
      <Route index element={<AirportList />} />
      <Route path=":id/flights" element={<AirportFlightList />} />
    </Routes>
  );
};

export default Airports;
