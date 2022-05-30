import { createSlice } from "@reduxjs/toolkit";

//REDUCER FUNCTION
export const postSlice = createSlice({
  name: "post",
  //define initial state
  initialState: {
    count: 0,
    posts: {},
  },

  //reducer functions
  reducers: {
    //GET REQUEST
    fetchPosts: (state, action) => {
      //response is array
      action.payload.map((obj) => (state.posts[obj.id] = obj));
    },

    // addPost: (state, action) => {
    //   //most recent post
    //   state.posts[action.payload.id] = action.payload.post

    // },
    // JOIN POST WILL BE A STRETCH FEATURE
    joinPost: (state, action) => {
      // state.posts[action.payload.id].buds.push(action.payload.user)
    },

    deletePost: (state, action) => {
      delete state.posts[action.payload.id];
      //newState = {...state}
      //   delete newState.posts[action.payload.id]
      //state = newState
    },
  },
});

export const { fetchPosts, joinPost, deletePost } = userSlice.actions;

//SELECTORS TO INCLUDE
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
