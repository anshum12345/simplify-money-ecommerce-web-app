import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, IconButton, CircularProgress, Alert, Box, Chip } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { fetchProductById } from '../utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, isInWishlist, toggleWishlist } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            height: '100%'
          }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          
          <Chip 
            label={product.category} 
            color="primary" 
            sx={{ textTransform: 'capitalize', mb: 2 }} 
          />
          
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton 
              aria-label="add to wishlist" 
              onClick={() => toggleWishlist(product)}
              size="large"
            >
              {isInWishlist(product.id) ? (
                <FavoriteIcon color="error" fontSize="large" />
              ) : (
                <FavoriteBorderIcon fontSize="large" />
              )}
            </IconButton>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => addToCart(product)}
              size="large"
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;