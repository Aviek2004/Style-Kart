const cartService =
  require("../services/cartService");

// ==========================================
// GET CART
// ==========================================

async function getCart(req, res) {
  try {
    const cart =
      await cartService.getCart(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    console.error(
      "Get cart error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch cart",
    });
  }
}

// ==========================================
// ADD CART ITEM
// ==========================================

async function addCartItem(req, res) {
  try {
    const {
      productId,
      quantity,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID is required",
      });
    }

    const cart =
      await cartService.addCartItem(
        req.user.userId,
        Number(productId),
        Number(quantity) || 1
      );

    return res.status(201).json({
      success: true,
      message:
        "Product added to cart",
      data: cart,
    });

  } catch (error) {

    if (
      error.message ===
      "PRODUCT_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    console.error(
      "Add cart item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to add product to cart",
    });
  }
}

// ==========================================
// UPDATE CART ITEM
// ==========================================

async function updateCartItem(req, res) {
  try {
    const {
      quantity,
    } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity is required",
      });
    }

    const productId =
      Number(req.params.productId);

    const parsedQuantity =
      Number(quantity);

    if (
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid product ID",
      });
    }

    if (
      !Number.isInteger(
        parsedQuantity
      ) ||
      parsedQuantity < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid quantity",
      });
    }

    const cart =
      await cartService.updateCartItem(
        req.user.userId,
        productId,
        parsedQuantity
      );

    return res.status(200).json({
      success: true,
      message:
        "Cart updated",
      data: cart,
    });

  } catch (error) {

    if (
      error.message ===
      "CART_ITEM_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Cart item not found",
      });
    }

    console.error(
      "Update cart item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update cart",
    });
  }
}

// ==========================================
// REMOVE CART ITEM
// ==========================================

async function removeCartItem(
  req,
  res
) {
  try {
    const productId =
      Number(req.params.productId);

    if (
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid product ID",
      });
    }

    const cart =
      await cartService.removeCartItem(
        req.user.userId,
        productId
      );

    return res.status(200).json({
      success: true,
      message:
        "Product removed from cart",
      data: cart,
    });

  } catch (error) {
    console.error(
      "Remove cart item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to remove product",
    });
  }
}

// ==========================================
// CLEAR CART
// ==========================================

async function clearCart(req, res) {
  try {
    const cart =
      await cartService.clearCart(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      message:
        "Cart cleared",
      data: cart,
    });

  } catch (error) {
    console.error(
      "Clear cart error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to clear cart",
    });
  }
}

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};