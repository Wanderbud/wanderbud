import { createSlice } from '@reduxjs/toolkit';

//REDUCER FUNCTION
export const journeySlice = createSlice({
  name: 'journey',
  //define initial state
  initialState: {
    count: 0,
    journeys: [],
    upcomingJourneys: [],
    completedJourneys: []
  },
  
  //reducer functions
  reducers: {
      //GET REQUEST
    fetchJourney: (state, action) => {
      //response is array
      state.journeys = [...action.payload];
      console.log('in dispatcher', state.journeys[0]);
    },

    // addPost: (state, action) => {
    //   //most recent post 
    //   state.posts[action.payload.id] = action.payload.post

    // },
    // JOIN POST WILL BE A STRETCH FEATURE
    joinJourney: (state, action) => {
        // state.posts[action.payload.id].buds.push(action.payload.user)
        state.upcomingJourneys.push(action.payload);
    },

    deleteJourney: (state, action) => {
      const newStateJourneys = state.upcomingJourneys.filter(el => el.id === action.payload)
      state.upcomingJourneys = newStateJourneys;
    }

  },

})


export const { fetchJourney, joinJourney, deleteJourney } = journeySlice.actions


//SELECTORS TO INCLUDE
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJourney = (state) => state.journeys.journeys
export const selectUpcomingJourneys = (state) => state.journeys.upcomingJourneys

export default journeySlice.reducer