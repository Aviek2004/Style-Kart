const express = require("express");

const authenticate =
  require("../middleware/authMiddleware");

const requireAdmin =
  require("../middleware/adminMiddleware");

const {
  placeOrder,
  getOrders,
  getOrder,
  cancelUserOrder,
  getAllOrdersForAdmin,
  updateOrderStatusForAdmin,
} = require("../controllers/orderController");

const router = express.Router();

// ==========================================
// AUTHENTICATION
// ==========================================

router.use(authenticate);

// ==========================================
// CREATE ORDER
// POST /api/v1/orders
// ==========================================

router.post(
  "/",
  placeOrder
);

// ==========================================
// GET USER ORDERS
// GET /api/v1/orders
// ==========================================

router.get(
  "/",
  getOrders
);

// ==========================================
// GET SINGLE USER ORDER
// GET /api/v1/orders/:id
// ==========================================

router.get(
  "/:id",
  getOrder
);

// ==========================================
// CANCEL USER ORDER
// PATCH /api/v1/orders/:id/cancel
// ==========================================

router.patch(
  "/:id/cancel",
  cancelUserOrder
);

// ==========================================
// ADMIN - GET ALL ORDERS
// GET /api/v1/orders/admin/all
// ==========================================

router.get(
  "/admin/all",
  requireAdmin,
  getAllOrdersForAdmin
);

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// PATCH /api/v1/orders/admin/:id/status
// ==========================================

router.patch(
  "/admin/:id/status",
  requireAdmin,
  updateOrderStatusForAdmin
);

module.exports = router;