import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function TrendingProduct({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="trending-card">
      <div className="trending-badge">Trending</div>
      <div className="trending-image">
        {product.picture ? (
          <img src={product.picture} alt={product.name} className="product-image-media" />
        ) : (
          <span className="text-6xl text-gray-400">Laptop</span>
        )}
      </div>
      <div className="trending-info">
        <p className="trending-brand">{product.brand}</p>
        <h3 className="trending-name">{product.name}</h3>
        <div className="trending-rating">
          <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
          <span className="rating-value">{product.rating}</span>
        </div>
        <p className="product-price mb-3">${product.price.toFixed(2)}</p>
        <p className={product.inStock ? "product-stock-in" : "product-stock-out"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <div className="trending-card__actions">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn-primary"
          >
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrendingProduct;
