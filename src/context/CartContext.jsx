import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [lastOrder, setLastOrder] = useState(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    }
  }, [lastOrder]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (paymentInfo) => {
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...cartItems],
      total: getCartTotal(),
      paymentInfo: {
        cardName: paymentInfo.cardName,
        cardNumber: `****${paymentInfo.cardNumber.slice(-4)}`,
      },
      orderDate: new Date().toISOString(),
      status: "confirmed",
    };

    setLastOrder(order);
    setCartItems([]);
    return order;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getCartTotal,
        getCartCount,
        lastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
