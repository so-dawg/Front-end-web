import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function DiscountProduct({ product }) {
  const { addToCart } = useCart();
  
  const discountPercentage = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      price: product.discountPrice,
    });
  };

  return (
    <div className="discount-card">
      <div className="discount-badge">-{discountPercentage}%</div>
      <div className="discount-image">
        {product.picture ? (
          <img src={product.picture} alt={product.name} className="product-image-media" />
        ) : (
          <span className="text-6xl text-gray-400">Laptop</span>
        )}
      </div>
      <div className="discount-info">
        <p className="discount-brand">{product.brand}</p>
        <h3 className="discount-name">{product.name}</h3>
        <div className="discount-rating">
          <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="discount-prices">
          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          <span className="discounted-price">${product.discountPrice.toFixed(2)}</span>
        </div>
        <p className={product.inStock ? "product-stock-in" : "product-stock-out"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <div className="discount-actions">
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
        {product.offerEnds && (
          <p className="offer-expiry">Offer ends: {product.offerEnds}</p>
        )}
      </div>
    </div>
  );
}

export default DiscountProduct;
