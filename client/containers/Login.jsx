import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import LoginDisplay from '../components/LoginDisplay';
import PostDisplay from '../components/PostDisplay';

const Login = () => {
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const navigate = useNavigate();


    // const submitSignup = useCallback(() => {
    //     setIsSubmitted(true)
    //   }, [setIsSubmitted])

    const submitSignup = () => {
        setIsSubmitted(true);
    }

    return (
        <div className="form-signup">
            {/* <LoginDisplay /> */}
            {!isSubmitted? (<LoginDisplay submitSignup={submitSignup} />) : navigate("/posts")}
        </div>
    )


};

export default Login;