import React, { useContext } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AppContext } from '../context/AppContext';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, categories } = useContext(AppContext);

  return (
    <ToggleButtonGroup
      value={selectedCategory}
      exclusive
      onChange={(e, newCategory) => setSelectedCategory(newCategory)}
      aria-label="product categories"
      sx={{ mb: 2, flexWrap: 'wrap' }}
    >
      {categories.map(category => (
        <ToggleButton 
          key={category} 
          value={category}
          sx={{ textTransform: 'capitalize' }}
        >
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CategoryFilter;