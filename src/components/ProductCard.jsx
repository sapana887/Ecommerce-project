function ProductCard({ product, onAddToCart, onViewDetails }) {
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
        <h3 className="product-title">{product.title}</h3>

        <p className="product-category">{product.category}</p>

        <div className="product-rating">
          ⭐ {product.rating.rate} ({product.rating.count})
        </div>

        <p className="product-price">${product.price}</p>

        <button
          className="add-cart-button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>

        <button
          className="view-details-button"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default ProductCard;