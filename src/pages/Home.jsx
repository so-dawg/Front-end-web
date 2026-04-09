import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import laptop1 from "../Assets/laptop1.jpg";
import laptop2 from "../Assets/laptop2.jpg";
import laptop3 from "../Assets/ASUS_ROG_Zephyrus_G14.jpg";
import laptop4 from "../Assets/Dell_XPS_15_9520.jpeg";
import laptop5 from "../Assets/HP_Spectre_x360.jpg";
import { products } from "../data/products";
import DiscountProduct from "../components/DiscountProduct";
import RepairServiceBenefits from "../components/RepairServiceBenefits";
import LatestAndBudget from "../components/LatestAndBudget";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  const heroSlides = [
    {
      image: laptop1,
      tagline: "NEW ARRIVALS",
      title: "Premium Laptops",
      subtitle: "Discover the latest in performance and innovation",
      cta: "Shop Now",
      ctaLink: "/shop?category=latest",
    },
    {
      image: laptop2,
      tagline: "EXCLUSIVE DEALS",
      title: "Save Up to 30%",
      subtitle: "Limited-time offers on top-rated laptops",
      cta: "View Deals",
      ctaLink: "/shop?category=hotdeals",
    },
    {
      image: laptop3,
      tagline: "GAMING SERIES",
      title: "Dominate the Game",
      subtitle: "High-performance gaming laptops built for victory",
      cta: "Explore Gaming",
      ctaLink: "/shop?category=gaming",
    },
    {
      image: laptop4,
      tagline: "BUSINESS CLASS",
      title: "Work Smarter",
      subtitle: "Professional laptops designed for productivity",
      cta: "Browse Business",
      ctaLink: "/shop?category=office",
    },
    {
      image: laptop5,
      tagline: "FREE SHIPPING",
      title: "Upgrade Your Setup",
      subtitle: "Fast, free delivery on all orders over $50",
      cta: "Start Shopping",
      ctaLink: "/shop",
    },
  ];

  const trendingProducts = products
    .filter((p) => p.inStock && p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const recommendedProducts = products.filter((p) => p.inStock).slice(0, 12);

  const discountProducts = products
    .filter((p) => p.discountPrice && p.inStock)
    .slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <Slider {...settings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="slider-handle">
              <div className="hero-overlay">
                <div className="hero-content">
                  <span className="hero-tagline">{slide.tagline}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <Link to={slide.ctaLink} className="btn-primary-lg">
                    {slide.cta}
                  </Link>
                </div>
              </div>
              <img
                src={slide.image}
                alt={slide.tagline}
                className="hero-image"
              />
            </div>
          ))}
        </Slider>
      </section>

      {/* Discount Products Section */}
      {discountProducts.length > 0 && (
        <section className="discount-section">
          <div className="container-custom">
            <div className="section-header">
              <h2 className="section-title"> Hot Deals</h2>
              <Link to="/shop?category=hotdeals" className="view-all-link">
                View All Deals <span className="arrow">→</span>
              </Link>
            </div>
            <div className="discount-grid">
              {discountProducts.map((product) => (
                <DiscountProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features">
        <div className="container-custom">
          <div className="grid-3">
            <div className="feature-card">
              <h3 className="feature-title">Free Shipping</h3>
              <p className="feature-desc">
                Free shipping on all orders over $50
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-desc">100% secure payment processing</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Easy Returns</h3>
              <p className="feature-desc">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/shop?category=trending" className="view-all-link">
              View All <span className="arrow">→</span>
            </Link>
          </div>
          <div className="grid-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trending-card">
                <div className="trending-badge">Trending</div>
                <div className="product-image">
                  {product.picture ? (
                    <img
                      src={product.picture}
                      alt={product.name}
                      className="product-image-media"
                    />
                  ) : (
                    <span className="text-4xl text-gray-400">Laptop</span>
                  )}
                </div>
                <div className="trending-info">
                  <p className="trending-brand">{product.brand}</p>
                  <h3 className="trending-name">{product.name}</h3>
                  <div className="trending-rating">
                    <span className="stars">
                      {"★".repeat(Math.floor(product.rating))}
                    </span>
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <p className="product-price mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                  <p
                    className={
                      product.inStock ? "product-stock-in" : "product-stock-out"
                    }
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="trending-card__actions">
                    <button
                      className="btn-primary"
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestAndBudget products={products} />

      <RepairServiceBenefits />

      <section className="featured">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Recommended For You</h2>
            <Link to="/shop" className="view-all-link">
              View All <span className="arrow">→</span>
            </Link>
          </div>
          <div className="recommended-grid">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="recommended-card">
                <div className="recommended-image">
                  {product.picture ? (
                    <img
                      src={product.picture}
                      alt={product.name}
                      className="recommended-image-media"
                    />
                  ) : (
                    <span className="text-6xl text-gray-400">Laptop</span>
                  )}
                </div>
                <div className="recommended-info">
                  <p className="recommended-brand">{product.brand}</p>
                  <h3 className="recommended-name">{product.name}</h3>
                  <div className="recommended-rating">
                    <span className="stars">
                      {"★".repeat(Math.floor(product.rating))}
                    </span>
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <div className="recommended-specs-full">
                    <div className="spec-row">
                      <span className="spec-label">Processor:</span>
                      <span className="spec-value">
                        {product.specs?.processor}
                      </span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">RAM:</span>
                      <span className="spec-value">{product.specs?.ram}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Storage:</span>
                      <span className="spec-value">
                        {product.specs?.storage}
                      </span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Display:</span>
                      <span className="spec-value">
                        {product.specs?.display}
                      </span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Graphics:</span>
                      <span className="spec-value">
                        {product.specs?.graphics}
                      </span>
                    </div>
                  </div>
                  <p
                    className={
                      product.inStock ? "product-stock-in" : "product-stock-out"
                    }
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="recommended-footer">
                    <p className="recommended-price">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="btn-primary-lg"
                    >
                      Buy Now
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container-custom">
          <h2 className="section-title">Subscribe to Our Newsletter</h2>
          <p className="mb-8 opacity-90">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="newsletter-form">
            <svg className="newsletter-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email address"
              className="input newsletter-input"
            />
            <button className="btn-secondary newsletter-btn">
              <span>Subscribe</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
