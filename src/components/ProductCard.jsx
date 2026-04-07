import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <span className="text-6xl text-gray-400">Laptop</span>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-brand">{product.brand}</p>
      <div className="flex-between mb-3">
        <p className="product-price">${product.price}</p>
        <span className="product-rating">★ {product.rating}</span>
      </div>
      <p className={product.inStock ? "product-stock-in" : "product-stock-out"}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="btn-primary btn-block mb-2"
      >
        Add to Cart
      </button>
      <Link to={`/product/${product.id}`} className="btn-secondary btn-block">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
