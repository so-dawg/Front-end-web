import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-content">
          <Link to="/" className="header-logo">💻 LaptopStore</Link>
          <ul className="header-menu">
            <li><Link to="/" className="header-link">Home</Link></li>
            <li><Link to="/shop" className="header-link">Shop Laptops</Link></li>
          </ul>
          <Link to="/shop" className="header-link">🛒</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
