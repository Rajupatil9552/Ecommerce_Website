import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import UserListing from "./pages/admin/UserListing.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import OrderListing from "./pages/admin/OrderListing.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <ScrollToTop />
      <Routes>
        {/* All normal user pages share the same layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Route>

        {/* Public pages without Navbar & Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin layout stays as it is */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="" element={<UserListing />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="order" element={<OrderListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;