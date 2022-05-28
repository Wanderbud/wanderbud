import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async() => {
      try {

        const fetchData = await axios.get('/locations');
        //response will be object with locations -> array of objects
        console.log(fetchData.data);
        dispatch(populateLocations(fetchData.data));
        // return fetchData;
        
      }
      catch (err) {
        console.log(err);
      }
    }
    fetching();
  },[]);

  return (
    <div>
      {/* <Header />
      <ItinContainer />
      <MapDisplay /> */}
    </div>
  );
}

export default App;
