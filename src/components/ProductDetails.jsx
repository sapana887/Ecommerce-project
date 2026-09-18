function ProductDetails({
  product,
  onAddToCart,
  onBack,
}) {
  return (
    <section className="product-details">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Products
      </button>

      <div className="product-details-content">

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="product-details-info">

          <h2>{product.title}</h2>

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {product.rating.rate} ⭐
          </p>

          <p className="product-details-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="product-details-description">
            {product.description}
          </p>

          <button
            className="add-cart-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;