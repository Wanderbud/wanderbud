import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Landing from "./containers/Landing";
// import Login from "./containers/Login";
// import Posts from "./containers/Posts";

//TEST IMPORTS
import Login from './containers/Login';
import PostDisplay from "./components/PostDisplay"
// import ErrorPage from './containers/ErrorPage';


const App = () => {

  

  return (
    <Router>
        {/* <nav>
            <Link to="/"> Home </Link>
            <Link to="/login">Login </Link>
            <Link to="/posts"> Posts </Link>
        </nav> */}
        <Routes>
            <Route path="/login" element={ <Login /> }/> 
            <Route path="/posts" element={ <PostDisplay /> }/> 
            <Route path="/*" element={<Landing />}/> 
            {/* <Route path="/login" element={<Login />}/>  */}
            {/* <Route path="/posts" element={<Posts />}/>  */}
            {/* error page */}
            {/* <Route path="*" element={<ErrorPage />}/>  */}
        </Routes>
            <div> Footer </div>
    </Router>

    // <div>
    //   <PostDisplay />
    // </div>
  );
}

export default App;
