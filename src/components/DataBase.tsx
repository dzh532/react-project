import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData, BusData } from '../utilits/methods';
import { TextField, Button, Box, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { setLoading, setError } from '../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setBuses, addBus, updateBus, deleteBus } from '../redux/busesSlice';
import { RootState } from '../utilits/store';
import { useNavigate } from 'react-router-dom';
import BusReport from './BusReport';


const DataBase: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buses = useSelector((state: RootState) => state.buses.buses);
    const { showError } = useSelector((state: RootState) => state.settings);
    const [gosNumber, setGosNumber] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [isAirConditioner, setIsAirConditioner] = useState(false);
    const [editingBus, setEditingBus] = useState<BusData | null>(null);
    const [loading, set_Loading] = useState(false);

    // Получение данных о автобусах
    const fetchBuses = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getData();
            dispatch(setBuses(data));
        } catch (error) {
            dispatch(setError("Ошибка при получении данных о автобусах."));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchBuses(); 
    }, []);

    // Создание нового автобуса
    const handleCreateBus = async () => {
        try {
            const newBus: BusData = { gos_number: gosNumber, capacity: capacity, is_air_conditioner: isAirConditioner };
            dispatch(setLoading(true));
            await createData(newBus);
            dispatch(addBus(newBus));
            fetchBuses(); // Обновляем список автобусов
            clearForm(); // Очищаем форму
        } catch (error) {
            console.error("Ошибка при добавлении автобуса:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Обновление существующего автобуса
    const handleUpdateBus = async () => {
        if (editingBus) {
            try {
                const updatedBus: BusData = { gos_number: editingBus.gos_number, capacity: capacity, is_air_conditioner: isAirConditioner };
                dispatch(setLoading(true));
                await updateData(editingBus.gos_number, updatedBus);
                dispatch(updateBus(updatedBus));
                fetchBuses(); // Обновляем список автобусов
                clearForm(); // Очищаем форму
                setEditingBus(null); // Сбрасываем режим редактирования
            } catch (error) {
                console.error("Ошибка при обновлении автобуса:", error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    // Удаление автобуса
    const handleDeleteBus = async (gos_number: string) => {
        try {
            dispatch(setLoading(true));
            await deleteData(gos_number);
            dispatch(deleteBus(gos_number));
            fetchBuses(); // Обновляем список автобусов
        } catch (error) {
            console.error("Ошибка при удалении автобуса:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Очистка формы
    const clearForm = () => {
        setGosNumber('');
        setCapacity(0);
        setIsAirConditioner(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <h1>Таблица автобусы</h1>
            < BusReport />
            <>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField 
                        label="Госномер" 
                        value={gosNumber} 
                        onChange={(e) => setGosNumber(e.target.value)} 
                        required 
                    />
                    <TextField 
                        label="Вместимость" 
                        type="number" 
                        value={capacity} 
                        onChange={(e) => setCapacity(Number(e.target.value))} 
                        required 
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAirConditioner}
                                onChange={(e) => setIsAirConditioner(e.target.checked)} 
                                color="primary"
                            />
                        }
                        label="Кондиционер"
                    />
                    <Button onClick={editingBus ? handleUpdateBus : handleCreateBus}>
                        {editingBus ? 'Обновить' : 'Добавить'}
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Госномер</TableCell>
                                <TableCell>Вместимость</TableCell>
                                <TableCell>Кондиционер</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buses.map((bus) => (
                                <TableRow key={bus.gos_number}>
                                    <TableCell>{bus.gos_number}</TableCell>
                                    <TableCell>{bus.capacity}</TableCell>
                                    <TableCell>{bus.is_air_conditioner ? 'Да' : 'Нет'}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => { 
                                            setEditingBus(bus); 
                                            setGosNumber(bus.gos_number); 
                                            setCapacity(bus.capacity); 
                                            setIsAirConditioner(bus.is_air_conditioner); 
                                        }}>
                                            Редактировать
                                        </Button>
                                        <Button onClick={() => handleDeleteBus(bus.gos_number)}>
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </> 
        </Box>
    );
};

export default DataBase;