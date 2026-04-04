import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerTitle}>💻 LaptopStore</h3>
            <p className={styles.footerText}>Your one-stop shop for the best laptops!</p>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/" className={styles.footerLink}>Home</a></li>
              <li><a href="/shop" className={styles.footerLink}>Shop Laptops</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li>support@laptopstore.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>© 2024 LaptopStore. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
