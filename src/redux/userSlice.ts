import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    user: { name: string | null, email: string | null, password: string | null };
}

const initialState: UserState = {
    isAuthenticated: false,
    user: { name: null, email: null, password: null },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
            state.user = action.payload;
        },
        login: (state, action: PayloadAction<{ name: string; password: string }>) => {
            state.isAuthenticated = true;
        },
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { register, login, logout, setAuth } = userSlice.actions;
export default userSlice.reducer;