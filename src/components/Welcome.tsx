import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ResponsiveAppBar from "./header"
import BusSearchForm from "./BusSeacrhForm";

const Welcome: React.FC = () => {
    return (
        <div>
            <div>
                <ResponsiveAppBar />
                {/* <Button component={Link} to="user-profile" variant="contained">Личный кабинет</Button> */}
                {/* <Button component={Link} to="data-base" variant="contained">База данных</Button> */}
                {/* <Button component={Link} to="graph" variant="contained">Графы</Button> */}
                {/* <Link to="user-profile">Личный кабинет</Link> */}
                {/* <Link to="data-base">База данных</Link> */}
                {/* <Link to="graph">Графы</Link> */}
            </div>

            <h1 style={{ textAlign: 'center' }}>Добро пожаловать!</h1>
            < BusSearchForm />

        </div>
    );
};

export default Welcome;