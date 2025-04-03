import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../utils/api';
import { filterProducts, calculateCartTotal } from '../utils/helpers';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage with proper error handling
  const [cart, setCart] = useState(() => {
    try {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Failed to parse cart data:', error);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const wishlistData = localStorage.getItem('wishlist');
      return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (error) {
      console.error('Failed to parse wishlist data:', error);
      return [];
    }
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save data to localStorage with error handling
  const saveToLocalStorage = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await fetchInitialProducts();
        await fetchAllCategories();
      } catch (err) {
        setError(err.message || 'Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Save cart and wishlist whenever they change
  useEffect(() => {
    saveToLocalStorage('cart', cart);
  }, [cart, saveToLocalStorage]);

  useEffect(() => {
    saveToLocalStorage('wishlist', wishlist);
  }, [wishlist, saveToLocalStorage]);

  // Filter and sort products
  useEffect(() => {
    const filterAndSortProducts = () => {
      let filtered = [...products];
      
      // Apply filters
      filtered = filtered.filter(product => {
        const matchesSearch = searchQuery 
          ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        
        const matchesCategory = selectedCategory !== 'all'
          ? product.category.toLowerCase() === selectedCategory.toLowerCase()
          : true;
        
        const matchesPrice = product.price >= priceRange[0] && 
                           product.price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
      });
      
      // Apply sorting
      switch (sortOption) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case 'title-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          // Default sorting (e.g., by ID or as returned from API)
          break;
      }
      
      setFilteredProducts(filtered);
    };

    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, priceRange, sortOption]);

  const fetchInitialProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
      
      // Calculate max price for price range
      if (data.length > 0) {
        const maxPrice = Math.ceil(Math.max(...data.map(p => p.price)) * 1.1); // 10% buffer
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(['all', ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(['all']);
    }
  };

  // Cart operations
  const addToCart = useCallback((product, quantity = 1) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateCartItemQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist operations
  const toggleWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const moveToCart = useCallback((productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      toggleWishlist(product);
    }
  }, [wishlist, addToCart, toggleWishlist]);

  // Calculate derived values
  const cartTotal = calculateCartTotal(cart);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        cart,
        wishlist,
        loading,
        error,
        searchQuery,
        selectedCategory,
        priceRange,
        sortOption,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setSearchQuery,
        setSelectedCategory,
        setPriceRange,
        setSortOption,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        toggleCart,
        refetchProducts: fetchInitialProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};