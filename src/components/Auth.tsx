import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../utilits/api";
import { useDispatch } from "react-redux";
import { logout, setAuth } from "../redux/userSlice";
import { setLoading } from "../redux/settingsSlice";

interface AuthProviderProps {
    children: React.ReactNode; // Указываем тип для вложенных компонентов
}

const Auth: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token");

            // Пропускаем проверку для страниц входа и регистрации
            if (["/login", "/registration"].includes(location.pathname)) {
                return;
            }

            if (!token) 
            {
                if (["/user-profile", "/data-base"].includes(location.pathname))
                    navigate("/login");

                dispatch(logout());
                return;
            }
            else
            {
                if (["/login", "/registration"].includes(location.pathname)) {
                    navigate("/user-profile");
                    return;
                }
            }

            try {
                dispatch(setLoading(true));
                await apiClient.get("/jwt/validate/");
                dispatch(setAuth()); 
            } catch (error) {
                console.error("Токен недействителен или отсутствует:", error);
                localStorage.removeItem("access_token");
                dispatch(logout());
            } finally {
                dispatch(setLoading(false));
            }
        };

        checkAuth();
    }, [navigate, location]);

    return <>{children}</>; // Рендерим дочерние компоненты
};

export default Auth;
