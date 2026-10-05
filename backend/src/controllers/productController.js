const productService = require("../services/productService");

async function getProducts(req, res) {
  try {
    const products =
      await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
}

async function getProduct(req, res) {
  try {
    const product =
      await productService.getProductById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.error(
      "Get product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
}

async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      rating,
      image_url,
    } = req.body;

    if (
      !name ||
      !brand ||
      !category ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, brand, category and price are required",
      });
    }

    const product =
      await productService.createProduct({
        name: name.trim(),
        description,
        brand: brand.trim(),
        category: category.trim(),
        price,
        rating,
        image_url,
      });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(
      "Create product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      rating,
      image_url,
    } = req.body;

    if (
      !name ||
      !brand ||
      !category ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, brand, category and price are required",
      });
    }

    const product =
      await productService.updateProduct(
        req.params.id,
        {
          name: name.trim(),
          description,
          brand: brand.trim(),
          category: category.trim(),
          price,
          rating,
          image_url,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.error(
      "Update product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const result =
      await productService.deleteProduct(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.error(
      "Delete product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};