function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-category">
          {product.category}
        </p>

        <div className="product-rating">
          ⭐ {product.rating.rate} ({product.rating.count})
        </div>

        <p className="product-price">
          ${product.price}
        </p>

        <button className="add-cart-button">
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;