import React from 'react';
import { useSelector } from 'react-redux';
import { selectFirstname } from '../reducers/userSlice';
import { selectJourney, selectUpcomingJourneys } from '../reducers/journeySlice';
import wanderbud from '../media/wanderbud-logo.png'
import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
    const firstName = useSelector(selectFirstname);
    const journeys = useSelector(selectJourney);
    const upcomingJourneys = useSelector(selectUpcomingJourneys);

    const allJourneys = [...upcomingJourneys];

    console.log('allJourneys', allJourneys);

    const userJourneys = allJourneys.sort(el=> el.date).map(el => {
        const { origin, destination, date } = el;
        return (
            <div className="userJourney" key={uuidv4()}>
                 <div className="journey-logo">
                <img className="journey-img" src={wanderbud} />
            </div>
            <div className="mainFrame">
                <div className="topPart">
                    <div className="journey-label">
                        <p className="journey-trait-label">Origin: </p>
                        <p className="journey-trait">{origin}</p>
                    </div>

                    <div className="journey-label">
                        <p className="journey-trait-label">Destination:</p>
                        <p className="journey-trait">{destination}</p>
                    </div>

                    <div className="journey-label">
                        <p className="journey-trait-label" >Date:</p>
                        <p className="journey-trait" >{date}</p>
                    </div>
                
                </div>
            </div>
            </div>
        )
    })
    


   return (

        <div className="profile">
            <div className="profile-header">
                {firstName && <h1>Welcome <i>{firstName}</i></h1>}
            </div>
            <div className="list-journeys">
                <div className="list-h2">
                    <h2>Your journeys</h2>
                </div>
                {userJourneys}
            </div>

        </div>

   )


}

export default Profile;
