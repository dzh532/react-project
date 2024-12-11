import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    userInfo: { name: string, email: string, password: string } | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
            state.userInfo = action.payload;
        },
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;