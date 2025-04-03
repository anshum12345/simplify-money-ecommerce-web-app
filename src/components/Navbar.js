import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = () => {
  const { cart, wishlist, toggleCart } = useContext(AppContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            E-Commerce Store
          </Link>
        </Typography>
        
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/wishlist"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={wishlist.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        
        <IconButton color="inherit" onClick={toggleCart}>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;