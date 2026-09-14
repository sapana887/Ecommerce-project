# React E-Commerce App

A responsive e-commerce product store built with **React.js** and **Fake Store API**.

## 🚀 Features

* Fetch products from Fake Store API
* Display product images, titles, categories, ratings, and prices
* Search products by title
* Filter products by category
* Combine search and category filtering
* Loading state while fetching products
* Error handling when the API request fails
* Responsive product grid
* Reusable `ProductCard` component
* Add products to shopping cart
* Display dynamic cart item count
* Increase and decrease product quantity
* Remove products from cart
* Display individual product subtotals
* Calculate total cart price
* Continue shopping from cart
* Save cart data using localStorage
* Restore cart data after page refresh

## 🛠️ Technologies Used

* React.js
* Vite
* JavaScript
* CSS
* Fetch API
* Fake Store API
* localStorage

## 📁 Project Structure

```text
src/
├── components/
│   └── ProductCard.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go into the project folder:

```bash
cd react-ecommerce-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## 🔗 API

This project uses the **Fake Store API** to retrieve product data.

API endpoint:

```text
https://fakestoreapi.com/products
```

## 🎯 Project Overview

This project demonstrates how to connect a React application to an external API, display product data, manage application state, build shopping cart functionality, and persist cart data using localStorage.

The application follows this flow:

```text
React
   ↓
Fetch API
   ↓
External API
   ↓
Product Data
   ↓
React Components
   ↓
Search & Category Filtering
   ↓
Add to Cart
   ↓
Quantity Management
   ↓
Cart State
   ↓
Cart Total
   ↓
localStorage
   ↓
Cart Restored After Refresh
```

## 📌 Future Improvements

Possible features for future versions:

* Product details page
* Checkout page
* User authentication
* Backend API
* Database integration
