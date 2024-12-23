import apiClient from "./api";

// Интерфейс для данных записи в buses_in_company
export interface BusInCompanyData {
    buses_gos_number: string;
    company_name: string;
}

// GET: Получение всех записей из таблицы buses_in_company
export const getBusInCompany = async (): Promise<BusInCompanyData[]> => {
    try {
        const response = await apiClient.get<BusInCompanyData[]>('/api/buses_in_company');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных из buses_in_company:", error);
        throw error;
    }
};

// GET: Получение всех автобусов для определенной компании
export const getBusesByCompany = async (companyName: string): Promise<BusInCompanyData[]> => {
    try {
        const response = await apiClient.get<BusInCompanyData[]>(`/api/buses_in_company/company/${encodeURIComponent(companyName)}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении автобусов для компании ${companyName}:`, error);
        throw error;
    }
};


// POST: Добавление записи в таблицу buses_in_company
export const addBusToCompany = async (gosNumber: string, companyName: string): Promise<BusInCompanyData> => {
    try {
        const response = await apiClient.post<BusInCompanyData>('/api/buses_in_company', {
            buses_gos_number: gosNumber,
            company_name: companyName
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении записи в buses_in_company:", error);
        throw error;
    }
};

// delete
export const deleteData = async (gos_number: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/buses_in_company/${gos_number}`);
    } catch (error) {
        console.error(`Ошибка при удалении данных для госномера ${gos_number}:`, error);
        throw error;
    }
};
