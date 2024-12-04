import React from "react";
import { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginSuccess = useSelector((state: RootState) => state.user.loginSuccess);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (loginSuccess)
        {
            navigate('/user-profile');
        } 
        else
        {
            alert('Пользователь не найден');
        }
    };

    return (
        <div>
            <h1>Авторизация</h1>

            <form onSubmit={handleLogin}>
                <p>Почта</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <p>Пароль</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Login;