import React, { useContext } from 'react';
import { 
  Grid, 
  Container, 
  CircularProgress, 
  Alert,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Paper,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';

const ProductListPage = () => {
  const { 
    filteredProducts, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    priceRange
  } = useContext(AppContext);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search and Filter Header */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            textTransform: 'capitalize',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            width: { xs: '100%', md: 'auto' }
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 50,
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }
                }
              }}
              sx={{ 
                maxWidth: { md: 400 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0,0,0,0.1)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0,0,0,0.2)'
                  }
                }
              }}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              sx={{
                display: { md: 'none' },
                borderRadius: 50,
                px: 3,
                borderColor: 'rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderColor: 'rgba(0,0,0,0.2)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Filters
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ 
          mt: 1,
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '0.95rem'
        }}>
          Showing <strong style={{color: '#333'}}>{filteredProducts.length}</strong> products
          {priceRange[0] > 0 || priceRange[1] < 1000 ? (
            <span style={{display: 'flex', alignItems: 'center'}}>
              • <span style={{marginLeft: 4}}>Price:</span> 
              <strong style={{color: '#333', marginLeft: 4}}>${priceRange[0]}</strong> 
              <span style={{margin: '0 4px'}}>-</span> 
              <strong style={{color: '#333'}}>${priceRange[1]}</strong>
            </span>
          ) : null}
        </Typography>
      </Paper>

      {/* Main Content Area */}
      <Grid container spacing={4}>
        {/* Filters Column - Desktop */}
        <Grid item xs={12} md={3} sx={{
          display: { xs: mobileFiltersOpen ? 'block' : 'none', md: 'block' }
        }}>
          <ProductFilters />
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          {filteredProducts.length === 0 ? (
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                No products found
              </Typography>
              <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                Try adjusting your search or filter criteria
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => {
                  setSearchQuery('');
                  setMobileFiltersOpen(false);
                }}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item key={product.id} xs={12} sm={6} lg={4} xl={3} sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductListPage;