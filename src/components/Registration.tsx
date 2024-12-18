import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/userSlice";
import { TextField, Button, Box } from "@mui/material";
import ResponsiveAppBar from "./header"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootState } from "../utilits/store";
import { getData, createData, UserData } from "../utilits/methods_auth";
import { setLoading } from "../redux/settingsSlice";

const theme = createTheme({
    typography: {
      fontFamily: 'Comfortaa, Arial, sans-serif',
    },
  });
  
const Registration: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated)
        {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: UserData = { username: name, email: email, password: password };
        dispatch(register({ name, email, password }));
        try {
            dispatch(setLoading(true));
            await createData(newUser);
            navigate('/login');
        } catch (error) {
            
        } finally {
            dispatch(setLoading(false));
        }   
    };

    return (
        <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                width: '50vw', 
                border: '1px solid #ccc', 
                borderRadius: '16px', 
                padding: 2, 
                position: 'absolute', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <h1>Регистрация</h1>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box mb={2}>
                    <TextField 
                        id="outlined-basic" 
                        label="Имя" 
                        variant="outlined" 
                        type="text" 
                        fullWidth 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField 
                        id="outlined-basic" 
                        label="Почта" 
                        variant="outlined" 
                        type="email" 
                        fullWidth 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField 
                        id="outlined-basic" 
                        label="Пароль" 
                        variant="outlined" 
                        type="password" 
                        fullWidth 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </Box>

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Box>
        </ThemeProvider>
    );
};

export default Registration;

