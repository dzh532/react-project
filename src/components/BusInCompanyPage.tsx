import React, { useEffect, useState } from 'react';
import { getCompanies } from '../utilits/methods_company'; // API-запросы для компаний
import { addBusToCompany, getBusInCompany, deleteData } from '../utilits/methods_bus_in_com'; // API-запросы для автобусов
import { getData } from '../utilits/methods';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading } from '../redux/settingsSlice';
import ResponsiveAppBar from './header';
import { RootState } from '../utilits/store';

interface Company {
  name: string;
}

interface Bus {
  gos_number: string;
}

interface BusInCompany {
  buses_gos_number: string;
  company_name: string;
}

const BusInCompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [busInCompanyRecords, setBusInCompanyRecords] = useState<BusInCompany[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const isAdm = useSelector((state: RootState) => state.user.isAdmin);

  // Получаем список компаний
  const fetchCompanies = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Ошибка при загрузке компаний:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Получаем список автобусов
  const fetchBuses = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getData();
      setBuses(data);
    } catch (error) {
      console.error('Ошибка при загрузке автобусов:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Получаем записи из таблицы buses_in_company
  const fetchBusInCompanyRecords = async () => {
    dispatch(setLoading(true));
    try {
      // Получить все записи из таблицы buses_in_company
      const records = await getBusInCompany(); // API-запрос для получения данных
      setBusInCompanyRecords(records);
    } catch (error) {
      console.error('Ошибка при загрузке записей из buses_in_company:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Обработчик для добавления новой записи
  const handleAddBusToCompany = async () => {
    if (!isAuth)
    {
      return alert('Необходимо авторизоваться под учетной записью Админа');
    }
    if (!selectedBus || !selectedCompany) {
      alert('Выберите автобус и компанию!');
      return;
    }

    setIsSubmitting(true);
    dispatch(setLoading(true));
    try {
      // Проверка наличия автобуса в таблице buses_in_company
      const busAlreadyAssigned = busInCompanyRecords.some(
        (record) => record.buses_gos_number === selectedBus
      );

      if (busAlreadyAssigned) {
        // alert('Этот автобус принадлежит другой компании');
        dispatch(setError("Этот автобус уже принадлежит другой компании"));
        return;
      }
      
      // Проверка наличия автобуса и компании в соответствующих таблицах
      const busExists = buses.some(bus => bus.gos_number === selectedBus);
      const companyExists = companies.some(company => company.name === selectedCompany);

      if (!busExists || !companyExists) {
        alert('Автобус или компания не существуют.');
        return;
      }

      // Добавляем запись в таблицу buses_in_company
      await addBusToCompany(selectedBus, selectedCompany);
      alert('Запись успешно добавлена!');
      fetchBusInCompanyRecords(); // Обновляем записи после добавления
    } catch (error) {
      console.error('Ошибка при добавлении записи в buses_in_company:', error);
      dispatch(setError("Ошибка при добавлении записи!"));
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  const handleDeleteBusInCompany = async (gos_number: string) => {
    dispatch(setLoading(true));
    try {
      await deleteData(gos_number);
      fetchBusInCompanyRecords();
    } catch (error) {
      
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchBuses();
    fetchBusInCompanyRecords();
  }, []);

  return (
    <>
    < ResponsiveAppBar />
    <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>Информация о автобусах в компаниях</Typography>
          <>
        { isAdm && (
          <>
          <h2>Добавление новой записи</h2>
          <FormControl fullWidth margin="normal">
            <InputLabel>Автобус</InputLabel>
            <Select
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
              label="Автобус"
            >
              {buses.map((bus) => (
                <MenuItem key={bus.gos_number} value={bus.gos_number}>
                  {bus.gos_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Компания</InputLabel>
            <Select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              label="Компания"
            >
              {companies.map((company) => (
                <MenuItem key={company.name} value={company.name}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleAddBusToCompany}
            disabled={isSubmitting}
            sx={{ marginTop: 2 }}
          >
            {isSubmitting ? 'Добавляем...' : 'Добавить'}
          </Button>
        </>
      )}


          {/* <h2 sx={{ marginTop: 3 }}>Существующие записи</h2> */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Существующие записи
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Госномер автобуса</TableCell>
                  <TableCell>Компания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {busInCompanyRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.buses_gos_number}</TableCell>
                    <TableCell>{record.company_name}</TableCell>
                  {isAdm && (  
                    <TableCell>
                      <Button onClick={() => handleDeleteBusInCompany(record.buses_gos_number)}>
                          Удалить
                      </Button>
                  </TableCell>
                  )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    </Box>
    </>

  );
};

export default BusInCompanyPage;