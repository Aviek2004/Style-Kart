import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../services/cartApi";

import { useAuth } from "./AuthContext";

const CartContext =
  createContext(null);

export function CartProvider({
  children,
}) {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // FORMAT CART
  // ==========================================

  function formatCartItems(
    items = []
  ) {
    return items.map((item) => ({
      product: {
        id: item.product_id,
        name: item.name,
        description: item.description,
        brand: item.brand,
        category: item.category,
        price: Number(item.price),
        rating: Number(item.rating),
        image: item.image_url,
      },

      quantity:
        Number(item.quantity),
    }));
  }

  // ==========================================
  // UPDATE LOCAL CART
  // ==========================================

  function updateLocalCart(
    items = []
  ) {
    setCartItems(
      formatCartItems(items)
    );
  }

  // ==========================================
  // LOAD CART
  // ==========================================

  async function loadCart() {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getCart();

      updateLocalCart(
        data.items
      );

    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCartItems([]);

    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD WHEN USER LOGS IN
  // ==========================================

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setCartItems([]);
      return;
    }

    loadCart();
  }, [user, authLoading]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  async function addToCart(
    product
  ) {
    try {
      await addCartItem(
        product.id,
        1
      );

      await loadCart();

    } catch (error) {
      console.error(
        "Failed to add item:",
        error
      );

      alert(
        error.message ||
          "Failed to add item to cart"
      );
    }
  }

  // ==========================================
  // INCREASE
  // ==========================================

  async function increaseQuantity(
    productId
  ) {
    const item =
      cartItems.find(
        (item) =>
          item.product.id ===
          productId
      );

    if (!item) return;

    try {
      const data =
        await updateCartItem(
          productId,
          item.quantity + 1
        );

      updateLocalCart(
        data.items
      );

    } catch (error) {
      console.error(
        "Failed to increase quantity:",
        error
      );

      alert(
        error.message ||
          "Failed to update quantity"
      );
    }
  }

  // ==========================================
  // DECREASE
  // ==========================================

  async function decreaseQuantity(
    productId
  ) {
    const item =
      cartItems.find(
        (item) =>
          item.product.id ===
          productId
      );

    if (!item) return;

    const newQuantity =
      item.quantity - 1;

    try {
      if (newQuantity <= 0) {
        const data =
          await removeCartItem(
            productId
          );

        updateLocalCart(
          data.items
        );

        return;
      }

      const data =
        await updateCartItem(
          productId,
          newQuantity
        );

      updateLocalCart(
        data.items
      );

    } catch (error) {
      console.error(
        "Failed to decrease quantity:",
        error
      );

      alert(
        error.message ||
          "Failed to update quantity"
      );
    }
  }

  // ==========================================
  // REMOVE
  // ==========================================

  async function removeFromCart(
    productId
  ) {
    try {
      const data =
        await removeCartItem(
          productId
        );

      updateLocalCart(
        data.items
      );

    } catch (error) {
      console.error(
        "Failed to remove cart item:",
        error
      );

      alert(
        error.message ||
          "Failed to remove item"
      );
    }
  }

  // ==========================================
  // CLEAR CART
  // ==========================================

  async function clearCart() {
    try {
      await clearCartApi();

      setCartItems([]);

    } catch (error) {
      console.error(
        "Failed to clear cart:",
        error
      );

      alert(
        error.message ||
          "Failed to clear cart"
      );
    }
  }

  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity),
      0
    );

  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.product.price
        ) *
          Number(
            item.quantity
          ),
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        loading,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,

        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}