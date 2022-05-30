import { createSlice } from '@reduxjs/toolkit';

//REDUCER FUNCTION
export const journeySlice = createSlice({
  name: 'journey',
  //define initial state
  initialState: {
    count: 0,
    journeys: []
  },
  
  //reducer functions
  reducers: {
      //GET REQUEST
    fetchJourney: (state, action) => {
      //response is array
      state.journeys = action.payload;
      console.log('in dispatcher', state.journeys[0]);
    },

    // addPost: (state, action) => {
    //   //most recent post 
    //   state.posts[action.payload.id] = action.payload.post

    // },
    // JOIN POST WILL BE A STRETCH FEATURE
    joinJourney: (state, action) => {
        // state.posts[action.payload.id].buds.push(action.payload.user)
    },

    deleteJourney: (state, action) => {
      const newStateJourneys = state.journeys(el => el.id === action.payload.id)
      state.journeys = newStateJourneys

    }

  },

})


export const { fetchJourney, joinJourney, deleteJourney } = journeySlice.actions


//SELECTORS TO INCLUDE
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJourney = (state) => state.posts.journeys

export default journeySlice.reducer