import Hero from "./components/Hero";
import { UpdateFollower } from "react-mouse-follower";
import Products from "./components/Products/Products";
import Banner from "./components/Banner/Banner";
import Blogs from "./components/Blogs/Blogs";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Stock from "./components/stock/Stock";
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Cart/CartContext'; // Import the CartProvider
import Payment from './components/Payment/Payment';
import User from './components/User/User';
import Like from './components/Like/LikedProducts';
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast

const App = () => {
  // Toast notifications for actions
  const notifyAddToCart = () => toast.success("Added to Cart Successfully!");
  const notifyLikeProduct = () => toast.success("Product Added to Likes!");
  const notifyShareProduct = () => toast.info("Product Shared Successfully!");

  return (
    <Router>
      <CartProvider> {/* Wrap your application in CartProvider */}
        <main className="overflow-x-hidden">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 10,
                    followSpeed: 1.5,
                  }}
                >
                  <>
                    <Hero />
                    <Products />
                    <Banner />
                    <Blogs />
                    <FAQ />
                    <Footer />
                  </>
                </UpdateFollower>
              }
            />
            <Route path="/stock" element={<Stock notifyAddToCart={notifyAddToCart} notifyLikeProduct={notifyLikeProduct} notifyShareProduct={notifyShareProduct} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/user" element={<User />} />
            <Route path="/like" element={<Like />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </CartProvider>
    </Router>
  );
};

export default App;
