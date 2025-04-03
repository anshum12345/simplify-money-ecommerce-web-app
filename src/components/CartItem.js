import React from 'react';
import { 
  TableRow, 
  TableCell, 
  IconButton, 
  TextField,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../context/AppContext';

const CartItem = ({ item, isPage = false }) => {
  const { removeFromCart, updateCartItemQuantity } = React.useContext(AppContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    updateCartItemQuantity(item.id, newQuantity);
  };

  if (isPage) {
    return (
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }}
            />
            <Typography variant="body1">{item.title}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
        <TableCell align="center">
          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            size="small"
            sx={{ width: 80 }}
          />
        </TableCell>
        <TableCell align="right">
          ${(item.price * item.quantity).toFixed(2)}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => removeFromCart(item.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      mb: 2,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1
    }}>
      <img 
        src={item.image} 
        alt={item.title} 
        style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>{item.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            size="small"
            sx={{ width: 80, mr: 2 }}
          />
          <Typography variant="body1">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={() => removeFromCart(item.id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
};

export default CartItem;