import { Link } from "react-router-dom";
import styles from "../style/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerTitle}>LazyStore</h3>
            <p className={styles.footerText}>We are your trusted laptop store, offering quality devices for work, study, and gaming.</p>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li><Link to="/shop" className={styles.footerLink}>Shop Product</Link></li>
              <li><Link to="/shop?category=hotdeals" className={styles.footerLink}>Hot Deals</Link></li>
              <li><Link to="/shop?category=trending" className={styles.footerLink}>Trending Now</Link></li>
              <li><Link to="/contact-us" className={styles.footerLink}>Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li>support@lazystore.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>© {new Date().getFullYear()} LazyStore. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
