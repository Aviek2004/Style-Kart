const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();


// Every cart route requires login
router.use(authenticate);


// GET CART
router.get("/", getCart);


// ADD PRODUCT
router.post("/", addToCart);


// UPDATE QUANTITY
router.patch(
  "/:productId/:variantId",
  updateCartItem
);


// REMOVE PRODUCT
router.delete(
  "/:productId/:variantId",
  removeFromCart
);


// CLEAR CART
router.delete(
  "/",
  clearCart
);


module.exports = router;