import React, { useState } from 'react';
import { faArrowRight, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



const Header = ({ location }) => {

  const defaultFlightDate = location ? new Date(location.state.flightDate) : new Date();

  const [flightDate, setFlightDate] = useState(defaultFlightDate);


  return (
    <div>
      <div className='headerSearchFlight'>
        <div className='headerSearchItem'>
          <FontAwesomeIcon icon={faPlaneDeparture} className='headerIcon' />
          <input
            type="text"
            placeholder="Where are from?"
            className="headerSearchInput"
            value={location ? location.state.depart : depart}
            onChange={(e) => setDepart(e.target.value)}
          />

        </div>

        <div className='headerSearchItem' style={{ fontSize: "1.5rem" }}>
          <FontAwesomeIcon icon={faArrowRight} className='headerIcon' />
        </div>

        <div className='headerSearchItem'>
          <FontAwesomeIcon icon={faPlaneArrival} className='headerIcon' />
          <input
            type="text"
            placeholder="Where are to?"
            className="headerSearchInput"
            value={location ? location.state.arrival : arrival}
            onChange={(e) => setArrival(e.target.value)}
          />

        </div>
        <div className='headerSearchItem'>
          <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
          <DatePicker
            selected={flightDate}
            onChange={(date) => setFlightDate(date)}
            dateFormat="YYYY-MM-dd"
          />
        </div>

      </div>

    </div>
  );
};

export default Header;
