import React from "react";
import { useNavigate } from "react-router-dom";

const landingDisplay = () => {
  // We define a navigate and assign it to the onClick activity
  const navigate = useNavigate();
  return (
    <div>
      <div className="landingImage"> THERE WILL BE A COOL IMAGE</div>;
      <button onClick={() => navigate("/login")}>Sign up / Login </button>;
    </div>
  );
};

export default landingDisplay;
