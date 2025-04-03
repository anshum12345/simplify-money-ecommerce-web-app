import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import { AppContext } from '../context/AppContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, cartTotal } = useContext(AppContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
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
        <>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <CartItem key={item.id} item={item} isPage />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <Box sx={{ width: '300px' }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Subtotal:</Typography>
                <Typography>${cartTotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outlined" 
                component={Link} 
                to="/"
                fullWidth
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;