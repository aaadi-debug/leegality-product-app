# Product Listing Application

A responsive React e-commerce product listing and detail application built for the Leegality Frontend Engineer Assessment.

## Live Demo

https://leegality-product-app-alpha.vercel.app/

## Features

- Product listing page with responsive product grid
- Product detail page
- Dynamic multi-select category filter
- Multi-select brand filter
- Minimum and maximum price filtering
- Product search by title, description, and brand
- Combined filtering logic
- Client-side pagination
- URL query parameter persistence for filters, search, and pagination
- Product image gallery
- Product reviews and specifications
- Loading states and error handling
- Responsive mobile filter drawer
- Empty state with clear filters action

## Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- DummyJSON API

## API Endpoints Used

- `GET https://dummyjson.com/products?limit=0`
- `GET https://dummyjson.com/products/categories`
- `GET https://dummyjson.com/products/{id}`

## Setup Instructions

```bash
git clone https://github.com/aaadi-debug/leegality-product-app.git
cd leegality-product-app
npm install
npm run dev

## Production Build

```bash
npm run build 
npm run preview

## Assumptions Made

- Prices are displayed in USD because the DummyJSON API provides prices in USD.
- Category and brand filters support multiple selections.
- When no category or brand is selected, all products are included.
- Search checks product title, description, and brand.
- The DummyJSON dataset is small enough to fetch once using limit=0 and filter on the client side.
- Pagination is applied after search and all filters are applied.
- Some product fields may be missing, so fallback values are displayed where needed.
- Product detail data is fetched using the product ID from the route parameter.

## Architectural Decisions

- Component-Based Architecture

The application is divided into reusable components such as Header, Filters, ProductCard, ProductGrid, Pagination, Loader, and ErrorMessage. This keeps the code modular, reusable, and easier to maintain.

- Client-Side Filtering and Pagination

All products are fetched once using GET /products?limit=0. Search, category, brand, and price filters are applied client-side. Pagination is applied after filtering to ensure the displayed products match the active filters.

- URL State Persistence

React Router's useSearchParams is used to store search text, selected categories, selected brands, price range, and current page in the URL. This preserves the listing state when users navigate to a product detail page and return back.

- Product Detail Page

The detail page uses the product ID from the URL route parameter to fetch individual product data. It displays required information along with useful optional data such as specifications, shipping details, warranty, return policy, stock, tags, and reviews.

- Responsive Design

Tailwind CSS is used for responsive styling. On desktop, filters are displayed in a sidebar. On mobile devices, filters are displayed in a drawer for a better user experience.

- Error and Loading States

The application includes loading indicators while API data is being fetched and error messages if an API request fails. An empty state is also shown when no products match the selected filters.

## Improvements If Given More Time

- Add sorting by price, rating, and product title.
- Add debounce functionality to the search input.
- Add unit and integration tests using Vitest and React Testing Library.
- Improve accessibility with ARIA labels, keyboard navigation, and focus management for the mobile filter drawer.
- Use server-side filtering and pagination for larger datasets.
- Add image fallback handling for broken product images.
- Add wishlist and cart functionality.
- Add product comparison functionality.
- Add caching and API request optimization.