import React from 'react';
import Navbar from '../navbar';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';




const HotelBook = () => {

    const navigate = useNavigate();

    const location = useLocation();

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
                    "bookingType": "hotel",
                    "userId": '1',
                    "bookingDetails": {
                        "hotelId": `${location.state.id}`,
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
                text: "Go to my booking to check booked hotel",
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

            <Navbar />

            <div>

                <div style={{ display: "flex" }}>

                    <div style={{ marginLeft: "3rem" }}>
                        <h1 style={{ color: "red" }}>Fill All Details</h1>
                        <Form onSubmit={handleBook}>
                            <div style={{ marginBottom: "1rem" }}>
                                <div style={{ marginLeft: "3rem", display:"flex" }}>
                                    <div>
                                       <h2>Contact Details</h2>

                                    <div style={{ marginBottom: "2rem" }}>
                                        <b >Contact Email  :</b><br />
                                        <input type="email" required style={{ padding: "6px", width: "20rem" }} />
                                    </div>

                                    <div style={{ marginBottom: "2rem", marginTop:"5rem"}}>
                                        <b >Phone Number :</b><br />
                                        <input type='phone' required style={{ padding: "6px", width: "20rem" }} max={10} />
                                    </div> 
                                    </div>

                                    <div style={{marginLeft:"10rem", marginTop:"4.5rem", marginRight:"4rem"}}>
                                    <div style={{ marginBottom: "2rem" }}>
                                        <b>Address  :</b><br />
                                        <input type="text" required style={{ padding: "6px", width: "20rem", height:"3rem" }} />
                                    </div>

                                    <div style={{ marginBottom: "2rem" }}>
                                        <b>Personal ID :</b>
                                        <select id="genderSelect" style={{ marginLeft:"1rem", marginBottom:"1rem" }} >
                                                <option value="select">Select</option>
                                                <option value="aadhar">Aadhar Card</option>
                                                <option value="pan">Pan Card</option>
                                                <option value="Driving">Driving Licence</option>
                                            </select>
                                        <br />
                                        <input type='phone' required style={{ padding: "6px", width: "20rem" }} max={10}  />
                                    </div> 
                                    </div>
                                    
                                </div>

                                <div style={{ marginLeft: "3rem" }}>
                                    <h2>1 Adult</h2>

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

                                    <div style={{ display: "flex" }}>
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
                                            <div>
                                                <h1 style={{marginLeft:"20rem", color:"red"}}>Total Price : INR {location.state.price}</h1>
                                            </div>
                                            <button type='submit' style={{ marginLeft: "30rem", padding: "15px", marginBottom: "1rem", background: "rgb(121, 145, 240)", color: "white" }}  >Confirm Booking</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </Form>
                    </div>


                    <div style={{ marginLeft: "4rem", marginTop: "5rem" }}>
                       
                    </div>

                </div>
            </div>


        </div>
    );
};

export default HotelBook;
