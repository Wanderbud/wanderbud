import React from "react";
import axios from "axios";

// const Journey = ({origin, destination, date, journey_id})=>{
const Journey = ({journey}) => {
    console.log('in journey component', journey)
    const { origin, destination, date, creator, distance, cost, journey_id} = journey;
    const { firstName } = creator;

    console.log('in front end journey', date);
    console.log('in front end journey22', typeof date);
    console.log('in front end journey22', date.toString().slice(0, 10));
    const joinObj = {
        userID: creator.user_id,
        journeyID: journey_id
    }

    // const handleClick =() => {

    //     axios.post("http://localhost:3000/journey", {joinObj})
    //     .then(res => {
    //         let newData = res.data;
    //     })
    //     .catch(err => {
    //         console.log("ERROR");
    //     })
    // }
    
    return (
        <div className="mainFrame">
            <div className="topPart">
                <div className="journey-label">
                    <p className="journey-trait">Origin: </p>
                    <p className="journey-trait">{origin}</p>
                </div>

                <div className="journey-label">
                    <p className="journey-trait">Destination:</p>
                    <p className="journey-trait">{destination}</p>
                </div>

                <div className="journey-label">
                    <p className="journey-trait" >Date:</p>
                    <p className="journey-trait" >{date}</p>
                </div>

                {/* <div className="journey-join-btn">
                    <button className="joinButton" onClick={handleClick}>Join</button>         
                </div> */}

            </div>

            <div className="bottomPart">
                <div className="journey-label">
                    <p className="journey-trait" >Posted by:</p>
                    <p className="journey-trait" >{firstName}</p>
                </div>

                <div className="journey-label">
                    <p className="journey-trait" >Distance:</p>
                    <p className="journey-trait" >{distance}</p>
                </div>

                <div className="journey-label">
                    <p className="journey-trait" >Cost:</p>
                    <p className="journey-trait" >{cost}</p>  
                </div>              
            </div>
        </div>
    )

}


export default Journey;
