import apiClient from "./api";
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/settingsSlice';

export interface UserData {
    username: string,
    email: string,
    password: string,
}

export interface UserDataLogin {
    username: string,
    password: string,
}

export interface TokenInfo {
    access_token: string;
    token_type: string;
}
 
// get
export const getData = async (): Promise<UserData[]> => {
    try {
        const response = await apiClient.get<UserData[]>('/jwt/login');
        return response.data;
    } catch (error) {
        console.error("Ошибка при входе", error);
        throw error;
    }
};

// post
export const createData = async (data: UserData): Promise<UserData> => {
    try {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);

        const response = await apiClient.post<UserData>('/jwt/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Указание типа контента
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error; 
    }
};

// post (авторизация)
// export const loginData = async (data: { username: string; password: string }): Promise<TokenInfo> => {
export const loginData = async (data: UserDataLogin): Promise<TokenInfo> => {
    try {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);

        const response = await apiClient.post<TokenInfo>('/jwt/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Сохраняем токен (например, в localStorage или через Redux)
        localStorage.setItem('access_token', response.data.access_token);
        return response.data;
    } catch (error) {
        console.error("Ошибка при авторизации:", error);
        throw error;
    }
};