import { configureStore } from '@reduxjs/toolkit';
import postSlice from './reducers/postSlice';
import userSlice from './reducers/userSlice';

export default configureStore({
    reducer: {
        users: userSlice,
        posts: postSlice
        
    }
})