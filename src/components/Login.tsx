import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utilits/store";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, InputAdornment, IconButton } from "@mui/material";
import ResponsiveAppBar from "./header"
import AlertDialog from './AlertDialog';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from "../redux/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setLoading } from '../redux/settingsSlice';
import { loginData, UserDataLogin } from "../utilits/methods_auth";

const theme = createTheme({
    typography: {
      fontFamily: 'Comfortaa, Arial, sans-serif',
    },
  });
  
const Login: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const userInfo = useSelector((state: RootState) => state.user.user);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) 
        {
            navigate('/user-profile');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const loginUser: UserDataLogin = { username: name, password: password };
            await loginData(loginUser);
            dispatch(login({ name, password }));   
            navigate('/user-profile');
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            setAlertOpen(true);
        } finally {
            dispatch(setLoading(false)); // Завершаем загрузку
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
            <h1>Авторизация</h1>

            <form onSubmit={handleLogin} style={{ width: '100%' }}>

                <Box mb={2}>
                    <TextField 
                        // id="outlined-basic" 
                        id="outlined-basic-name" 
                        label="Имя" 
                        variant="outlined" 
                        // type="email" 
                        fullWidth 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField 
                        id="outlined-basic" 
                        label="Пароль" 
                        variant="outlined" 
                        type={showPassword ? "text" : "password"} 
                        fullWidth 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="показать пароль"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Войти
                </Button>
            </form>
        </Box>
        <AlertDialog open={alertOpen} onClose={() => setAlertOpen(false)} />
        </ThemeProvider>
    );
}

export default Login;