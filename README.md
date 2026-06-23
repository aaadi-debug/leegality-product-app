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