import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData, BusData } from '../utilits/methods';
import { TextField, Button, Box, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal } from '@mui/material';
import { setLoading, setError } from '../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setBuses, addBus, updateBus, deleteBus } from '../redux/busesSlice';
import { RootState } from '../utilits/store';
import { useNavigate } from 'react-router-dom';
import BusReport from './BusReport';
import BusSearch from './BusSeacrh';
import ResponsiveAppBar from './header';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', 
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

const DataBase: React.FC = () => {
    const dispatch = useDispatch();
    const buses = useSelector((state: RootState) => state.buses.buses);
    const [gosNumber, setGosNumber] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [isAirConditioner, setIsAirConditioner] = useState(false);
    const [editingBus, setEditingBus] = useState<BusData | null>(null);
    const [searchResults, setSearchResults] = useState<BusData[] | null>(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            fetchBuses();
        } catch (error) {
            console.error("Ошибка при удалении автобуса:", error);
            dispatch(setError("Невозможно удалить: Автобус принадлежит компании!"));
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
        <>
        < ResponsiveAppBar />
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>Информация о автобусах</Typography>
            <>
            <h2>Добавление новой записи</h2>
                <Box sx={{ marginBottom: 2, display:'flex', gap: 2 }}>
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

                <h2>Поиск</h2>
                <BusSearch 
                    buses={buses} 
                    onSearchResults={(results) => setSearchResults(results)} 
                />

                <Box sx={{ float: 'right' }}>
                    <Button 
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Отчет по автобусам с кондиционерами
                    </Button>
                </Box>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <h1>Автобусы, у которых установлен кондиционер</h1>
                        <Button variant="contained" onClick={handleClose} sx={{ marginTop: 2 }}>
                            Закрыть
                        </Button>
                        <BusReport />
                    </Box>
                </Modal>

                {searchResults && searchResults.length > 0 && (
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Результаты поиска:</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Госномер</TableCell>
                                        <TableCell>Вместимость</TableCell>
                                        <TableCell>Кондиционер</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchResults.map(bus => (
                                        <TableRow key={bus.gos_number}>
                                            <TableCell>{bus.gos_number}</TableCell>
                                            <TableCell>{bus.capacity}</TableCell>
                                            <TableCell>{bus.is_air_conditioner ? 'Да' : 'Нет'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {searchResults && searchResults.length === 0 && (
                    <Typography sx={{ marginTop: 2 }}>Нет совпадений для поиска.</Typography>
                )}



                {!searchResults && (
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
                                {buses.map(bus => (
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
                )}

            </> 
        </Box>
        </>
    );
};

export default DataBase;