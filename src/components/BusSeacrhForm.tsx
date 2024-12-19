import React, { useState } from "react";
import { TextField, Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utilits/store";
import { setLoading } from "../redux/settingsSlice";

const BusSearchForm = () => {
    const [companyName, setCompanyName] = useState("");
    const [isAirConditioner, setIsAirConditioner] = useState(false);
    const [minCapacity, setMinCapacity] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [results, setResults] = useState([]);
    const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const [onClickSearch, setOnClickSearch] = useState(false);
    const [companyName_result, setCompanyName_result] = useState("");

    const handleSearch = async () => {
        if (!isAuth)
        {
            return alert("Необходимо авторизоваться!");            
        }
        if (!companyName || !minCapacity || !maxCapacity)
        {
            return alert("Заполнены не все поля!");
        }
        setOnClickSearch(true);
        setCompanyName_result(companyName);
        try {
            dispatch(setLoading(true));
            const response = await axios.get('http://localhost:8000/api/buses/search_buses', {
                params: {
                  company_name: companyName,
                  is_air_conditioner: isAirConditioner,
                  min_capacity: minCapacity,
                  max_capacity: maxCapacity
                }
              });
            setResults(response.data);
        } catch (error) {
            console.error("Ошибка при выполнении поиска:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Box>
            <h1>Поиск автобусов</h1>
            <Box>
                <TextField
                    label="Название компании"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAirConditioner}
                            onChange={(e) => setIsAirConditioner(e.target.checked)}
                        />
                    }
                    label="С кондиционером"
                />
                <TextField
                    label="Мин. вместимость"
                    type="number"
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Макс. вместимость"
                    type="number"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Button onClick={handleSearch}>Искать</Button>
            </Box>
            <Box>
                <h2>Результаты поиска</h2>
                { onClickSearch && results.length === 0 ? (
                    <p>Не нашлось записей с такими параметрами</p>
                ) : (
                    <ul>
                        {results.map((result: any, index) => (
                            <li key={index}>
                                Гос. номер: {result.gos_number}, Вместимость: {result.capacity}, Компания: {companyName_result}
                            </li>
                        ))}
                    </ul>
                    )}
            </Box>
        </Box>
    );
};

export default BusSearchForm;
