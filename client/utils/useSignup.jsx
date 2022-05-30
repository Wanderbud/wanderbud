import { useState, useEffect } from "react";
import { addUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const useSignup = () => {
//useDispatch hook to dispatch addUser action (fetch user data)
const dispatch = useDispatch();
//useNavigate hook to redirect page
const navigate = useNavigate();

//set values for the signup form 
const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password:'' 
})

//check for errors in signup fields
const [error, setError] = useState('');
const [signedUp, setSignedUp] = useState(false);


//onchange handler for signup form
const onSignup = e => {
    //Deconstruct the input fields and their values from e.target
    const { name, value } = e.target
    //values will be updated with their input values
    setValues({
        ...values,
        [ name ]: value
    })
}

//onsubmit handler for signup form
const handleSubmit = e => {
    const { firstName, lastName, age, email, password } = values;
    e.preventDefault();

    //checks for input fields being defined
    if (!firstName || !lastName || !age || !email || !password){
        setError(true);
    //if all fields present, send data to server
    } else {
        
            const signup = async () => {
                //send post request to database to register user
                const sendData = await axios.post('http://localhost:3000/signup', values);

                //dispatch addUser to send the data payload with generated id to redux store
                dispatch(addUser(sendData.data));

                /* NEED TO CHANGE !!!!!!!! have backend send status, if user already exists in database, have signup error status be true and do not navigate to posts*/
                if (sendData.data) setSignedUp(true);
                if (sendData.data) navigate("/posts");
            }

            signup();

            //set input fields back to blank fields
            setValues({
                firstName: '',
                lastName: '',
                age: '',
                email: '',
                password:'' 
             })
        }

        //if signedUp successfully, 
        // if (signedUp) navigate("posts");

    
}
    

    return { values, onSignup, error, handleSubmit };
}
