import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';

import ListHotel from './components/list/list';
import Login from './components/login/login';
import Register from './components/login/register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ListFlight from './components/list/flightlist';
import Booking from './components/booking';
import HotelBook from './components/hotel/hotelBooking';


function App() {
  return (
    <div className="App">
      <ToastContainer />
 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<ListHotel />} />
        <Route path="/flights" element={<ListFlight />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/hotelBooking" element={<HotelBook />} />
        
      </Routes>
      
      
    </div>
  );
}

export default App;
