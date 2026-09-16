# React E-Commerce App

A responsive e-commerce product store built with **React.js** and **Fake Store API**.

## 🚀 Features

- Fetch products from Fake Store API
- Display product images, titles, categories, ratings, and prices
- Search products by title
- Filter products by category
- Combine search and category filtering
- Loading state while fetching products
- Error handling when the API request fails
- Responsive product grid
- Reusable `ProductCard` component

### 🛒 Shopping Cart

- Add products to shopping cart
- Display dynamic cart item count
- Increase product quantity
- Decrease product quantity
- Remove products from cart
- Display individual product subtotals
- Calculate cart subtotal
- Calculate shipping cost
- Free shipping for orders over $100
- Display total number of items
- Calculate final cart total
- Clear entire cart
- Continue shopping from cart
- Checkout functionality
- Save cart data using `localStorage`
- Restore cart data after page refresh

### 🔐 Login & Signup

- Login page
- Signup page
- Login and signup navigation
- Continue as Guest
- Required form fields
- Password minimum 8-character validation
- Confirm password validation
- Login/signup navigation to the store

> **Note:** Login and signup are currently UI-based. Real user authentication and account creation will be added later with a backend.


## 🛠️ Technologies Used

* React.js
* Vite
* JavaScript
* CSS
* Fetch API
* Fake Store API
* localStorage
* React `useState`
* React `useEffect`

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

This project demonstrates how to build a React e-commerce application using an external API and React state management.

The application follows this flow:

```text
React
   ↓
Fetch API
   ↓
Fake Store API
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
Cart Subtotal
   ↓
Shipping Calculation
   ↓
Final Total
   ↓
Checkout
   ↓
localStorage
   ↓
Cart Restored After Refresh
```

## 📌 Future Improvements

Possible features for future versions:

* Product details page
* User authentication
* User profile
* Order history
* Real checkout/payment integration
* Backend API
* Database integration
* Admin dashboard
* Product management

````
