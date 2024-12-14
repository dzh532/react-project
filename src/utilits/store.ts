import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import settingReducer from '../redux/settingsSlice';
import busesReducer from '../redux/busesSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingReducer,
        buses: busesReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;