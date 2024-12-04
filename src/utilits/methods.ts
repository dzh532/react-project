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
export const updateData = async (gos_number: string, data: BusData): Promise<BusData> => {
    const response = await apiCleint.put<BusData>(`/api/buses/${gos_number}`, data);
    return response.data;
};

// patch
export const patchData = async (gos_number: string, data: Partial<BusData>): Promise<BusData> => {
    const response = await apiCleint.patch<BusData>(`/api/buses/${gos_number}`, data);
    return response.data;
};

// delete

