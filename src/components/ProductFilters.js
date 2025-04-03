import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppContext } from '../context/AppContext';

const ProductFilters = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption
  } = useContext(AppContext);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Category Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Category</Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Select Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem 
                    key={category} 
                    value={category}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Price Range Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{ width: '95%', mx: 'auto' }}
            />
          </Box>

          {/* Sort Options */}
          <Box>
            <Typography gutterBottom>Sort By</Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Sort Options</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort Options"
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="title-asc">Alphabetical: A-Z</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProductFilters;