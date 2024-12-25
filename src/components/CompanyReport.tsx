import React, { useState } from 'react';
import { getCompanyWithDurationWork, CompanyData } from '../utilits/methods_company';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/settingsSlice';

interface CompanyReportData {
    min_dur: number;
}

const CompanyReport: React.FC<CompanyReportData> = ({ min_dur }) => {
    const [reportData, setReportData] = useState<CompanyData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [god, setGod] = useState("");
    const dispatch = useDispatch();

    // Обработчик для загрузки отчета
    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            const data = await getCompanyWithDurationWork( min_dur );
            setReportData(data);
        } catch (error) {
            console.error('Ошибка при генерации отчета:', error);
            // setGod(min_dur > 1 && min_dur < 5 ? " года" : min_dur === 1 ? " год" : " лет");
            dispatch(setError("Компании с минимальным стажем работы " + min_dur + 
                (min_dur > 1 && min_dur < 5 ? " года" : min_dur === 1 ? " год" : " лет") + 
                " не нашлось"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Button
                variant="contained"
                onClick={handleGenerateReport}
                disabled={loading}
                sx={{ marginBottom: 2 }}
            >
                {loading ? 'Генерация отчета...' : 'Сгенерировать отчет'}
            </Button>

            {loading && <CircularProgress />}

            {!loading && reportData.length > 0 && (
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
                        {reportData.map(company => (
                            <TableRow key={company.name}>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.duration_work}</TableCell>
                                <TableCell>{company.address}</TableCell>
                                <TableCell>{company.number_phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}

            {!loading && reportData.length === 0 && <p>Отчет пуст или не загружен.</p>}
        </Box>
    );
};

export default CompanyReport;