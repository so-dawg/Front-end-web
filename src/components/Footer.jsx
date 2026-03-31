import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">💻 LaptopStore</h3>
            <p className="footer-text">Your one-stop shop for the best laptops!</p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/shop" className="footer-link">Shop Laptops</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>support@laptopstore.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2024 LaptopStore. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
