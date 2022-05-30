import React from "react";
// import { useNavigate } from "react-router-dom";

const landingDisplay = () => {
  // handleclick function should redirect to the login page
  function handleClick() {}
  return (
    <div>
      <div className="landingImage"> THERE WILL BE A COOL IMAGE</div>;
      <button onClick={handleClick}>Sign up / Login </button>;
    </div>
  );
};

export default landingDisplay;
