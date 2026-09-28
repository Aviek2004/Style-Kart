import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cartApi";

import products from "../data/products";


const CartContext = createContext(null);


function formatCartItems(items) {
  return items
    .map((item) => {
      const product = products.find(
        (product) =>
          product.id === Number(item.product_id)
      );

      if (!product) {
        return null;
      }

      const variant = product.variants?.find(
        (variant) =>
          variant.id === Number(item.variant_id)
      );

      if (!variant) {
        return null;
      }

      return {
        id: item.id,
        product,
        variant,
        quantity: Number(item.quantity),
      };
    })
    .filter(Boolean);
}


export function CartProvider({ children }) {

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // LOAD CART
  useEffect(() => {

    async function loadCart() {

      if (authLoading) {
        return;
      }

      if (!user) {
        setCartItems([]);
        return;
      }

      try {

        setLoading(true);

        const cart =
          await getCart();

        setCartItems(
          formatCartItems(
            cart.items || []
          )
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

    loadCart();

  }, [user, authLoading]);


  // ADD TO CART
  async function addToCart(
    productId,
    variantId,
    quantity = 1
  ) {

    if (!user) {
      throw new Error(
        "Please login to add products to cart"
      );
    }

    const cart =
      await addCartItem(
        productId,
        variantId,
        quantity
      );

    setCartItems(
      formatCartItems(
        cart.items || []
      )
    );

    return cart;
  }


  // INCREASE
  async function increaseQuantity(
    productId,
    variantId
  ) {

    const item = cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.variant.id === variantId
    );

    if (!item) {
      return;
    }

    const cart =
      await updateCartItem(
        productId,
        variantId,
        item.quantity + 1
      );

    setCartItems(
      formatCartItems(
        cart.items || []
      )
    );
  }


  // DECREASE
  async function decreaseQuantity(
    productId,
    variantId
  ) {

    const item = cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.variant.id === variantId
    );

    if (!item) {
      return;
    }

    const newQuantity =
      item.quantity - 1;

    const cart =
      await updateCartItem(
        productId,
        variantId,
        newQuantity
      );

    setCartItems(
      formatCartItems(
        cart.items || []
      )
    );
  }


  // REMOVE
  async function removeFromCart(
    productId,
    variantId
  ) {

    const cart =
      await removeCartItem(
        productId,
        variantId
      );

    setCartItems(
      formatCartItems(
        cart.items || []
      )
    );
  }


  // CLEAR
  async function emptyCart() {

    if (!user) {
      return;
    }

    const cart =
      await clearCart();

    setCartItems(
      formatCartItems(
        cart.items || []
      )
    );
  }


  // CART COUNT
  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity),
      0
    );


  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,

        addToCart,

        increaseQuantity,
        decreaseQuantity,

        removeFromCart,

        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}