import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import LoginDisplay from '../components/LoginDisplay';
import PostDisplay from '../components/PostDisplay';

const Login = () => {

    return (
        <div className="form-signup">
            
            <LoginDisplay />
        </div>
    )


};

export default Login;