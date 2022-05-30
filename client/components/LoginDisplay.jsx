import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { useSpring, animated } from 'react-spring';


const LoginDisplay = () => {
    const [ switchForm, setSwitchForm ] = useState(false);
    
    //login form
    const loginPosition = useSpring({left: switchForm? -500: 0});
    const loginBtn = useSpring({
        color: switchForm? "gray": "#FF3D2E",
        borderTop: switchForm? "solid 0px transparent": "solid 2px #FF3D2E",
        borderLeft: switchForm? "solid 0px transparent": "solid 2px #FF3D2E",
        borderRight: switchForm? "solid 0px transparent": "solid 2px #FF3D2E",
        borderBottom: switchForm? 
        "solid 0px transparent": "solid 2px #FF3D2E",
        backgroundColor: switchForm? "#F4F4F4":"white",
        borderRadius: 2
    });
    const handleLogin = () => {
        setSwitchForm(false);
    }


    //signup form
    const signupPosition = useSpring({left: switchForm? 0: 500});
    const signupBtn = useSpring({
        color: switchForm? "#FF3D2E":"gray",
        borderTop: switchForm? "solid 2px #FF3D2E": "solid 0px transparent",
        borderLeft: switchForm? "solid 2px #FF3D2E": "solid 0px transparent",
        borderRight: switchForm? "solid 2px #FF3D2E": "solid 0px transparent",
        borderBottom: switchForm? 
        "solid 2px #FF3D2E": "solid 0px transparent",
        backgroundColor: switchForm? "white":"#F4F4F4",
        borderRadius: 2});
    const handleSignup = () => {
        setSwitchForm(true);
    }
    

    return (
        <div className="login-display">
            <div className="login-signup-btns">
                <animated.button className="login-button"
                    onClick={handleLogin}
                    id="loginBtn"
                    style={loginBtn}         
                >
                    Login
                </animated.button>
                <animated.button className="signup-button"
                    onClick={handleSignup}
                    id="signupBtn"
                    style={signupBtn}
                >
                    Signup
                </animated.button>
            </div>
            <div className="form-display">
                {switchForm? <SignupForm /> : <LoginForm />}
            </div>
            
        </div>


    );

};


export default LoginDisplay;