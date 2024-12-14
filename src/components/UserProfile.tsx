import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utilits/store";
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

    return (
        <div>
            <h1>Ваш профиль</h1>
        </div>
    );
};

export default UserProfile;