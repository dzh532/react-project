import React, { useEffect, useState } from 'react';
import { getCompanies, createCompany, updateCompany, deleteCompany, CompanyData } from '../utilits/methods_company';
import { getBusesByCompany } from '../utilits/methods_bus_in_com'; // API-запрос для автобусов в компании
import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Dialog, DialogTitle, DialogContent, Typography, Modal } from '@mui/material';
import { setLoading, setError } from '../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanies, addCompany, updateCompany as updateCompanyAction, deleteCompany as deleteCompanyAction } from '../redux/companiesSlice';
import { RootState } from '../utilits/store';
import ResponsiveAppBar from './header';
import CompanySearch from './CompanySeacrh';
import CompanyReport from './CompanyReport';

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


interface Bus {
  buses_gos_number: string;
}

const DataBaseCompany: React.FC = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state: RootState) => state.companies.companies);
    const [name, setName] = useState('');
    const [durationWork, setDurationWork] = useState(0);
    const [address, setAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [editingCompany, setEditingCompany] = useState<CompanyData | null>(null);
    const [searchResults, setSearchResults] = useState<CompanyData[] | null>(null);
    const [minDur, setMinDur] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Новое состояние для автобусов
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
    const [companyBuses, setCompanyBuses] = useState<Bus[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Получение данных о компаниях
    const fetchCompanies = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getCompanies();
            dispatch(setCompanies(data));
        } catch (error) {
            dispatch(setError("Ошибка при получении данных о компаниях."));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Создание новой компании
    const handleCreateCompany = async () => {
        if (!name || durationWork < 0 || !address || !numberPhone) {
            dispatch(setError("Все поля должны быть заполнены корректно."));
            return;
        }
        try {
            const newCompany: CompanyData = {
                name,
                duration_work: durationWork,
                address,
                number_phone: numberPhone,
            };
            dispatch(setLoading(true));
            await createCompany(newCompany);
            dispatch(addCompany(newCompany));
            fetchCompanies();
            clearForm();
        } catch (error) {
            console.error("Ошибка при добавлении компании:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Обновление компании
    const handleUpdateCompany = async () => {
        if (editingCompany) {
            try {
                const updatedCompany: CompanyData = {
                    name: editingCompany.name,
                    duration_work: durationWork,
                    address,
                    number_phone: numberPhone,
                };
                dispatch(setLoading(true));
                await updateCompany(editingCompany.name, updatedCompany);
                dispatch(updateCompanyAction(updatedCompany));
                fetchCompanies();
                clearForm();
                setEditingCompany(null);
            } catch (error) {
                console.error("Ошибка при обновлении компании:", error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    // Удаление компании
    const handleDeleteCompany = async (name: string) => {
        dispatch(setLoading(true));
        try {
            await deleteCompany(name);
            dispatch(deleteCompanyAction(name));
            fetchCompanies();
        } catch (error) {
            console.error("Ошибка при удалении компании:", error);
            dispatch(setError("Невозможно удалить: У компании имеются автобусы!"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Очистка формы
    const clearForm = () => {
        setName('');
        setDurationWork(0);
        setAddress('');
        setNumberPhone('');
    };

    // Открытие модального окна и получение автобусов
    const handleViewBuses = async (companyName: string) => {
        try {
            dispatch(setLoading(true));
            setSelectedCompany(companyName);
            const buses = await getBusesByCompany(companyName); // Запрос к API для получения автобусов
            setCompanyBuses(buses);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Ошибка при получении автобусов компании:", error);
            dispatch(setError("В данной компании нету автобусов"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Закрытие модального окна
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCompanyBuses([]);
    };

    return (
        <>
        < ResponsiveAppBar />
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>Информация о компаниях</Typography>

            <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Стаж работы (годы)"
                    type="number"
                    value={durationWork}
                    onChange={(e) => setDurationWork(Number(e.target.value))}
                    required
                />
                <TextField
                    label="Адрес"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <TextField
                    label="Номер телефона"
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                    required
                />
                <Button onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}>
                    {editingCompany ? 'Обновить' : 'Добавить'}
                </Button>
            </Box>

            <h2>Поиск</h2>
            <CompanySearch 
                company={companies} 
                onSearchResults={(results) => setSearchResults(results)} 
            />


                <Box sx={{ float: 'right' }}>
                    <Button 
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Отчет по компаниям
                    </Button>
                </Box>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <h1>Компании по минимальному стажу работы</h1>
                        <Button variant="contained" onClick={handleClose} sx={{ marginTop: 2, float: 'right' }}>
                            Закрыть
                        </Button>
                        <TextField
                            label="Минимальны стаж компании"
                            value={minDur}
                            type="number"
                            onChange={(e) => setMinDur(Number(e.target.value))}
                            required
                        />
                        <CompanyReport min_dur={minDur}/>
                    </Box>
                </Modal>

            {searchResults && searchResults.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Результаты поиска:</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Стаж работы (годы)</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map(company => (
                                    <TableRow key={company.name}>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.duration_work}</TableCell>
                                        <TableCell>{company.address}</TableCell>
                                        <TableCell>{company.number_phone}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setEditingCompany(company);
                                                    setName(company.name);
                                                    setDurationWork(company.duration_work);
                                                    setAddress(company.address);
                                                    setNumberPhone(company.number_phone);
                                                }}
                                            >
                                                Редактировать
                                            </Button>
                                            <Button onClick={() => handleDeleteCompany(company.name)}>
                                                Удалить
                                            </Button>
                                            <Button onClick={() => handleViewBuses(company.name)}>
                                                Посмотреть автобусы
                                            </Button>
                                        </TableCell>
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
                                <TableCell>Название</TableCell>
                                <TableCell>Стаж работы (годы)</TableCell>
                                <TableCell>Адрес</TableCell>
                                <TableCell>Номер телефона</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map(company => (
                                <TableRow key={company.name}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.duration_work}</TableCell>
                                    <TableCell>{company.address}</TableCell>
                                    <TableCell>{company.number_phone}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                setEditingCompany(company);
                                                setName(company.name);
                                                setDurationWork(company.duration_work);
                                                setAddress(company.address);
                                                setNumberPhone(company.number_phone);
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button onClick={() => handleDeleteCompany(company.name)}>
                                            Удалить
                                        </Button>
                                        <Button onClick={() => handleViewBuses(company.name)}>
                                            Посмотреть автобусы
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Автобусы компании: {selectedCompany}</DialogTitle>
                <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Госномер автобуса</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companyBuses.map((bus, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{bus.buses_gos_number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </DialogContent>
            </Dialog>
        </Box>
        </>
    );
};

export default DataBaseCompany;