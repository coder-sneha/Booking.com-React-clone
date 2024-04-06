import React from 'react';
import Navbar from './navbar';
import Header from './header';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import four from "../assests/4.jpg";
import one from "../assests/1.jpg";
import five from "../assests/5.jpg";
import two from "../assests/2.jpg";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
        
      <div className=" offer" >
        <h3 className="text-lg">Offer</h3>
        <p className="text-sm ">Promotions, deals and special offers for you...</p>
      </div>

      <div  style={{ height: "10rem", width: "60rem", marginLeft: "12rem" }}>
        <AwesomeSlider animation="cubeAnimation"   >
          <div data-src={one} />
          <div data-src={two} />
          <div data-src={four} />
          <div data-src={five} />
        </AwesomeSlider>
      </div>
    </div>
  );
};

export default HomePage;
