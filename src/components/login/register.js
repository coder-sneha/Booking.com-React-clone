import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const navigate = useNavigate();
    const handleLogin = () => {

        navigate('/login');
    };


    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        appType: 'bookingportals'
    });

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': '{8iwe1dc6tcby}'
                },
                body: JSON.stringify({
                    name: formData.userName,
                    email: formData.userEmail,
                    password: formData.userPassword,
                    appType: formData.appType
                })
            });
    
            if (response.ok) {
                // Registration successful
                navigate('/login');
                toast.success('Registration successful');
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            toast.error('Server Error occurred');
        }
    };
    

    // Handler for input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='navbar'>
            <div className='navContainer' style={{ display: "flex" }}>
                <div style={{ color: "white", marginTop: "2rem", marginLeft: "3rem", fontSize: "1.5rem" }}>Booking.com</div>

                <div className='navItems' style={{ color: "white", marginTop: "2rem", marginLeft: "62rem" }}>
                    <button className='navButton' style={{ marginLeft: "0.5rem" }} onClick={handleLogin}>Login</button>
                </div>

            </div>

            <div className="registration-box" style={{background:"#a0c7ff"}}>
                <h1 style={{color:"red", textAlign:"center"}}>Registration Form!!</h1>
                <form onSubmit={handleSubmit}>
                    <div >
                        <div style={{marginTop:"2rem"}}>
                            <b>UserName :</b> <input type="text" name="userName" placeholder="Name" value={formData.userName} onChange={handleChange} />
                        </div>
                        <div style={{marginTop:"2rem"}}>
                            <b>UserEmail :</b> <input type="email" name="userEmail" placeholder="Email" value={formData.userEmail} onChange={handleChange} />
                        </div>
                        <div style={{marginTop:"2rem"}}>
                            <b>Password :</b> <input type="password" name="userPassword" placeholder="Password" value={formData.userPassword} onChange={handleChange} />
                        </div>
                        <div style={{marginTop:"2rem", marginLeft:"7rem"}}>
                            <button type="submit" className='navButton'>Register</button>
                        </div>

                    </div>
                </form>
            </div>



        </div>
    );
};

export default Register;
