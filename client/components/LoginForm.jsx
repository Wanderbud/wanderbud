import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const loginForm = () => {
    //useDispatch hook to dispatch addUser action (fetch user data)
    const dispatch = useDispatch();
    //useNavigate hook to redirect page
    const navigate = useNavigate();

    //set values for the login form 
    const [values, setValues] = useState({
        email: '',
        password:'' 
    })

    //check for errors
    const [error, setError] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

    //onchange handler for login form
    const onLogin = e => {
        //Deconstruct the input fields and their values from e.target
        const { name, value } = e.target
        //values will be updated with their input values
        setValues({
            ...values,
            [ name ]: value
        })
    }

    //onsubmit handler for login form
    const handleSubmit = e => {
        const { email, password } = values;
        e.preventDefault();

        if (!email || !password){
            setError(true);
            setValues({
                email: '',
                password:'' 
            })
        } else {
            const login = async () => {
                //send post request to database to register user
                try {
                    const sendData = await axios.post('http://localhost:3000/login', values);

                    /* NEED TO CHANGE !!!!!!!! have backend send status, if user already exists in database, have signup error status be true and do not navigate to posts*/
                    console.log('login response', sendData.data)
                    //should dispatch userData back
                    //having errors here, cannot change setAuthStatus
                    setAuthStatus(sendData.data.isAuthenticated);
                    console.log('authStatus', authStatus)
                    if(sendData.data.isAuthenticated) navigate("/posts"); 

                } catch (err) {
                    setError(true);
                    console.log('error', err);
                }
                
            }

            login();

            //set input fields back to blank fields
            setValues({
                email: '',
                password:'' 
             })
        }
    }



    return (

        <div className="login">
            {/* LOGIN FORM */}
            <form className="login-form" onSubmit={handleSubmit}>
                <h1> Welcome back </h1>
                <div className="login-inputs">
                    <label htmlFor="email" className="login-label">Email </label>
                    <input 
                        id="email"
                        type="text" 
                        name="email" 
                        className="login-input" 
                        placeholder="Enter your email"                        
                        value={values.email}
                        onChange={onLogin}
                    />
                </div>
                {/* password */}
                <div className="login-inputs">
                    <label htmlFor="password" className="login-label">Password </label>
                    <input 
                        id="password"
                        type="text" 
                        name="password" 
                        className="login-input" 
                        placeholder="Choose a password"
                        value={values.password}
                        onChange={onLogin}
                    />
                </div>
                <button className="form-input-btn" type="submit">Login</button>
                {/* If field is missing, then display error message */}
                {error && <p>Invalid email or password. Try Again</p>}
            </form>
    
        </div>
    );

};





    



    //login Button handler - Post request with login details
    // const handleLogin = e => {
    //     //CREATE LOGIN REQUEST TO BACKEND WITH THE EMAIL AND PASSWORD DATA
    //     const sendlogin = async () => {
    //         try{
    //             const loginData = await axios.post('http://localhost:3000/login', { firstName, lastName, age, newEmail, newPassword })
    //             // const loginData = await axios.post('http://localhost:3000/login', { firstName, lastName, age, newEmail, newPassword })
    //             //dispatch addUser info into store
    //             dispatch(addUser(loginData.data));
    //         } catch (err) {
    //             //have component render Unable to login instead?
    //             console.log(err);
    //         }
    //     }
    //     sendLogin();
    //     navigate("/posts");
    // }


    // LOGIN Button handler - Post request with login details

export default loginForm;