const cartService = require("../services/cartService");


// GET CART
async function getCart(req, res) {
  try {

    const cart = await cartService.getCart(
      req.user.userId
    );

    res.json({
      success: true,
      data: cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });

  }
}


// ADD TO CART
async function addToCart(req, res) {
  try {

    const {
      productId,
      variantId,
      quantity,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: "Variant ID is required",
      });
    }

    const cart =
      await cartService.addToCart(
        req.user.userId,
        Number(productId),
        Number(variantId),
        Number(quantity) || 1
      );

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });

  }
}


// UPDATE CART ITEM
async function updateCartItem(req, res) {
  try {

    const {
      productId,
      variantId,
    } = req.params;

    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    const cart =
      await cartService.updateCartItem(
        req.user.userId,
        Number(productId),
        Number(variantId),
        Number(quantity)
      );

    res.json({
      success: true,
      message: "Cart updated",
      data: cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });

  }
}


// REMOVE CART ITEM
async function removeFromCart(req, res) {
  try {

    const {
      productId,
      variantId,
    } = req.params;

    const cart =
      await cartService.removeFromCart(
        req.user.userId,
        Number(productId),
        Number(variantId)
      );

    res.json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });

  }
}


// CLEAR CART
async function clearCart(req, res) {
  try {

    const cart =
      await cartService.clearCart(
        req.user.userId
      );

    res.json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });

  }
}


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};