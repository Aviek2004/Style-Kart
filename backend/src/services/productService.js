const pool = require("../config/db");

async function getAllProducts() {
  const [products] = await pool.query(`
    SELECT
      id,
      name,
      description,
      brand,
      category,
      price,
      rating,
      image_url,
      created_at,
      updated_at
    FROM products
    ORDER BY created_at DESC
  `);

  return products;
}

async function getProductById(id) {
  const [products] = await pool.query(
    `
    SELECT
      id,
      name,
      description,
      brand,
      category,
      price,
      rating,
      image_url,
      created_at,
      updated_at
    FROM products
    WHERE id = ?
    `,
    [id]
  );

  if (products.length === 0) {
    return null;
  }

  const product = products[0];

  const [variants] = await pool.query(
    `
    SELECT
      id,
      size,
      color,
      stock
    FROM product_variants
    WHERE product_id = ?
    ORDER BY id
    `,
    [id]
  );

  product.variants = variants;

  return product;
}

async function createProduct(product) {
  const {
    name,
    description,
    brand,
    category,
    price,
    rating,
    image_url,
  } = product;

  const [result] = await pool.query(
    `
    INSERT INTO products
    (
      name,
      description,
      brand,
      category,
      price,
      rating,
      image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      description,
      brand,
      category,
      price,
      rating || 0,
      image_url,
    ]
  );

  return getProductById(result.insertId);
}

async function updateProduct(productId, product) {
  const {
    name,
    description,
    brand,
    category,
    price,
    rating,
    image_url,
  } = product;

  const [result] = await pool.query(
    `
    UPDATE products
    SET
      name = ?,
      description = ?,
      brand = ?,
      category = ?,
      price = ?,
      rating = ?,
      image_url = ?
    WHERE id = ?
    `,
    [
      name,
      description,
      brand,
      category,
      price,
      rating || 0,
      image_url,
      productId,
    ]
  );

  if (result.affectedRows === 0) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return getProductById(productId);
}

async function deleteProduct(productId) {
  const [result] = await pool.query(
    `
    DELETE FROM products
    WHERE id = ?
    `,
    [productId]
  );

  if (result.affectedRows === 0) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return {
    id: Number(productId),
  };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};