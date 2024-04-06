import React, { useState } from 'react';
import Navbar from '../navbar';
import { useLocation } from 'react-router-dom';
import Header from '../flight/flightHeader';
import SearchFlight from '../flight/searchflight';

const ListFlight = () => {

    const location = useLocation();

    return (
        <div>

            <Navbar />
            <Header location={location} />

            {
                location.state.depart && location.state.arrival ?
                <SearchFlight depart={location.state.depart} arrival={location.state.arrival} flightDate={location.state.flightDate} />
                : <div style={{marginTop:"10rem", marginLeft:"30rem"}}> <h1 style={{color:"red"}}> Fill All The Details First</h1> </div>
            }

            

        </div>
    );
};

export default ListFlight;
