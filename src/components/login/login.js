import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
     
      navigate('/register');
    };

    const [formData, setFormData] = useState({
        userEmail: '',
        userPassword: '',
        appType: 'bookingportals' // Constant for all
    });

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('https://academics.newtonschool.co/api/v1/bookingportals/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': '{8iwe1dc6tcby}'
            },
            body: JSON.stringify({
                email: formData.userEmail,
                password: formData.userPassword,
                appType: 'bookingportals'
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                toast.error('Login failed');
            }
        })
        .then(data => {
            if (data && data.token) {
                const token = data.token;
                const userName = data.data.name;
                localStorage.setItem('token', token);
                localStorage.setItem('userName', userName);

                function cleanLocalStorage() {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                }
            
                setTimeout(cleanLocalStorage, 5 * 60 * 1000);

                navigate('/');
                toast.success('Login successful');
            } else {
                toast.error('Login failed'); 
            }
        })
        .catch(error => {
            console.log(error)
            toast.error('Server Error occurred');
        });
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
    <div className='navbar' >
      <div className='navContainer' style={{ display: "flex"}}>
        <div style={{ color: "white", marginTop: "2rem", marginLeft: "3rem", fontSize: "1.5rem" }}>Booking.com</div>

        <div className='navItems' style={{ color: "white", marginTop: "2rem", marginLeft: "62rem" }}>
          <button className='navButton' onClick={handleRegister} >Register</button>
        </div>

      </div>

      <div className="registration-box" style={{background:"#a0c7ff"}}>
                <h1 style={{color:"red", textAlign:"center"}}>Login Form!!</h1>
                <form onSubmit={handleSubmit}>
                    <div >
                        <div style={{marginTop:"2rem"}}>
                            <b>UserEmail :</b> <input type="email" name="userEmail" placeholder="Email" value={formData.userEmail} onChange={handleChange} />
                        </div>
                        <div style={{marginTop:"2rem"}}>
                            <b>Password :</b> <input type="password" name="userPassword" placeholder="Password" value={formData.userPassword} onChange={handleChange} />
                        </div>
                        <div style={{marginTop:"2rem", marginLeft:"7rem"}}>
                            <button type="submit" className='navButton'>Login</button>
                        </div>

                    </div>
                </form>
            </div>
    
      
    </div>
  );
};

export default Login;
