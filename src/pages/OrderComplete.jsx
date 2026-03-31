import { Link } from "react-router-dom";

function OrderComplete() {
  return (
    <div className="order-complete">
      <div className="order-icon">🎉</div>
      <h1 className="order-title">Order Complete!</h1>
      <p className="order-message">Thank you for your purchase. Your order has been placed successfully.</p>
      <p className="order-submessage">Order confirmation has been sent to your email.</p>
      <div className="flex-gap">
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        <Link to="/" className="btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}

export default OrderComplete;
