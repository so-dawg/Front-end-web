import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../style/Checkout.module.css";

function Checkout() {
  const { cartItems, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // Redirect to cart if empty - must be in useEffect, not during render
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Validate card name
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    // Validate card number (16 digits)
    const cardNumberClean = formData.cardNumber.replace(/\s/g, "");
    if (!cardNumberClean) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    } else if (!luhnCheck(cardNumberClean)) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Validate expiry date
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    } else {
      const [month, year] = formData.expiryDate.split("/").map(Number);
      if (month < 1 || month > 12) {
        newErrors.expiryDate = "Invalid month";
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = "Card has expired";
        }
      }
    }

    // Validate CVV
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Luhn algorithm for card validation
  const luhnCheck = (num) => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

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

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const order = placeOrder({
        cardName: formData.cardName,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      });

      setIsProcessing(false);
      navigate("/order-complete", { state: { order } });
    }, 1500);
  };

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
                className={`${styles.formInput} ${errors.cardName ? styles.inputError : ""}`}
                placeholder="John Doe"
                required
              />
              {errors.cardName && <p className={styles.errorText}>{errors.cardName}</p>}
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
                className={`${styles.formInput} ${errors.cardNumber ? styles.inputError : ""}`}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
              {errors.cardNumber && <p className={styles.errorText}>{errors.cardNumber}</p>}
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
                  className={`${styles.formInput} ${errors.expiryDate ? styles.inputError : ""}`}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
                {errors.expiryDate && <p className={styles.errorText}>{errors.expiryDate}</p>}
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
                  className={`${styles.formInput} ${errors.cvv ? styles.inputError : ""}`}
                  placeholder="123"
                  maxLength="4"
                  required
                />
                {errors.cvv && <p className={styles.errorText}>{errors.cvv}</p>}
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.confirmButton}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className={styles.spinner}></span>
                  Processing...
                </>
              ) : (
                `Confirm Purchase - $${getCartTotal().toFixed(2)}`
              )}
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
