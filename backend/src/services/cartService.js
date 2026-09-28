const pool = require("../config/db");


// Get existing cart or create one
async function getOrCreateCart(userId) {
  const [existingCarts] = await pool.query(
    `
      SELECT id
      FROM carts
      WHERE user_id = ?
    `,
    [userId]
  );

  if (existingCarts.length > 0) {
    return existingCarts[0].id;
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


// Get cart
async function getCart(userId) {
  const cartId = await getOrCreateCart(userId);

  const [items] = await pool.query(
    `
      SELECT
        id,
        product_id,
        variant_id,
        quantity
      FROM cart_items
      WHERE cart_id = ?
      ORDER BY created_at DESC
    `,
    [cartId]
  );

  return {
    cartId,
    items,
  };
}


// Add product + variant
async function addToCart(
  userId,
  productId,
  variantId,
  quantity = 1
) {
  const cartId = await getOrCreateCart(userId);

  const [existingItems] = await pool.query(
    `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = ?
      AND product_id = ?
      AND variant_id = ?
    `,
    [
      cartId,
      productId,
      variantId,
    ]
  );

  if (existingItems.length > 0) {

    await pool.query(
      `
        UPDATE cart_items
        SET quantity = quantity + ?
        WHERE id = ?
      `,
      [
        quantity,
        existingItems[0].id,
      ]
    );

  } else {

    await pool.query(
      `
        INSERT INTO cart_items
        (
          cart_id,
          product_id,
          variant_id,
          quantity
        )
        VALUES (?, ?, ?, ?)
      `,
      [
        cartId,
        productId,
        variantId,
        quantity,
      ]
    );

  }

  return getCart(userId);
}


// Update quantity
async function updateCartItem(
  userId,
  productId,
  variantId,
  quantity
) {
  const cartId = await getOrCreateCart(userId);

  if (quantity <= 0) {

    await pool.query(
      `
        DELETE FROM cart_items
        WHERE cart_id = ?
        AND product_id = ?
        AND variant_id = ?
      `,
      [
        cartId,
        productId,
        variantId,
      ]
    );

  } else {

    await pool.query(
      `
        UPDATE cart_items
        SET quantity = ?
        WHERE cart_id = ?
        AND product_id = ?
        AND variant_id = ?
      `,
      [
        quantity,
        cartId,
        productId,
        variantId,
      ]
    );

  }

  return getCart(userId);
}


// Remove product + variant
async function removeFromCart(
  userId,
  productId,
  variantId
) {
  const cartId = await getOrCreateCart(userId);

  await pool.query(
    `
      DELETE FROM cart_items
      WHERE cart_id = ?
      AND product_id = ?
      AND variant_id = ?
    `,
    [
      cartId,
      productId,
      variantId,
    ]
  );

  return getCart(userId);
}


// Clear cart
async function clearCart(userId) {
  const cartId = await getOrCreateCart(userId);

  await pool.query(
    `
      DELETE FROM cart_items
      WHERE cart_id = ?
    `,
    [cartId]
  );

  return getCart(userId);
}


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};