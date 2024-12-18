import apiClient from "./api";
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/settingsSlice';

export interface BusData {
    gos_number: string;
    capacity: number;
    is_air_conditioner: boolean;
}
 
// get
export const getData = async (): Promise<BusData[]> => {
    try {
        const response = await apiClient.get<BusData[]>('/api/buses/buses');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных о автобусах:", error);
        throw error;
    }
};

// post
export const createData = async (data: BusData): Promise<BusData> => {
    try {
        const response = await apiClient.post<BusData>('/api/buses/buses', data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при доавблении автобуса:", error);
        throw error; 
    }
};

// put
export const updateData = async (gos_number: string, data: BusData): Promise<BusData> => {
    try {
        const response = await apiClient.put<BusData>(`/api/buses/buses/${gos_number}`, data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении данных для госномера ${gos_number}:`, error);
        throw error; 
    }
};

// patch
export const patchData = async (gos_number: string, data: Partial<BusData>): Promise<BusData> => {
    try {
        const response = await apiClient.patch<BusData>(`/api/buses/buses/${gos_number}`, data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при частичном обновлении данных для госномера ${gos_number}:`, error);
        throw error; 
    }
};

// delete
export const deleteData = async (gos_number: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/buses/buses/${gos_number}`);
    } catch (error) {
        console.error(`Ошибка при удалении данных для госномера ${gos_number}:`, error);
        throw error;
    }
};