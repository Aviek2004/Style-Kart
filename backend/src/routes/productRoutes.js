const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProduct
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  createProduct
);

router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteProduct
);

module.exports = router;