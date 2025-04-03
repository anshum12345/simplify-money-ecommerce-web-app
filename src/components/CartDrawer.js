import React, { useContext } from 'react';
import { Drawer, Box, Typography, IconButton, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '../context/AppContext';
import CartItem from './CartItem';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, cartTotal } = useContext(AppContext);

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={toggleCart}
    >
      <Box sx={{ width: 350, p: 2 }} role="presentation">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" sx={{ textAlign: 'right', mb: 2 }}>
              Total: ${cartTotal.toFixed(2)}
            </Typography>
            
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              component="a"
              href="/cart"
              onClick={toggleCart}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;