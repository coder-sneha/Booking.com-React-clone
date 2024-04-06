import React, { useEffect, useState } from 'react';
import Navbar from './navbar';




const Booking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: '8iwe1dc6tcby'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                // Handle error
            }
        };

        fetchBookings();
    }, []);

    console.log(bookings)

    return (
        <div>

            <Navbar />
            <h1 style={{ color: "red" }}>Your All Booking</h1>
            <div className='booking'>
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div key={booking._id} className='bookingItem'>
                            <h2 style={{ marginLeft: "20rem" }}>Booking Type: {booking.booking_type}</h2>
                            <div style={{ display: "flex", marginBottom: "1rem", fontSize: "1.3rem" }}>
                                <div style={{ marginLeft: "2rem", marginRight: "15rem" }}><b>Start Date: </b>{new Date(booking.start_date).toLocaleDateString()}</div>
                                <div style={{ marginRight: "15rem" }}><b>End Date:</b> {new Date(booking.end_date).toLocaleDateString()}</div>
                                <div><b>Status:</b> <a style={{ color: "green" }}>{booking.status}</a></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: "center", fontSize:"5rem" }}>Not done any booking</div>
                )}
            </div>

        </div>
    );
};

export default Booking;
