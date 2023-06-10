import {combineReducers, configureStore} from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userReducer from '../store/userSlice';



const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
});


export default configureStore({
  reducer: {
    root: rootReducer,
    user: userReducer
  },
});
export type IRootState = ReturnType<typeof rootReducer>;
