import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../css/Checkout.module.css";

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      value = value.substring(0, 19); // Max 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment and clear cart
    clearCart();
    navigate("/order-complete");
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.checkoutTitle}>Checkout</h1>

      <div className={styles.checkoutContent}>
        <div className={styles.paymentForm}>
          <h2 className={styles.formSubtitle}>Payment Information</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="cardName" className={styles.formLabel}>
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="John Doe"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cardNumber" className={styles.formLabel}>
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate" className={styles.formLabel}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cvv" className={styles.formLabel}>
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.confirmButton}>
              Confirm Purchase - ${getCartTotal().toFixed(2)}
            </button>
          </form>
        </div>

        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.summaryItemInfo}>
                  <p className={styles.summaryItemName}>{item.name}</p>
                  <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                </div>
                <p className={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className={styles.summaryDivider} />

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
