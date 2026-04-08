import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../style/Cart.module.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCart}>
          <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#9CA3AF">
            <path d="M280-280q-33 0-56.5-23.5T200-360q0-33 23.5-56.5T280-440q33 0 56.5 23.5T360-360q0 33-23.5 56.5T280-280Zm400 0q-33 0-56.5-23.5T600-360q0-33 23.5-56.5T680-440q33 0 56.5 23.5T760-360q0 33-23.5 56.5T680-280ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
          </svg>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>Add some laptops to get started!</p>
          <Link to="/shop" className={styles.shopNowButton}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemImage}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#6B7280">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Z" />
                </svg>
              </div>
              
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemName}>{item.name}</h3>
                <p className={styles.cartItemSpecs}>{item.specs.processor}</p>
                <p className={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.cartItemQuantity}>
                <button
                  className={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className={styles.quantityText}>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className={styles.cartItemSubtotal}>
                <p className={styles.subtotalLabel}>Subtotal</p>
                <p className={styles.subtotalAmount}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EF4444">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h520q17 0 28.5 11.5T760-760q0 17-11.5 28.5T720-720v520q0 33-23.5 56.5T640-120H280Zm0-80h360v-520H280v520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={styles.freeShipping}>FREE</span>
          </div>
          
          <div className={styles.summaryDivider} />
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <button
            className={styles.checkoutButton}
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
