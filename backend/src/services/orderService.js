const pool = require("../config/db");

// ======================================================
// GET ALL ORDERS - ADMIN
// ======================================================

async function getAllOrders() {
  const [orders] = await pool.query(`
    SELECT
      o.id,
      o.user_id,
      o.total_amount,
      o.status,
      o.full_name,
      o.phone,
      o.address,
      o.city,
      o.state,
      o.pincode,
      o.created_at,
      u.name AS user_name,
      u.email AS user_email
    FROM orders o
    JOIN users u
      ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);

  return orders;
}

// ======================================================
// GET USER ORDERS
// ======================================================

async function getUserOrders(userId) {
  const [orders] = await pool.query(
    `
    SELECT
      id,
      total_amount,
      status,
      full_name,
      phone,
      address,
      city,
      state,
      pincode,
      created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  // Get items for every order
  for (const order of orders) {
    const [items] = await pool.query(
      `
      SELECT
        oi.id,
        oi.product_id,
        oi.quantity,
        oi.price,
        p.name,
        p.image_url AS image
      FROM order_items oi
      JOIN products p
        ON oi.product_id = p.id
      WHERE oi.order_id = ?
      `,
      [order.id]
    );

    order.items = items;
  }

  return orders;
}

// ======================================================
// GET SINGLE ORDER
// ======================================================

async function getOrderById(userId, orderId) {
  const [orders] = await pool.query(
    `
    SELECT
      id,
      total_amount,
      status,
      full_name,
      phone,
      address,
      city,
      state,
      pincode,
      created_at
    FROM orders
    WHERE id = ?
      AND user_id = ?
    `,
    [orderId, userId]
  );

  if (orders.length === 0) {
    throw new Error("Order not found");
  }

  const order = orders[0];

  const [items] = await pool.query(
    `
    SELECT
      oi.id,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name,
      p.image_url AS image
    FROM order_items oi
    JOIN products p
      ON oi.product_id = p.id
    WHERE oi.order_id = ?
    `,
    [orderId]
  );

  order.items = items;

  return order;
}

// ======================================================
// CREATE ORDER
// ======================================================

async function createOrder(userId, shippingAddress) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // --------------------------------------------------
    // Find user's cart
    // --------------------------------------------------

    const [cartRows] = await connection.query(
      `
      SELECT id
      FROM carts
      WHERE user_id = ?
      `,
      [userId]
    );

    if (cartRows.length === 0) {
      throw new Error("Cart not found");
    }

    const cartId = cartRows[0].id;

    // --------------------------------------------------
    // Get cart items
    // --------------------------------------------------

    const [items] = await connection.query(
      `
      SELECT
        ci.product_id,
        ci.quantity,
        p.price,
        p.name
      FROM cart_items ci
      JOIN products p
        ON ci.product_id = p.id
      WHERE ci.cart_id = ?
      `,
      [cartId]
    );

    if (items.length === 0) {
      throw new Error("Cart is empty");
    }

    // --------------------------------------------------
    // Calculate total
    // --------------------------------------------------

    const totalAmount = items.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          Number(item.quantity),
      0
    );

    // --------------------------------------------------
    // Create order
    // --------------------------------------------------

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (
        user_id,
        total_amount,
        status,
        full_name,
        phone,
        address,
        city,
        state,
        pincode
      )
      VALUES (?, ?, 'PLACED', ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        totalAmount,
        shippingAddress.fullName,
        shippingAddress.phone,
        shippingAddress.address,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.pincode,
      ]
    );

    const orderId = orderResult.insertId;

    // --------------------------------------------------
    // Create order items
    // --------------------------------------------------

    for (const item of items) {
      await connection.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );
    }

    // --------------------------------------------------
    // Empty cart after successful order
    // --------------------------------------------------

    await connection.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = ?
      `,
      [cartId]
    );

    // --------------------------------------------------
    // Commit transaction
    // --------------------------------------------------

    await connection.commit();

    return {
      orderId,
      totalAmount,
      status: "PLACED",
    };

  } catch (error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
}

// ======================================================
// CANCEL ORDER
// ======================================================

async function cancelOrder(userId, orderId) {
  const [orders] = await pool.query(
    `
    SELECT
      id,
      status
    FROM orders
    WHERE id = ?
      AND user_id = ?
    `,
    [orderId, userId]
  );

  if (orders.length === 0) {
    throw new Error("Order not found");
  }

  const order = orders[0];

  // Only these statuses can be cancelled
  if (
    order.status !== "PLACED" &&
    order.status !== "CONFIRMED"
  ) {
    throw new Error(
      "This order cannot be cancelled"
    );
  }

  await pool.query(
    `
    UPDATE orders
    SET status = 'CANCELLED'
    WHERE id = ?
      AND user_id = ?
    `,
    [orderId, userId]
  );

  return {
    id: orderId,
    status: "CANCELLED",
  };
}

// ======================================================
// UPDATE ORDER STATUS - ADMIN
// ======================================================

async function updateOrderStatus(
  orderId,
  status
) {
  const allowedStatuses = [
    "PLACED",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("INVALID_STATUS");
  }

  const [result] = await pool.query(
    `
    UPDATE orders
    SET status = ?
    WHERE id = ?
    `,
    [status, orderId]
  );

  if (result.affectedRows === 0) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return {
    id: Number(orderId),
    status,
  };
}

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};