import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

import { createOrder } from "../services/checkoutApi";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    clearCart,
  } = useCart();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add products before checking out.
        </p>

        <button
          onClick={() =>
            navigate("/products")
          }
          className="mt-8 rounded bg-black px-8 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  async function handleCheckout(
    shippingAddress
  ) {
    try {
      setLoading(true);
      setError("");

      const order =
        await createOrder(
          shippingAddress
        );

      console.log(
        "Order created:",
        order
      );

      clearCart();

      alert(
        `Order #${order.orderId} placed successfully!`
      );

      navigate("/");

    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      setError(
        error.message ||
        "Failed to place order"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-3xl font-bold">
        Checkout
      </h1>

      <p className="mt-2 text-gray-500">
        Enter your delivery details.
      </p>

      {error && (
        <div className="mt-6 rounded bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

        <CheckoutForm
          onSubmit={handleCheckout}
          loading={loading}
        />

        <OrderSummary
          cartItems={cartItems}
        />

      </div>

    </div>
  );
}

export default Checkout;