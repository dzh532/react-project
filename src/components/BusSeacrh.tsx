import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { BusData } from '../utilits/methods';

interface BusSearchProps {
  buses: BusData[];
  onSearchResults: (results: BusData[]) => void;
}

const BusSearch: React.FC<BusSearchProps> = ({ buses, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const foundBuses = buses.filter(bus => bus.gos_number.includes(searchQuery));
    onSearchResults(foundBuses);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <TextField
        label="Поиск по госномеру"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginRight: 2, width: '300px' }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Найти
      </Button>
    </Box>
  );
};

export default BusSearch;
