import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import AdminOrders from "../pages/AdminOrders";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />
          
          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Product Details */}
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;