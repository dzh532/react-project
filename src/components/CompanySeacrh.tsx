import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { CompanyData } from '../utilits/methods_company';

interface CompanySearchProps {
  company: CompanyData[];
  onSearchResults: (results: CompanyData[]) => void;
}

const CompanySearch: React.FC<CompanySearchProps> = ({ company, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const foundCompany = company.filter(com => com.name.includes(searchQuery));
    onSearchResults(foundCompany);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <TextField
        label="Поиск по названию компании"
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

export default CompanySearch;
