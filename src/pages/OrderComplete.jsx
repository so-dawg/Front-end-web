import { Link, useLocation, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import styles from "../style/OrderComplete.module.css";

function OrderComplete() {
  const location = useLocation();
  const { lastOrder } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from navigation state or from lastOrder in context
    if (location.state?.order) {
      setOrder(location.state.order);
    } else if (lastOrder) {
      setOrder(lastOrder);
    }
  }, [location.state, lastOrder]);

  const handlePrint = () => {
    window.print();
  };

  // If no order data, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  // Format the order date
  const orderDate = new Date(order.orderDate);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.orderContainer}>
      <div className={styles.receiptWrapper}>
        <div className={styles.receipt} id="receipt">
          <div className={styles.receiptHeader}>
            <h1 className={styles.receiptTitle}>RECEIPT</h1>
            <div className={styles.receiptLogo}>
              <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#2563EB">
                <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm-96-176 56 56 144-144-56-56-88 88-56-56-56 56 100 100Z" />
              </svg>
            </div>
            <p className={styles.receiptSubtitle}>Order Confirmed</p>
          </div>

          <div className={styles.receiptSection}>
            <div className={styles.receiptInfo}>
              <div className={styles.receiptInfoRow}>
                <span className={styles.receiptInfoLabel}>Order #:</span>
                <span className={styles.receiptInfoValue}>{order.id}</span>
              </div>
              <div className={styles.receiptInfoRow}>
                <span className={styles.receiptInfoLabel}>Date:</span>
                <span className={styles.receiptInfoValue}>{formattedDate}</span>
              </div>
              <div className={styles.receiptInfoRow}>
                <span className={styles.receiptInfoLabel}>Time:</span>
                <span className={styles.receiptInfoValue}>{formattedTime}</span>
              </div>
              <div className={styles.receiptInfoRow}>
                <span className={styles.receiptInfoLabel}>Payment:</span>
                <span className={styles.receiptInfoValue}>Card {order.paymentInfo.cardNumber}</span>
              </div>
              <div className={styles.receiptInfoRow}>
                <span className={styles.receiptInfoLabel}>Cardholder:</span>
                <span className={styles.receiptInfoValue}>{order.paymentInfo.cardName}</span>
              </div>
            </div>
          </div>

          <div className={styles.receiptDivider}></div>

          <div className={styles.receiptItems}>
            <h3 className={styles.receiptItemsTitle}>ITEMS</h3>
            <table className={styles.receiptTable}>
              <thead>
                <tr>
                  <th className={styles.receiptTableHeader}>Item</th>
                  <th className={styles.receiptTableHeaderCenter}>Qty</th>
                  <th className={styles.receiptTableHeaderCenter}>Price</th>
                  <th className={styles.receiptTableHeaderRight}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.receiptTableCell}>{item.name}</td>
                    <td className={styles.receiptTableCellCenter}>{item.quantity}</td>
                    <td className={styles.receiptTableCellCenter}>${item.price.toFixed(2)}</td>
                    <td className={styles.receiptTableCellRight}>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.receiptDivider}></div>

          <div className={styles.receiptTotals}>
            <div className={styles.receiptTotalRow}>
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className={styles.receiptTotalRow}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className={styles.receiptTotalRowGrand}>
              <span>TOTAL</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.receiptDivider}></div>

          <div className={styles.receiptFooter}>
            <p className={styles.receiptThankYou}>Thank you for your purchase!</p>
            <p className={styles.receiptNote}>
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </div>

        <div className={styles.printActions}>
          <button onClick={handlePrint} className={styles.printButton}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
              <path d="M264-216h432v-264H264v264ZM216-80q-29 0-50.5-21.5T144-152v-264H80v-128q0-29 21.5-50.5T152-616h144v-128h368v128h144q29 0 50.5 21.5T880-544v128h-64v264q0 29-21.5 50.5T744-80H216Zm344-520H400v-168h160v168ZM216-480h528v-64H216v64Zm0 0v-64 64Zm0 328h528v-264H216v264Z" />
            </svg>
            Print Receipt
          </button>
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
