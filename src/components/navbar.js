import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const openBooking = () => {
    navigate('/booking');
  };

  return (
    <div className='navbar'>
      <div className='navContainer ' style={{ display: "flex" }}>
        <div className='bookinglogo' >Booking.com</div>
        {isLoggedIn ? (
          <div className='welcomebox' >
            <div className='welcomecontent' >Welcome, {localStorage.getItem('userName')}</div>
            <button className='navButton ' style={{marginRight:"1rem"}} onClick={openBooking}>Your Bookings</button>
            <button className='navButton' onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className='loginform' >
            <button className='navButton ' onClick={handleRegister}>Register</button>
            <button className='navButton'  style={{ marginLeft: "0.5rem" }} onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
