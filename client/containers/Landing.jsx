import React from 'react'
import { useNavigate } from 'react-router-dom';



const Landing = () => {
  
  const navigate = useNavigate();

  const handleClick = e => {
      e.preventDefault();
      navigate("/login");
  }
  return (
    <div className="Landing">
        <h1> Hello </h1>
        <button className="login-redirect" onClick={handleClick}> Get started/ Login</button>
    </div>
  )
}

export default Landing;