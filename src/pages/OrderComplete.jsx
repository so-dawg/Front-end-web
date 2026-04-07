import { Link } from "react-router-dom";
import styles from "./OrderComplete.module.css";

function OrderComplete() {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderCard}>
        <div className={styles.successIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#10B981">
            <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm-96-176 56 56 144-144-56-56-88 88-56-56-56 56 100 100Z" />
          </svg>
        </div>

        <h1 className={styles.orderTitle}>Purchase Successful!</h1>
        <p className={styles.orderMessage}>
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className={styles.orderNumber}>
          <p className={styles.orderNumberLabel}>Order Number</p>
          <p className={styles.orderNumberValue}>#{orderNumber}</p>
        </div>

        <div className={styles.orderInfo}>
          <p className={styles.orderInfoText}>
            A confirmation email has been sent to your email address. You will receive a shipping notification once your order is on the way.
          </p>
        </div>

        <div className={styles.orderActions}>
          <Link to="/shop" className={styles.continueShoppingButton}>
            Continue Shopping
          </Link>
          <Link to="/" className={styles.backHomeButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderComplete;
