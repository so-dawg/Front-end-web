import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="checkout-form">
            <div className="checkout-row">
              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Last Name" className="input" />
            </div>
            <input type="email" placeholder="Email" className="input" />
            <input type="text" placeholder="Address" className="input" />
            <div className="checkout-row">
              <input type="text" placeholder="City" className="input" />
              <input type="text" placeholder="Postal Code" className="input" />
            </div>
          </form>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="order-summary">
            <div className="summary-row"><span>Subtotal</span><span>$0.00</span></div>
            <div className="summary-row"><span>Shipping</span><span>Free</span></div>
            <div className="summary-total"><span>Total</span><span>$0.00</span></div>
          </div>
          <Link to="/order-complete" className="btn-primary btn-block">Place Order</Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
