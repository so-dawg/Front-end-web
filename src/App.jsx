import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import SubmitRepair from "./pages/SubmitRepair";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/submit-repair" element={<SubmitRepair />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
