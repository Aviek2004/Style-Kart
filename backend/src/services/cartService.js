const pool = require("../config/db");

// ==========================================
// GET OR CREATE CART
// ==========================================

async function getOrCreateCart(userId) {
  const [carts] = await pool.query(
    `
    SELECT id
    FROM carts
    WHERE user_id = ?
    `,
    [userId]
  );

  if (carts.length > 0) {
    return carts[0].id;
  }

  const [result] = await pool.query(
    `
    INSERT INTO carts (user_id)
    VALUES (?)
    `,
    [userId]
  );

  return result.insertId;
}

// ==========================================
// GET CART
// ==========================================

async function getCart(userId) {
  const cartId =
    await getOrCreateCart(userId);

  const [items] = await pool.query(
    `
    SELECT
      ci.id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.description,
      p.brand,
      p.category,
      p.price,
      p.rating,
      p.image_url
    FROM cart_items ci
    JOIN products p
      ON ci.product_id = p.id
    WHERE ci.cart_id = ?
    ORDER BY ci.created_at DESC
    `,
    [cartId]
  );

  return {
    cartId,
    items,
  };
}

// ==========================================
// ADD CART ITEM
// ==========================================

async function addCartItem(
  userId,
  productId,
  quantity = 1
) {
  const cartId =
    await getOrCreateCart(userId);

  const [products] = await pool.query(
    `
    SELECT id
    FROM products
    WHERE id = ?
    `,
    [productId]
  );

  if (products.length === 0) {
    throw new Error(
      "PRODUCT_NOT_FOUND"
    );
  }

  await pool.query(
    `
    INSERT INTO cart_items
      (cart_id, product_id, quantity)
    VALUES (?, ?, ?)

    ON DUPLICATE KEY UPDATE
      quantity =
        quantity + VALUES(quantity)
    `,
    [
      cartId,
      productId,
      quantity,
    ]
  );

  return getCart(userId);
}

// ==========================================
// UPDATE CART ITEM
// ==========================================

async function updateCartItem(
  userId,
  productId,
  quantity
) {
  const cartId =
    await getOrCreateCart(userId);

  // Remove if quantity becomes 0
  if (quantity <= 0) {
    await pool.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = ?
        AND product_id = ?
      `,
      [
        cartId,
        productId,
      ]
    );

    return getCart(userId);
  }

  const [result] = await pool.query(
    `
    UPDATE cart_items
    SET quantity = ?
    WHERE cart_id = ?
      AND product_id = ?
    `,
    [
      quantity,
      cartId,
      productId,
    ]
  );

  if (result.affectedRows === 0) {
    throw new Error(
      "CART_ITEM_NOT_FOUND"
    );
  }

  return getCart(userId);
}

// ==========================================
// REMOVE CART ITEM
// ==========================================

async function removeCartItem(
  userId,
  productId
) {
  const cartId =
    await getOrCreateCart(userId);

  await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = ?
      AND product_id = ?
    `,
    [
      cartId,
      productId,
    ]
  );

  return getCart(userId);
}

// ==========================================
// CLEAR CART
// ==========================================

async function clearCart(userId) {
  const cartId =
    await getOrCreateCart(userId);

  await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = ?
    `,
    [cartId]
  );

  return {
    cartId,
    items: [],
  };
}

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};