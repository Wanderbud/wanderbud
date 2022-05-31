// use for logo animation (monitoring GET/POST request process)
// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Journey from '../components/Journey';
import { selectJourney } from '../reducers/journeySlice';
import SearchTest from './SearchTest';
import { v4 as uuidv4 } from 'uuid';

const JourneyDisplay = () => {

    // const posts = useSelector(selectPosts);

    // const [renderJourneys, setRenderJourneys] = useState([]);
    const journeys = useSelector(selectJourney);
    console.log('in journey', journeys);
    const renderJourneys = journeys.map((journey) => {
        return (
            <div className="journey-post" key={uuidv4()}>
                <Journey 
                    journey={journey}
                />
            </div>
        )
    });

    return (
        <div className="journey-display">
            <SearchTest />
            {renderJourneys}
        </div>
    );
};

export default JourneyDisplay;




