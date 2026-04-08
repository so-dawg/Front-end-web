import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/LatestAndBudget.css";

function LatestAndBudget({ products }) {
  const { addToCart } = useCart();

  const latestProducts = products
    .filter((p) => p.inStock)
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  const budgetProducts = products
    .filter((p) => p.inStock && p.price < 700)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  const renderCard = (product, type) => (
    <div key={product.id} className={`${type}-card`}>
      <div className={`${type}-card__image`}>
        {product.picture ? (
          <img
            src={product.picture}
            alt={product.name}
            className={`${type}-card__img`}
          />
        ) : (
          <span className={`${type}-card__placeholder`}>Laptop</span>
        )}
      </div>
      <div className={`${type}-card__info`}>
        <p className={`${type}-card__brand`}>{product.brand}</p>
        <h3 className={`${type}-card__name`}>{product.name}</h3>
        <div className={`${type}-card__rating`}>
          <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className={`${type}-card__specs`}>
          <div className="spec-row">
            <span className="spec-label">CPU:</span>
            <span className="spec-value">{product.specs?.processor}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">RAM:</span>
            <span className="spec-value">{product.specs?.ram}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Storage:</span>
            <span className="spec-value">{product.specs?.storage}</span>
          </div>
        </div>
        <p className={`${type}-card__price`}>${product.price.toFixed(2)}</p>
        <div className={`${type}-card__actions`}>
          <button
            className="btn-primary"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn-secondary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="latest-budget-section">
      <div className="container-custom">
        <div className="latest-budget-wrapper">
          {/* Left: Latest Arrivals */}
          <div className="latest-column">
            <h2 className="latest-budget-title latest-title">Latest Arrivals</h2>
            <div className="latest-card-list">
              {latestProducts.map((product) => renderCard(product, "latest"))}
            </div>
          </div>

          {/* Right: Budget Picks */}
          <div className="budget-column">
            <h2 className="latest-budget-title budget-title">Budget Picks for Students</h2>
            <div className="budget-card-list">
              {budgetProducts.map((product) => renderCard(product, "budget"))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestAndBudget;
