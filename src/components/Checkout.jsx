import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartlistItems = [], quantities = {} } = location.state || {};

  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace(/₹|,/g, ""));
  };

  const formatCurrency = (amount) => `₹${parseFloat(amount).toFixed(2)}`;

  const total = cartlistItems.reduce((sum, item) => {
    const quantity = quantities[item.id] || 1;
    const price = parsePrice(item.price) || 0;
    return sum + price * quantity;
  }, 0);

  const handlePayment = () => {
    if (typeof window.Razorpay !== "undefined") {
      const options = {
        key: "rzp_test_Ra2UyMQW1hLxkl",
        amount: total * 100,
        currency: "INR",
        name: "Nykaa Shopping",
        description: "Purchase from Nykaa",
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          navigate("/home");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded. Please refresh the page.");
    }
  };

  // INLINE STYLES
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      padding: "20px 0",
    },
    headerTitle: {
      fontSize: "2.5rem",
      color: "#2c3e50",
      fontWeight: "700",
      marginBottom: "10px",
    },
    headerSubtitle: {
      fontSize: "1.1rem",
      color: "#7f8c8d",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
      alignItems: "start",
    },
    leftBox: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    leftTitle: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "25px",
    },
    itemsList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    itemCard: {
      display: "flex",
      alignItems: "center",
      padding: "20px",
      background: "#f8f9fa",
      borderRadius: "15px",
      border: "1px solid #e9ecef",
    },
    itemImageBox: {
      width: "80px",
      height: "80px",
      borderRadius: "10px",
      overflow: "hidden",
      marginRight: "20px",
    },
    itemImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    itemDetails: { flex: 1 },
    itemName: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#2c3e50",
    },
    itemSize: { fontSize: "0.9rem", color: "#7f8c8d" },
    unitPrice: { fontSize: "0.9rem", color: "#7f8c8d" },
    rightBox: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      height: "fit-content",
      position: "sticky",
      top: "20px",
    },
    summaryTitle: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #ecf0f1",
    },
    totalRow: {
      paddingTop: "15px",
      marginTop: "10px",
      borderTop: "2px solid #bdc3c7",
      fontWeight: "700",
      color: "#e74c3c",
    },
    placeOrderBtn: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "20px",
    },
    backCartBtn: {
      width: "100%",
      padding: "12px",
      border: "2px solid #667eea",
      borderRadius: "12px",
      background: "transparent",
      color: "#667eea",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "10px",
    },
    emptyCartBox: {
      maxWidth: "500px",
      margin: "80px auto",
      background: "white",
      padding: "40px",
      borderRadius: "20px",
      textAlign: "center",
    },
    emptyTitle: { fontSize: "2rem", marginBottom: "15px", color: "#2c3e50" },
    emptySubtitle: { color: "#7f8c8d", marginBottom: "25px" },
    shopBtn: {
      padding: "15px 30px",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Checkout</h1>
        <p style={styles.headerSubtitle}>Review your items and complete your purchase</p>
      </div>

      {cartlistItems.length === 0 ? (
        <div style={styles.emptyCartBox}>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptySubtitle}>Add items to your cart before checkout.</p>
          <button style={styles.shopBtn} onClick={() => navigate("/home")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          <div style={styles.leftBox}>
            <h2 style={styles.leftTitle}>Order Summary</h2>

            <div style={styles.itemsList}>
              {cartlistItems.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <div style={styles.itemImageBox}>
                    <img src={item.img} alt={item.name} style={styles.itemImage} />
                  </div>

                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemSize}>Size: {item.selectedSize}</p>
                    <p style={styles.unitPrice}>
                      Unit Price: {formatCurrency(parsePrice(item.price))}
                    </p>
                    <p style={styles.unitPrice}>
                      Qty: {quantities[item.id] || 1} • Total:{" "}
                      {formatCurrency(parsePrice(item.price) * (quantities[item.id] || 1))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.rightBox}>
            <h3 style={styles.summaryTitle}>Order Total</h3>

            <div style={styles.summaryRow}>
              <span>Subtotal ({cartlistItems.length} items)</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <button style={styles.placeOrderBtn} onClick={handlePayment}>
              Place Order
            </button>

            <button style={styles.backCartBtn} onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;