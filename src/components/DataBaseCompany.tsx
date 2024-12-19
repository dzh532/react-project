import React, { useEffect, useState } from 'react';
import { getCompanies, createCompany, updateCompany, deleteCompany, CompanyData } from '../utilits/methods_company';
import { getBusesByCompany } from '../utilits/methods_bus_in_com'; // API-запрос для автобусов в компании
import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { setLoading, setError } from '../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanies, addCompany, updateCompany as updateCompanyAction, deleteCompany as deleteCompanyAction } from '../redux/companiesSlice';
import { RootState } from '../utilits/store';

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
    // const [loading, set_Loading] = useState(false);

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
        try {
            dispatch(setLoading(true));
            await deleteCompany(name);
            dispatch(deleteCompanyAction(name));
            fetchCompanies();
        } catch (error) {
            console.error("Ошибка при удалении компании:", error);
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
        <Box sx={{ padding: 2 }}>
            <h1>Таблица компаний</h1>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Стаж работы (годы)"
                    type="number"
                    value={durationWork}
                    onChange={(e) => setDurationWork(Number(e.target.value))}
                    required
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Адрес"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Номер телефона"
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                    required
                    sx={{ marginRight: 2 }}
                />
                <Button onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}>
                    {editingCompany ? 'Обновить' : 'Добавить'}
                </Button>
            </Box>

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
                        {companies.map((company) => (
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
    );
};

export default DataBaseCompany;














// import React, { useEffect, useState } from 'react';
// import { getCompanies, createCompany, updateCompany, deleteCompany, CompanyData } from '../utilits/methods_company';
// import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
// import { setLoading, setError } from '../redux/settingsSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCompanies, addCompany, updateCompany as updateCompanyAction, deleteCompany as deleteCompanyAction } from '../redux/companiesSlice';
// import { RootState } from '../utilits/store';

// const DataBaseCompany: React.FC = () => {
//     const dispatch = useDispatch();
//     const companies = useSelector((state: RootState) => state.companies.companies);
//     const [name, setName] = useState('');
//     const [durationWork, setDurationWork] = useState(0);
//     const [address, setAddress] = useState('');
//     const [numberPhone, setNumberPhone] = useState('');
//     const [editingCompany, setEditingCompany] = useState<CompanyData | null>(null);
//     const [loading, set_Loading] = useState(false);

//     // Получение данных о компаниях
//     const fetchCompanies = async () => {
//         dispatch(setLoading(true));
//         try {
//             const data = await getCompanies();
//             dispatch(setCompanies(data));
//         } catch (error) {
//             dispatch(setError("Ошибка при получении данных о компаниях."));
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     useEffect(() => {
//         fetchCompanies();
//     }, []);

//     // Создание новой компании
//     const handleCreateCompany = async () => {
//       if (!name || durationWork < 0 || !address || !numberPhone) {
//         dispatch(setError("Все поля должны быть заполнены корректно."));
//         return;
//       }
//         try {
//             const newCompany: CompanyData = {
//                 name,
//                 duration_work: durationWork,
//                 address,
//                 number_phone: numberPhone,
//             };
//             dispatch(setLoading(true));
//             await createCompany(newCompany);
//             dispatch(addCompany(newCompany));
//             fetchCompanies();
//             clearForm();
//         } catch (error) {
//             console.error("Ошибка при добавлении компании:", error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     // Обновление компании
//     const handleUpdateCompany = async () => {
//         if (editingCompany) {
//             try {
//                 const updatedCompany: CompanyData = {
//                     name: editingCompany.name,
//                     duration_work: durationWork,
//                     address,
//                     number_phone: numberPhone,
//                 };
//                 dispatch(setLoading(true));
//                 await updateCompany(editingCompany.name, updatedCompany);
//                 dispatch(updateCompanyAction(updatedCompany));
//                 fetchCompanies();
//                 clearForm();
//                 setEditingCompany(null);
//             } catch (error) {
//                 console.error("Ошибка при обновлении компании:", error);
//             } finally {
//                 dispatch(setLoading(false));
//             }
//         }
//     };

//     // Удаление компании
//     const handleDeleteCompany = async (name: string) => {
//         try {
//             dispatch(setLoading(true));
//             await deleteCompany(name);
//             dispatch(deleteCompanyAction(name));
//             fetchCompanies();
//         } catch (error) {
//             console.error("Ошибка при удалении компании:", error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     // Очистка формы
//     const clearForm = () => {
//         setName('');
//         setDurationWork(0);
//         setAddress('');
//         setNumberPhone('');
//     };

//     return (
//         <Box sx={{ padding: 2 }}>
//             <h1>Таблица компаний</h1>
//                 <>
//                     <Box sx={{ marginBottom: 2 }}>
//                         <TextField
//                             label="Название"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                             sx={{ marginRight: 2 }}
//                         />
//                         <TextField
//                             label="Стаж работы (годы)"
//                             type="number"
//                             value={durationWork}
//                             onChange={(e) => setDurationWork(Number(e.target.value))}
//                             required
//                             sx={{ marginRight: 2 }}
//                         />
//                         <TextField
//                             label="Адрес"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             required
//                             sx={{ marginRight: 2 }}
//                         />
//                         <TextField
//                             label="Номер телефона"
//                             value={numberPhone}
//                             onChange={(e) => setNumberPhone(e.target.value)}
//                             required
//                             sx={{ marginRight: 2 }}
//                         />
//                         <Button onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}>
//                             {editingCompany ? 'Обновить' : 'Добавить'}
//                         </Button>
//                     </Box>

//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Название</TableCell>
//                                     <TableCell>Стаж работы (годы)</TableCell>
//                                     <TableCell>Адрес</TableCell>
//                                     <TableCell>Номер телефона</TableCell>
//                                     <TableCell>Действия</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {companies.map((company) => (
//                                     <TableRow key={company.name}>
//                                         <TableCell>{company.name}</TableCell>
//                                         <TableCell>{company.duration_work}</TableCell>
//                                         <TableCell>{company.address}</TableCell>
//                                         <TableCell>{company.number_phone}</TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 onClick={() => {
//                                                     setEditingCompany(company);
//                                                     setName(company.name);
//                                                     setDurationWork(company.duration_work);
//                                                     setAddress(company.address);
//                                                     setNumberPhone(company.number_phone);
//                                                 }}
//                                             >
//                                                 Редактировать
//                                             </Button>
//                                             <Button onClick={() => handleDeleteCompany(company.name)}>
//                                                 Удалить
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </>
//         </Box>
//     );
// };

// export default DataBaseCompany;
