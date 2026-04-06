import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import laptop1 from "../Assets/laptop1.jpg";
import laptop2 from "../Assets/laptop2.jpg";
import { products } from "../data/products";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const trendingProducts = products
    .filter((p) => p.inStock && p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <Slider {...settings}>
          <div className="slider-handle">
            <img src={laptop1} alt="laptop1" />
          </div>
          <div className="slider-handle">
            <img src={laptop2} alt="laptop2" />
          </div>
        </Slider>
      </section>

      {/* Trending Products Section */}
      <section className="trending-section">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/shop" className="view-all-link">
              View All <span className="arrow">→</span>
            </Link>
          </div>
          <div className="grid-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trending-card">
                <div className="product-image">
                  <span className="text-4xl text-gray-400">Laptop</span>
                </div>
                <div className="trending-info">
                  <p className="trending-brand">{product.brand}</p>
                  <h3 className="trending-name">{product.name}</h3>
                  <div className="trending-rating">
                    <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <div className="trending-footer">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <Link to={`/product/${product.id}`} className="btn-primary">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="featured">
        <div className="container-custom">
          <h2 className="section-title">Featured Laptops</h2>
          <div className="grid-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-card">
                <div className="product-image">
                  <span className="text-4xl text-gray-400">Laptop</span>
                </div>
                <h3 className="product-name">Laptop {item}</h3>
                <p className="product-price">$999.99</p>
                <Link to={`/product/${item}`} className="btn-primary btn-block">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop" className="btn-secondary">
              View All Laptops
            </Link>
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
            <input
              type="email"
              placeholder="Enter your email"
              className="input newsletter-input"
            />
            <button className="btn-secondary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
