import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Price = (props) => {
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

    // Function to render bed icons based on the number of beds
    const renderBedIcons = (bedDetail) => {
        const bedCount = parseInt(bedDetail);
        const bedIcons = [];

        for (let i = 0; i < bedCount; i++) {
            bedIcons.push(<FontAwesomeIcon key={i} icon={faBed} style={{ marginRight: '3px' }} />);
        }

        return bedIcons;
    };

    
    return (
        <div>
            {hotelData && (
                <>
                    <h1 style={{ color: "red" }}>Details Of Rooms:</h1>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {hotelData.data.rooms.map((room, index) => (
                            <li className="rooms" key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                                <div style={{ display: "flex", fontSize: "2rem", marginTop: "1rem" }}>
                                    <div style={{ marginLeft: "2rem" }}><b style={{ marginRight: "1rem" }}>Room Number:</b> {room.roomNumber}</div>
                                    <div style={{ marginLeft: "15rem" }}><b style={{ marginRight: "1rem" }}>Room Type:</b>{room.roomType}</div>
                                </div>

                                <div style={{ marginTop: "2rem", marginLeft: "2rem", display: "flex" }}>
                                    <div style={{ marginRight: "5rem" }}> <b style={{ marginRight: "1rem" }}> Cancelation Policy:</b>{room.cancellationPolicy}</div>
                                    <div style={{ marginRight: "5rem" }}> <b style={{ marginRight: "1rem" }}> Cost Per Night:</b>Rs {room.costPerNight}</div>
                                    <div > <b style={{ marginRight: "1rem" }}> Room Size:</b> {room.roomSize} sq ft.</div>
                                </div>

                                <div style={{ marginTop: "2rem", marginLeft: "2rem", display: "flex" }}>
                                    <div style={{ marginRight: "10rem" }}> <b style={{ marginRight: "1rem" }}> Bed Details:</b>{room.bedDetail} {renderBedIcons(room.bedDetail)}</div>
                                    <div style={{ marginRight: "10rem" }}> <b style={{ marginRight: "1rem" }}> Meals:</b> {room.meals.join(', ')}</div>
                                    <div > <b style={{ marginRight: "1rem" }}> Offers:</b> {room.offers.join(', ')} </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Price;
