const pool = require("../config/db");

async function getAllProducts() {
  const [products] = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.brand,
      p.category,
      p.price,
      p.rating,
      p.image_url
    FROM products p
    ORDER BY p.created_at DESC
  `);

  return products;
}

async function getProductById(productId) {
  const [products] = await pool.query(
    `
      SELECT
        p.id,
        p.name,
        p.description,
        p.brand,
        p.category,
        p.price,
        p.rating,
        p.image_url
      FROM products p
      WHERE p.id = ?
    `,
    [productId]
  );

  if (products.length === 0) {
    return null;
  }

  const [variants] = await pool.query(
    `
      SELECT
        id,
        sku,
        size,
        color,
        stock
      FROM product_variants
      WHERE product_id = ?
      ORDER BY size
    `,
    [productId]
  );

  return {
    ...products[0],
    variants,
  };
}

module.exports = {
  getAllProducts,
  getProductById,
};  