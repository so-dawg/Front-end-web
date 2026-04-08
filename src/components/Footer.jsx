import { Link } from "react-router-dom";
import styles from "../css/Footer.module.css";

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
              <li><a href="/" className={styles.footerLink}>Home</a></li>
              <li><a href="/shop" className={styles.footerLink}>Shop Product</a></li>
              <li><a href="" className={styles.footerLink}>Hot Deal</a></li>
              <li><a href="" className={styles.footerLink}>Trending Now</a></li>
              <li><a href="" className={styles.footerLink}></a></li>
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
        <div className={styles.footerBottom}>© 2024 LaptopStore. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
