import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import settingReducer from './settingsSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;