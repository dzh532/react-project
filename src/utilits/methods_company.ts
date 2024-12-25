import apiClient from "./api";

export interface CompanyData {
    name: string;
    duration_work: number;
    address: string;
    number_phone: string;
}

interface min_dur {
    minDur: number;
}

// get
export const getCompanies = async (): Promise<CompanyData[]> => {
    try {
        const response = await apiClient.get<CompanyData[]>('/api/company/companies');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных о компаниях:", error);
        throw error;
    }
};

// GET: Получение отчета по компаниям с минимальным стажем работы
export const getCompanyWithDurationWork = async (data: number): Promise<CompanyData[]> => {
    try {
        const response = await apiClient.get<CompanyData[]>(`/api/company/company/with_duration_work/${data}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении отчета о компаниях с минимальным стажем работы:', error);
        throw error;
    }
};

// post
export const createCompany = async (data: CompanyData): Promise<CompanyData> => {
    try {
        const response = await apiClient.post<CompanyData>('/api/company/companies', data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при добавлении компании:", error);
        throw error; 
    }
};

// put
export const updateCompany = async (name: string, data: CompanyData): Promise<CompanyData> => {
    try {
        const response = await apiClient.put<CompanyData>(`/api/company/companies/${name}`, data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении данных для компании ${name}:`, error);
        throw error; 
    }
};

// patch
export const patchCompany = async (name: string, data: Partial<CompanyData>): Promise<CompanyData> => {
    try {
        const response = await apiClient.patch<CompanyData>(`/api/company/companies/${name}`, data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при частичном обновлении данных для компании ${name}:`, error);
        throw error; 
    }
};

// delete
export const deleteCompany = async (name: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/company/companies/${name}`);
    } catch (error) {
        console.error(`Ошибка при удалении данных для компании ${name}:`, error);
        throw error;
    }
};
