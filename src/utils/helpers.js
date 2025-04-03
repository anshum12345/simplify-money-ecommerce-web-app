// helpers.js
export const filterProducts = (products, query, category) => {
  let filtered = [...products];
  
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
    );
  }
  
  if (category && category !== 'all') {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  return filtered;
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};