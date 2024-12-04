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
export const createData = async (data: BusData): Promise<BusData> => {
    const response = await apiCleint.post<BusData>('/api/buses', data);
    return response.data;
};

// put


// patch

// delete

