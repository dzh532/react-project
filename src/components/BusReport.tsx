import React, { useState } from 'react';
import { getBusesWithAirConditioner, BusData } from '../utilits/methods';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const BusReport: React.FC = () => {
    const [reportData, setReportData] = useState<BusData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Обработчик для загрузки отчета
    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            const data = await getBusesWithAirConditioner();
            setReportData(data);
        } catch (error) {
            console.error('Ошибка при генерации отчета:', error);
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
                                <TableCell>Госномер</TableCell>
                                <TableCell>Вместимость</TableCell>
                                <TableCell>Кондиционер</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportData.map((bus) => (
                                <TableRow key={bus.gos_number}>
                                    <TableCell>{bus.gos_number}</TableCell>
                                    <TableCell>{bus.capacity}</TableCell>
                                    <TableCell>{bus.is_air_conditioner ? 'Да' : 'Нет'}</TableCell>
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

export default BusReport;
