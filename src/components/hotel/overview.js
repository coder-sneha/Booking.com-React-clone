import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

const OverView = (props) => {
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
                    <h1>{hotelData.data.name}</h1>
                    <FontAwesomeIcon style={{ fontSize: "1.3rem", color:"blue"}} icon={faLocationPin} /> {hotelData.data.location}
                    <h2>Propertie Images</h2>
                    <div className="image-container">
                        {hotelData.data.images.map((image, index) => (
                            <img 
                            key={index} 
                            src={image} 
                            alt={`Image ${index + 1}`} 
                            style={{ 
                                height: '20rem',
                                width: '30rem' ,
                                marginRight: '1rem',
                                marginBottom: '1rem'
                            }} 
                        />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default OverView;
