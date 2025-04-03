import React, { useContext } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../context/AppContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;