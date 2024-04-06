import React, { useEffect, useState } from 'react';
import airindia from "../flight/airIndia.jpg";
import indigo from "../flight/indigo.jpg";
import spicejet from "../flight/spicejet.jpg";
import emirates from "../flight/emirate.jpg";
import vistara from "../flight/vistara.jpg";
import { faClose, faPlaneArrival, faPlaneDeparture, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const SearchFlight = ({ depart, arrival, flightDate }) => {
    const [flightList, setFlightList] = useState([]);
    const [sortOrder, setSortOrder] = useState('select');
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [fare, setFare] = useState(null);


    const handleSeeDetails = (flight) => {
        setSelectedFlight(flight);
    };

    const handleCloseDetails = () => {
        setSelectedFlight(null);
    };

    const handleSelect = (flight) => {
        setFare(flight);
    };

    const handleClose = () => {
        setFare(null);
    };


    useEffect(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const selectedDate = new Date(flightDate);
        const dayIndex = selectedDate.getDay();
        const selectedDay = days[dayIndex];

        const fetchData = async () => {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${depart}","destination":"${arrival}"}&day=${selectedDay}`, {
                    headers: {
                        'projectId': '8iwe1dc6tcby' // Add projectId header
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlightList(data.data.flights);
                console.log(data.data.flights)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [depart, arrival, flightDate]);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };



    const sortedList = () => {
        let sortedFlights = [...flightList];

        switch (sortOrder) {
            case 'asc':
                sortedFlights.sort((a, b) => a.ticketPrice - b.ticketPrice);
                break;
            case 'desc':
                sortedFlights.sort((a, b) => b.ticketPrice - a.ticketPrice);
                break;
            case 'highRating':
                sortedFlights.sort((a, b) => b.duration - a.duration);
                break;
            case 'lowRating':
                sortedFlights.sort((a, b) => a.duration - b.duration);
                break;
            default:
                break;
        }



        return sortedFlights;
    };

    const navigate = useNavigate();

    // Function to handle form submission
    const handleBook = async (event) => {
        event.preventDefault(); 

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': '8iwe1dc6tcby',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "bookingType": "flight",
                    "userId": '1',
                    "bookingDetails": {
                        "flightId": `${selectedFlight._id}`,
                        "startDate": new Date().toISOString(),
                        "endDate": new Date().toISOString()
                    }
                })
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            Swal.fire({
                icon: "success",
                title: `Booking successful`,
                text: "Go to my booking to check booked flight",
                footer: '<b>Happy Journey</b>'
              });

              navigate('/')

            console.log('Booking successful');
        } catch (error) {
            console.log(error)
            navigate('/login')
            toast.error("Login first....Not Booked!!!")
        }
        
    };



    return (
        <div>
            {selectedFlight ? (

                fare ? (
                    <React.Fragment>
                        <div >
                           
                            <div style={{ display: "flex" }}>

                                <div style={{ marginLeft: "1rem" }}>
                                    <h1 style={{ color: "red" }}>Fill All Details</h1>
                                    <Form onSubmit={handleBook}>
                                        <div  style={{ marginBottom: "1rem" }}>
                                        <div style={{ marginLeft: "3rem" }}>
                                            <h2>Contact Details</h2>

                                            <div style={{ marginBottom: "2rem" }}>
                                                <b>Contact Email  :</b><br />
                                                <input type="email" required style={{ padding: "6px", width: "20rem" }} />
                                            </div>

                                            <div style={{ marginBottom: "2rem" }}>
                                                <b>Phone Number :</b><br />
                                                <input type='phone' required style={{ padding: "6px", width: "20rem" }} max={10} />
                                            </div>
                                        </div>

                                        <div style={{ marginLeft: "3rem" }}>
                                            <h2>Traveller 1 (Adult)</h2>

                                            <div style={{ marginBottom: "2rem", display: "flex" }}>
                                                <div style={{ marginRight: "2rem" }}>
                                                    <b>First Name :</b><br />
                                                    <input type="text" required style={{ padding: "6px", width: "15rem" }} />
                                                </div>
                                                <div style={{ marginRight: "2rem" }}>
                                                    <b>Last Name :</b><br />
                                                    <input type="text" required style={{ padding: "6px", width: "15rem" }} />
                                                </div>
                                            </div>

                                            <div style={{display:"flex"}}>
                                                <div style={{ marginBottom: "2rem" }}>
                                                    <b style={{ fontSize: "1.5rem", marginRight: "2rem" }}>Gender :</b>
                                                    <select id="genderSelect" style={{ fontSize: "1.2rem" }} >
                                                        <option value="select">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Others</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <button type='submit' style={{ marginLeft: "12rem", padding: "15px", marginBottom: "1rem", background: "rgb(121, 145, 240)", color: "white" }}  >Confirm Booking</button>
                                                </div>
                                            </div>
                                    
                                    
                                        </div>
                                    </div>
                                    </Form>

                                    <div style={{ marginRight: "1rem", marginTop: "5rem" }}>
                                    <h3>Ticket Fare(1 Adult)</h3>
                                    <div>
                                        <b style={{ color: "red" }}>Flight Fare : INR {fare.ticketPrice}</b><br /><br />
                                        <b>Flight ID : {fare.flightID}</b>
                                    </div>
                                </div>

                                </div>


                               

                            </div>
                        </div>
                    </React.Fragment>
                )
                    : (
                        <React.Fragment>
                            <div className="flightDetails">

                                <div>
                                    <button style={{ padding: "5px", marginLeft: "80rem", marginTop: "0.5rem", marginBottom: "0.5rem" }} onClick={handleCloseDetails}><FontAwesomeIcon icon={faClose} /></button>
                                </div>
                                <h1 style={{ marginLeft: "4rem", color: "blue" }}>Your Flight Details</h1>

                                <div style={{ marginLeft: "4rem", marginTop: "4rem" }}>
                                    <b style={{ fontSize: "1.5rem" }}>Flight to {selectedFlight.destination}</b>
                                    <br />{selectedFlight.stops} Stop : {selectedFlight.duration} hrs.
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div style={{ marginLeft: "4rem", marginTop: "3rem" }}>
                                        <div style={{ marginBottom: "2rem" }}><FontAwesomeIcon icon={faPlaneDeparture} />  {selectedFlight.departureTime} - <b >{selectedFlight.source}</b></div>
                                        <div><FontAwesomeIcon icon={faPlaneArrival} />  {selectedFlight.arrivalTime} - <b >{selectedFlight.destination}</b></div>
                                    </div>

                                    <div style={{ marginLeft: "58rem" }}>
                                        <div style={{ marginBottom: "1rem" }}>
                                            {selectedFlight.airline === '65144a1b664a43628887c45e' && (
                                                <div>
                                                    <img src={airindia} alt="Air India" className="flightimgD" />
                                                    AirIndia
                                                </div>
                                            )}
                                            {selectedFlight.airline === '65144a1b664a43628887c460' && (
                                                <div>
                                                    <img src={indigo} alt="IndiGo" className="flightimgD" />
                                                    Indigo
                                                </div>
                                            )}
                                            {selectedFlight.airline === '65144a1b664a43628887c45d' && (
                                                <div>
                                                    <img src={vistara} alt="Vistara" className="flightimgD" />
                                                    Vistara
                                                </ div>

                                            )}
                                            {selectedFlight.airline === '65144a1b664a43628887c45f' && (
                                                <div>
                                                    <img src={spicejet} alt="SpiceJet" className="flightimgD" />
                                                    Spicejet
                                                </ div>

                                            )}
                                            {selectedFlight.airline === '65144a1b664a43628887c461' && (
                                                <div>
                                                    <img src={emirates} alt="Emirates" className="flightimgD" />
                                                    Emirates
                                                </div>

                                            )}
                                        </div>

                                        <div style={{ marginBottom: "1rem" }}>
                                            Flight Id : {selectedFlight.flightID}
                                        </div>

                                        <div>
                                            FLy Time : {selectedFlight.duration} hrs.
                                        </div>

                                    </div>
                                </div>

                                <div style={{ marginLeft: "4rem", marginTop: "4rem", display: "flex" }}>
                                    <div style={{ marginRight: "5rem", borderRight: "1px solid black" }}>
                                        <b style={{ fontSize: "1.5rem", marginRight: "5rem" }}>Included Baggage</b><br /><br />
                                        The total baggage include in the price.
                                    </div>

                                    <div >
                                        <b style={{ fontSize: "1.5rem" }}>Free Services</b>
                                        <ul>
                                            {selectedFlight.amenities.map(amenity => (
                                                <li key={amenity}>{amenity}</li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>


                                <div style={{ marginLeft: "4rem", marginTop: "2rem" }}>
                                    <b style={{ fontSize: "2rem", color: "red" }}>INR {selectedFlight.ticketPrice}</b><b style={{ marginLeft: "1rem", fontSize: "1.5rem" }}><FontAwesomeIcon icon={faQuestionCircle} /></b><br />
                                    Total fare of your travel

                                </div>

                                <button style={{ marginLeft: "75rem", padding: "15px", marginBottom: "1rem", background: "rgb(121, 145, 240)", color: "white" }} onClick={() => handleSelect(selectedFlight)}>Select</button>
                            </div>


                        </React.Fragment>
                    )



            ) : (
                <React.Fragment>

                    <h2 style={{ color: "blue" }}>Available Flights</h2>

                    <div className="searchItemContainer">
                        <div style={{ display: "flex" }}>
                            <div className="sortDropdown" style={{ marginLeft: "1rem" }}>
                                <label style={{ fontWeight: "bold", fontSize: "1.5rem" }} htmlFor="sort">Sort by:</label>
                                <select style={{ fontWeight: "bold", fontSize: "1rem" }} id="sort" onChange={handleSortChange} value={sortOrder}>
                                    <option value="select">Select</option>
                                    <option value="asc">Price: Low to High</option>
                                    <option value="desc">Price: High to Low</option>
                                    <option value="highRating">Duration: High to Low</option>
                                    <option value="lowRating">Duration: Low to High</option>
                                </select>
                            </div>

                        </div>

                        {sortedList().map((item, index) => (
                            <div key={index} className="searchItem">
                                {item.airline === '65144a1b664a43628887c45e' && (
                                    <img src={airindia} alt="Air India" className="flightimg" />
                                )}
                                {item.airline === '65144a1b664a43628887c460' && (
                                    <img src={indigo} alt="IndiGo" className="flightimg" />
                                )}
                                {item.airline === '65144a1b664a43628887c45d' && (
                                    <img src={vistara} alt="Vistara" className="flightimg" />
                                )}
                                {item.airline === '65144a1b664a43628887c45f' && (
                                    <img src={spicejet} alt="SpiceJet" className="flightimg" />
                                )}
                                {item.airline === '65144a1b664a43628887c461' && (
                                    <img src={emirates} alt="Emirates" className="flightimg" />
                                )}

                                <div className='flightTime'>
                                    <div style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
                                        <h3>{item.arrivalTime}</h3>
                                        <b>{item.source}</b>
                                    </div>

                                    <div style={{ marginLeft: "10rem", marginTop: "2rem" }}>
                                        <b>{item.duration} hr.</b>
                                        <hr />
                                        <b>{item.stops} Stop</b>
                                    </div>

                                    <div style={{ marginLeft: "10rem", marginRight: "2rem", marginBottom: "3rem", marginTop: "1rem" }}>
                                        <h3>{item.departureTime}</h3>
                                        <b>{item.destination}</b>
                                    </div>

                                    <style>
                                        {`.flightTime:hover h3,.flightTime:hover b { color: red; } `}
                                    </style>
                                </div>

                                <div className='flightIncl' >
                                    <p ><b>Included:</b> {item.amenities.join(', ')}</p>
                                    <div style={{ marginLeft: "12rem", marginTop: "1rem" }}>
                                        <b style={{ marginLeft: "4rem", color: "blue" }}>INR</b> <b> {item.ticketPrice}</b>
                                        <br />total price of a traveler
                                    </div>

                                    <button style={{ marginLeft: "15rem", marginTop: "1rem", border: "1px solid blue", padding: "10px", color: "blue", background: "white", cursor: "pointer" }} onClick={() => handleSeeDetails(item)}>View Details</button>

                                </div>

                            </div>
                        ))}
                    </div>

                </React.Fragment>
            )}

        </div>
    );
};

export default SearchFlight;
