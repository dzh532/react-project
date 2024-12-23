import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: { name: string | null, email: string | null, password: string | null };
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    user: { name: null, email: null, password: null },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
            state.user = action.payload;
            state.isAdmin = false;
        },
        login: (state, action: PayloadAction<{ name: string; password: string }>) => {
            state.isAuthenticated = true;
        },
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
        },
    },
});

export const { register, login, logout, setAuth, setAdmin } = userSlice.actions;
export default userSlice.reducer;