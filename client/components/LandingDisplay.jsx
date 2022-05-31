import React from "react";
import { useNavigate } from "react-router-dom";
import LandingImg from "../media/landing-img.png";

const LandingDisplay = () => {
  // We define a navigate and assign it to the onClick activity
  const navigate = useNavigate();

  const handleClick = e => {
      e.preventDefault();
      navigate("/login");
  }
  return (
    <div className="landing-display">
        <div className="landing-img-div"> 
           <img className="landing-img" src={LandingImg} alt="landing image" />   
        </div>
        <div className="landing-btn-div">
            <button className="landing-btn" onClick={handleClick}> Get Started/ Login</button>
        </div>
    </div>
  );
};

export default LandingDisplay;