    import React from "react";
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface SettingsState {
        isLoading: boolean;
        errorMessage: string | null;
        showError: boolean;
    }

    const initialState: SettingsState = {
        isLoading: false,
        errorMessage: null,
        showError: false,
    };

    const settingsSlice = createSlice({
        name: 'settings',
        initialState,
        reducers: {
            setLoading(state, action: PayloadAction<boolean>) {
                state.isLoading = action.payload;
            },
            setError(state, action: PayloadAction<string | null>) {
                state.errorMessage = action.payload;
                state.showError = action.payload !== null;
            },
            resetError(state) {
                state.errorMessage = null;
                state.showError = false;
            }
        },
    });

    export const { setLoading, setError, resetError } = settingsSlice.actions;

    export default settingsSlice.reducer;