import React from 'react';
import Navbar from '../navbar';
import Header from '../header';
import { useLocation } from 'react-router-dom';
import SearchItem from '../searchitem';




const ListHotel = () => {

  const location = useLocation();
  // 8iwe1dc6tcby


  return (
    <div>

    <Navbar />
    <Header type="list" location={location} />
    
    <SearchItem place={location.state.destination} />
   
    </div>
  );
};

export default ListHotel;
