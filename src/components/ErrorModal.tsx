import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetError } from '../redux/settingsSlice';
import { RootState } from '../utilits/store';
import { useNavigate } from 'react-router-dom';

const ErrorModal: React.FC = () => {
    const dispatch = useDispatch();
    const { showError, errorMessage } = useSelector((state: RootState) => state.settings);

    const handleClose = () => {
        dispatch(resetError());
    };

    return (
        <Modal open={showError} onClose={handleClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4 
            }}>
                <Typography variant="h6" component="h2">
                    Произошла ошибка
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 3 }}>
                    Закрыть
                </Button>
            </Box>
        </Modal>
    );
};

export default ErrorModal;
