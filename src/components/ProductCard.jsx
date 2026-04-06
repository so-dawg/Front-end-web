import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
      <Link to={`/product/${product.id}`} className="btn-primary btn-block">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
