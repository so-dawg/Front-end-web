import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetail.module.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h1 className="page-title">Product Not Found</h1>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="product-detail-section">
      <Link to="/shop" className="back-link">
        ← Back to Shop
      </Link>
      <div className="product-detail-grid">
        <div className="product-image-lg">
          <span className="text-9xl text-gray-400">Laptop</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-light-gray mb-4">{product.brand}</p>
          <div className="product-info">
            <span className="product-price-lg">${product.price}</span>
            <span className="product-rating">★ {product.rating}</span>
            <span className={product.inStock ? "badge-in" : "badge-out"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="specs">
            <h2 className="specs-title">Specifications</h2>
            <dl className="grid-specs">
              <div>
                <dt className="spec-label">Processor</dt>
                <dd className="spec-value">{product.specs.processor}</dd>
              </div>
              <div>
                <dt className="spec-label">RAM</dt>
                <dd className="spec-value">{product.specs.ram}</dd>
              </div>
              <div>
                <dt className="spec-label">Storage</dt>
                <dd className="spec-value">{product.specs.storage}</dd>
              </div>
              <div>
                <dt className="spec-label">Display</dt>
                <dd className="spec-value">{product.specs.display}</dd>
              </div>
              <div className="col-span-2">
                <dt className="spec-label">Graphics</dt>
                <dd className="spec-value">{product.specs.graphics}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.productButtons}>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className={styles.buyNowButton}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
