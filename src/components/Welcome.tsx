import React from "react";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
    return (
        <div>
            <h1>Добро пожаловать!</h1>
            <div className="linkDiv">
                <Link to="user-profile">Личный кабинет</Link>
                <Link to="bus-data">Автобусы</Link>
                <Link to="graph">Графы</Link>
            </div>
        </div>
    );
};

export default Welcome;