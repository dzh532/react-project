import React, { useState } from "react";

const Registration: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {

    };

    return (
        <div>
            <h1>Регистрация</h1>

            <form onSubmit={handleSubmit}>
                <p>Имя</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <p>Почта</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <p>Пароль</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;