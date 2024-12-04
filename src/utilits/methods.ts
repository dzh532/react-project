import apiCleint from "./api";

export interface BusData {
    gos_number: string;
    capacity: number;
    is_air_conditioner: boolean;
}

// get
export const getData = async (): Promise<BusData[]> => {
    const response = await apiCleint.get<BusData[]>('/api/buses');
    return response.data;
};

// post

// put

// patch

// delete

