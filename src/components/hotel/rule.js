import React, { useState, useEffect } from 'react';




const Rule = (props) => {

    const { id } = props; 
    const [hotelData, setHotelData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`, {
                    headers: {
                        'projectId': '8iwe1dc6tcby'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setHotelData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);
 
  return (
    <div>
             {hotelData && (
                <>
                   <h1 style={{color:"red"}}>Most Popular Facilities</h1>
                   <ul>
                        {hotelData.data.amenities.map((amenity, index) => (
                            <li style={{fontSize:"1.3rem", marginBottom:"1rem"}} key={index}>{amenity}</li>
                        ))}
                    </ul>

                    <h1 style={{color:"red"}}>Rules And Restrictions</h1>
                    <ul>
                        <li  style={{fontSize:"1.3rem", marginBottom:"1rem"}}>Unmarried Couples Allowed: {hotelData.data.houseRules.guestProfile.unmarriedCouplesAllowed ? "Yes" : "No"}</li>
                        <li  style={{fontSize:"1.3rem", marginBottom:"1rem"}}>Local IDs Allowed: {hotelData.data.houseRules.idProofRelated.localIdsAllowed ? "Yes" : "No"}</li>
                        <li  style={{fontSize:"1.3rem", marginBottom:"1rem"}}>Pets Allowed: {hotelData.data.houseRules.restrictions.petsAllowed ? "Yes" : "No"}</li>
                        <li  style={{fontSize:"1.3rem", marginBottom:"1rem"}}>Smoking Allowed: {hotelData.data.houseRules.restrictions.smokingAllowed ? "Yes" : "No"}</li>
                        <li  style={{fontSize:"1.3rem", marginBottom:"1rem"}}>ID Proofs Accepted: {hotelData.data.houseRules.restrictions.idProofsAccepted.join(', ')}</li>
                    </ul>
                </>
            )}
  

    </div>
  );
};

export default Rule;
