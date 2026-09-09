import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>My Store</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </nav>

        <button className="cart-button">🛒 Cart</button>
      </header>

      <main>
        <section className="hero">
          <h2>Welcome to My Store</h2>
          <p>Find the products you love.</p>
        </section>

        <section className="products-section">
          <h2>Our Products</h2>

          {loading && (
            <p className="message">Loading products...</p>
          )}

          {error && (
            <p className="message error">{error}</p>
          )}

          {!loading && !error && (
            <>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                    onClick={() => setCategory(item)}
                  >
                    {item === "all"
                      ? "All"
                      : item}
                  </button>
                ))}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
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
      </main>
    </div>
  );
}

export default App;