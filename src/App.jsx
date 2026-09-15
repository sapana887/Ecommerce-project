import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

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
      currentCart
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity: product.quantity - 1,
              }
            : product
        )
        .filter((product) => product.quantity > 0)
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
    setShowCart(false);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <h1>My Store</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          🛒 Cart ({cartItemCount})
        </button>

      </header>

      <main>

        {/* CART PAGE */}
        {showCart ? (

          <section className="cart-section">

            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <p>Your cart is empty.</p>

                <button
                  className="continue-shopping-button"
                  onClick={() => setShowCart(false)}
                >
                  ← Continue Shopping
                </button>

              </div>

            ) : (

              <>
                {/* CART ITEMS */}
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
                          Price: ${product.price.toFixed(2)}
                        </p>

                        {/* QUANTITY */}
                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                product.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {product.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                product.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        {/* SUBTOTAL */}
                        <p>
                          Subtotal: $
                          {(
                            product.price *
                            product.quantity
                          ).toFixed(2)}
                        </p>

                        {/* REMOVE */}
                        <button
                          className="remove-cart-button"
                          onClick={() =>
                            handleRemoveFromCart(
                              product.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                {/* CART SUMMARY */}
                <div className="cart-summary">

                  <h3>Order Summary</h3>

                  <div className="summary-row">
                    <span>Total Items:</span>
                    <span>{cartItemCount}</span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>
                      ${cartTotal.toFixed(2)}
                    </span>
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

                    <span>
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* CART ACTIONS */}
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

                {/* CONTINUE SHOPPING */}
                <button
                  className="continue-shopping-button"
                  onClick={() => setShowCart(false)}
                >
                  ← Continue Shopping
                </button>

              </>

            )}

          </section>

        ) : (

          /* PRODUCT PAGE */
          <>

            {/* HERO */}
            <section className="hero">

              <h2>Welcome to My Store</h2>

              <p>
                Find the products you love.
              </p>

            </section>

            {/* PRODUCTS */}
            <section className="products-section">

              <h2>Our Products</h2>

              {/* LOADING */}
              {loading && (
                <p className="message">
                  Loading products...
                </p>
              )}

              {/* ERROR */}
              {error && (
                <p className="message error">
                  {error}
                </p>
              )}

              {!loading && !error && (

                <>

                  {/* SEARCH */}
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

                  {/* CATEGORY FILTER */}
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
                        {item === "all"
                          ? "All"
                          : item}
                      </button>

                    ))}

                  </div>

                  {/* PRODUCTS */}
                  {filteredProducts.length > 0 ? (

                    <div className="product-grid">

                      {filteredProducts.map(
                        (product) => (

                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={
                              handleAddToCart
                            }
                          />

                        )
                      )}

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