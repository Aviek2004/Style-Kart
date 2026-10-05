const express = require("express");

const authenticate =
  require("../middleware/authMiddleware");

const {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// All cart routes require login
router.use(authenticate);

// GET CART
router.get(
  "/",
  getCart
);

// ADD PRODUCT
router.post(
  "/",
  addCartItem
);

// UPDATE QUANTITY
router.patch(
  "/:productId",
  updateCartItem
);

// CLEAR CART
router.delete(
  "/",
  clearCart
);

// REMOVE PRODUCT
router.delete(
  "/:productId",
  removeCartItem
);

module.exports = router;