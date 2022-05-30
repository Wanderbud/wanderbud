import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from "./containers/Landing";
// import Login from "./containers/Login";
// import Posts from "./containers/Posts";
import Wanderbud from "./media/wanderbud-logo.png"
//TEST IMPORTS
import Login from './containers/Login';
import JourneyDisplay from "./components/JourneyDisplay"
import { selectFirstname } from './reducers/userSlice';

// import ErrorPage from './containers/ErrorPage';


const App = () => {
  const firstName = useSelector(selectFirstname);

  return (
    <Router>
        <nav className="navbar">
            <img className="navbar-logo" src={Wanderbud} alt="Wanderbud" />
            <h1>wanderBud</h1>
            <div className="navbar-links">
              <Link className="navbar-link" to="/"> Home </Link>
              { !firstName && <Link className="navbar-link" to="/login">Login </Link>}
              { firstName && <Link className="navbar-link" to="/journey"> Journeys </Link>}
            </div>
        </nav>
        {firstName && <p>Welcome {firstName}</p>}
        <Routes>
            <Route path="/login" element={ <Login /> }/> 
            <Route path="/journey" element={ <JourneyDisplay /> }/> 
            <Route path="/*" element={<Landing />}/> 
            {/* <Route path="/login" element={<Login />}/>  */}
            {/* <Route path="/journey" element={<Journeys />}/>  */}
            {/* error page */}
            {/* <Route path="*" element={<ErrorPage />}/>  */}
        </Routes>
            <div className="footer"> Footer </div>
    </Router>

    // <div>
    //   <PostDisplay />
    // </div>
  );
}

export default App;
