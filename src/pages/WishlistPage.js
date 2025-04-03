import React, { useContext } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material'; // Added Box import
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist } = useContext(AppContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      
      {wishlist.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}> {/* Added missing Box component */}
          <Typography variant="h6" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistPage;
