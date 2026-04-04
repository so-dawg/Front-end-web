import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.headerLogo}>💻 LaptopStore</Link>
          <ul className={styles.headerMenu}>
            <li><Link to="/" className={styles.headerLink}>Home</Link></li>
            <li><Link to="/shop" className={styles.headerLink}>Shop Laptops</Link></li>
          </ul>
          <Link to="/shop" className={styles.headerLink}>🛒</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
