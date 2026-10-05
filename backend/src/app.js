const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "StyleKart API is running",
  });
});

app.use(
  "/api/v1/products",
  productRoutes
);

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/cart",
  cartRoutes
);

app.use(
  "/api/v1/orders",
  orderRoutes
);

app.use(
  "/api/v1/checkout",
  checkoutRoutes
);

module.exports = app;