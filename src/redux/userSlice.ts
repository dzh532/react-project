import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    userInfo: { name: string, email: string } | null;
    loginSuccess: boolean;
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
    loginSuccess: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
});

export default userSlice.reducer;