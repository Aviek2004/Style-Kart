const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../services/orderService");

// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder(req, res) {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All delivery fields are required",
      });
    }

    // Create order
    const order = await createOrder(
      req.user.userId,
      {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    console.error(
      "Place order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to place order",
    });
  }
}

// ==========================================
// GET USER ORDERS
// ==========================================

async function getOrders(req, res) {
  try {
    const orders = await getUserOrders(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch orders",
    });
  }
}

// ==========================================
// GET SINGLE ORDER
// ==========================================

async function getOrder(req, res) {
  try {
    const order = await getOrderById(
      req.user.userId,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error(
      "Get order error:",
      error
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Order not found",
    });
  }
}

// ==========================================
// CANCEL USER ORDER
// ==========================================

async function cancelUserOrder(req, res) {
  try {
    const result = await cancelOrder(
      req.user.userId,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });

  } catch (error) {
    console.error(
      "Cancel order error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to cancel order",
    });
  }
}

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================

async function getAllOrdersForAdmin(req, res) {
  try {
    const orders = await getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error(
      "Get all orders error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// ==========================================

async function updateOrderStatusForAdmin(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const order = await updateOrderStatus(
      req.params.id,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });

  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    if (
      error.message ===
      "INVALID_STATUS"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (
      error.message ===
      "ORDER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update order status",
    });
  }
}

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  placeOrder,
  getOrders,
  getOrder,
  cancelUserOrder,
  getAllOrdersForAdmin,
  updateOrderStatusForAdmin,
};