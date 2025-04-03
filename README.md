# E-Commerce Web App (Frontend)

A modern React-based e-commerce frontend application with product browsing, cart management, and wishlist functionality.

![App Screenshot](https://via.placeholder.com/800x400?text=E-Commerce+Screenshot)

## Features

- **Product Catalog**
  - Grid/list view of products
  - Search functionality
  - Category filtering
  - Price range filtering
  - Sorting options

- **Shopping Cart**
  - Add/remove products
  - Quantity adjustment
  - Persistent storage using localStorage
  - Cart total calculation

- **Wishlist**
  - Save favorite products
  - Move items to cart

- **UI/UX**
  - Responsive design (mobile-first)
  - Material-UI components
  - Loading states
  - Error handling

## Technologies Used

- React.js (v18+)
- Material-UI (MUI v5)
- Context API (State Management)
- React Router (v6)
- Axios (API calls)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anshum12345/simplify-money-ecommerce-web-app.git
cd simplify-money-ecommerce-web-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The app will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ProductCard.js   # Product display card
│   ├── SearchBar.js     # Search component
│   ├── CartDrawer.js    # Shopping cart panel
│   └── ...
├── context/             # Global state management
│   └── AppContext.js    # Main context provider
├── pages/               # Route components
│   ├── ProductListPage.js
│   ├── CartPage.js
│   └── ...
├── utils/               # Helper functions
│   ├── api.js           # API configuration
│   └── helpers.js       # Utility functions
├── assets/              # Static assets
│   ├── styles/          # Global styles
│   └── images/          # App images
├── App.js               # Root component
└── index.js             # Entry point
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation.**

## Backend Integration

To connect with a backend:

1. Update the API base URL in `.env`:
```env
REACT_APP_API_URL=http://your-backend-api.com
```

2. Configure endpoints in `src/utils/api.js`

## Customization

- **Theming**: Modify `src/theme.js` for custom colors
- **Styling**: Edit global styles in `src/assets/styles/`
- **Components**: Adjust component styles in respective files

## Known Issues

- Limited offline support
- Edge cases in cart quantity updates
- Basic error handling for API failures

## Future Improvements

- Add user authentication flows
- Implement payment integration
- Enhance product search with suggestions
- Add product reviews and ratings

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
