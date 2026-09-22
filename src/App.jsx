import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [page, setPage] = useState("login");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Day 17: Sorting
  const [sortBy, setSortBy] = useState("default");

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Day 17: Sort products
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "name-az") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "name-za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    }
  );

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // View product details
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Remove product completely
  const handleRemoveFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (product) => product.id !== productId
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(
                1,
                product.quantity - 1
              ),
            }
          : product
      )
    );
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Calculate subtotal
  const cartTotal = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  // Calculate total number of items
  const cartItemCount = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  // Shipping cost
  const shippingCost =
    cart.length === 0
      ? 0
      : cartTotal >= 100
      ? 0
      : 10;

  // Final total
  const finalTotal = cartTotal + shippingCost;

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    alert(
      `Order placed successfully!\nTotal: $${finalTotal.toFixed(
        2
      )}`
    );

    setCart([]);
    setPage("home");
  };

  // Login page
  if (page === "login") {
    return (
      <Login
        onLogin={() => setPage("home")}
        onSignup={() => setPage("signup")}
        onGuest={() => setPage("home")}
      />
    );
  }

  // Signup page
  if (page === "signup") {
    return (
      <Signup
        onSignup={() => setPage("home")}
        onLogin={() => setPage("login")}
        onGuest={() => setPage("home")}
      />
    );
  }

  // Product Details
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h1>My Store</h1>

        <nav>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage("home");
              setSelectedProduct(null);
            }}
          >
            Home
          </a>

          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();

              setPage("home");
              setSelectedProduct(null);

              setTimeout(() => {
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 0);
            }}
          >
            Products
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Contact: support@mystore.com");
            }}
          >
            Contact
          </a>
        </nav>

        <button
          className="cart-button"
          onClick={() => {
            setSelectedProduct(null);
            setPage("cart");
          }}
        >
          🛒 Cart ({cartItemCount})
        </button>
      </header>

      <main>
        {page === "cart" ? (
          <section className="cart-section">
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>

                <button
                  className="continue-shopping-button"
                  onClick={() => setPage("home")}
                >
                  ← Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="cart-item"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="cart-product-image"
                      />

                      <div className="cart-product-info">
                        <h3>{product.title}</h3>

                        <p>
                          Price: $
                          {product.price.toFixed(2)}
                        </p>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                          >
                            −
                          </button>

                          <span>{product.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                          >
                            +
                          </button>
                        </div>

                        <p>
                          Subtotal: $
                          {(
                            product.price *
                            product.quantity
                          ).toFixed(2)}
                        </p>

                        <button
                          className="remove-cart-button"
                          onClick={() =>
                            handleRemoveFromCart(product.id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h3>Order Summary</h3>

                  <div className="summary-row">
                    <span>Total Items:</span>
                    <span>{cartItemCount}</span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>
                      {shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {cartTotal > 0 && cartTotal < 100 && (
                    <p className="shipping-message">
                      Add $
                      {(100 - cartTotal).toFixed(2)}{" "}
                      more for free shipping!
                    </p>
                  )}

                  <div className="summary-total">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="cart-actions">
                    <button
                      className="clear-cart-button"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>

                    <button
                      className="checkout-button"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>

                <button
                  className="continue-shopping-button"
                  onClick={() => setPage("home")}
                >
                  ← Continue Shopping
                </button>
              </>
            )}
          </section>
        ) : (
          <>
            <section className="hero">
              <h2>Welcome to My Store</h2>
              <p>Find the products you love.</p>
            </section>

            <section
              className="products-section"
              id="products"
            >
              <h2>Our Products</h2>

              {loading && (
                <p className="message">
                  Loading products...
                </p>
              )}

              {error && (
                <p className="message error">
                  {error}
                </p>
              )}

              {!loading && !error && (
                <>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                    />
                  </div>

                  <div className="category-container">
                    {categories.map((item) => (
                      <button
                        key={item}
                        className={
                          category === item
                            ? "category-button active"
                            : "category-button"
                        }
                        onClick={() =>
                          setCategory(item)
                        }
                      >
                        {item === "all" ? "All" : item}
                      </button>
                    ))}
                  </div>

                  {/* Day 17: Sort Products */}
                  <div className="sort-container">
                    <label htmlFor="sort">
                      Sort By:
                    </label>

                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value)
                      }
                    >
                      <option value="default">
                        Default
                      </option>

                      <option value="price-low">
                        Price: Low to High
                      </option>

                      <option value="price-high">
                        Price: High to Low
                      </option>

                      <option value="name-az">
                        Name: A to Z
                      </option>

                      <option value="name-za">
                        Name: Z to A
                      </option>
                    </select>
                  </div>

                  {sortedProducts.length > 0 ? (
                    <div className="product-grid">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onViewDetails={
                            handleViewProduct
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="message">
                      No products found.
                    </p>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;