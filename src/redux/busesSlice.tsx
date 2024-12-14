import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BusData {
    gos_number: string;
    capacity: number;
    is_air_conditioner: boolean;
}

interface BusesState {
    buses: BusData[];
}

const initialState: BusesState = {
    buses: [],
};

const busesSlice = createSlice({
    name: "buses",
    initialState,
    reducers: {
        setBuses: (state, action: PayloadAction<BusData[]>) => {
            state.buses = action.payload;
        },
        addBus: (state, action: PayloadAction<BusData>) => {
            state.buses.push(action.payload);
        },
        updateBus: (state, action: PayloadAction<BusData>) => {
            const index = state.buses.findIndex(bus => bus.gos_number === action.payload.gos_number);
            if (index !== -1) {
                state.buses[index] = action.payload;
            }
        },
        deleteBus: (state, action: PayloadAction<string>) => {
            state.buses = state.buses.filter(bus => bus.gos_number !== action.payload);
        },
    },
});

export const { setBuses, addBus, updateBus, deleteBus } = busesSlice.actions;
export default busesSlice.reducer;
