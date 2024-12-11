import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const UserProfile: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) 
        {
            navigate('/login');
        }
    }, [!isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated)
    {
        return (
            <div>
                <h1>Вы не авторизованы!</h1>
                <div>
                    <Link to="/login">Войти</Link>
                    <Link to="/registration">Зарегистрироваться</Link>
                    <Link to="/">Вернуться назад</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Ваш личный кабинет</h1>
            <button onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
    );
};

export default UserProfile;