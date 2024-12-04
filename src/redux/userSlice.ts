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
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        login: (state, action: PayloadAction<{ email: string }>) => {
            state.isAuthenticated = true;
            state.loginSuccess = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loginSuccess = false;
        },
    },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;