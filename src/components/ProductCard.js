import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton, 
  Button,
  Box,
  Chip,
  Rating,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const ProductCard = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useContext(AppContext);

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
      },
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ 
            objectFit: 'contain', 
            p: 2,
            backgroundColor: '#f5f5f5'
          }}
        />
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          left: 8,
          display: 'flex',
          gap: 1
        }}>
          <Chip 
            label={product.category} 
            size="small"
            sx={{ 
              textTransform: 'capitalize',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText'
            }}
          />
          {product.rating?.rate > 4.5 && (
            <Chip 
              label="Popular" 
              size="small"
              color="secondary"
            />
          )}
        </Box>
        <Tooltip 
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          placement="left"
        >
          <IconButton 
            aria-label="add to wishlist" 
            onClick={() => toggleWishlist(product)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            {isInWishlist(product.id) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '64px'
          }}
        >
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating?.rate || 0}
            precision={0.5}
            readOnly
            size="small"
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.rating?.count || 0})
          </Typography>
        </Box>
        
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained"
          size="small" 
          startIcon={<AddShoppingCartIcon />}
          onClick={() => addToCart(product)}
          sx={{ flexGrow: 1 }}
        >
          Add to Cart
        </Button>
        <Button 
          variant="outlined"
          size="small" 
          component={Link} 
          to={`/product/${product.id}`}
          sx={{ ml: 1 }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
