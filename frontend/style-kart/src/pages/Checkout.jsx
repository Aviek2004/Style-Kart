import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------
  // Handle input changes
  // -----------------------------------

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // -----------------------------------
  // Place order
  // -----------------------------------

  async function handlePlaceOrder(e) {
    e.preventDefault();

    setError("");

    // Check cart
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Validate form
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      setError(
        "Please fill in all delivery details."
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        "Sending order data:",
        formData
      );

      // -----------------------------------
      // Call backend
      // -----------------------------------

      const order = await placeOrder(formData);

      console.log(
        "Order response:",
        order
      );

      // -----------------------------------
      // Get order ID
      // -----------------------------------

      const orderId =
        order?.id ??
        order?.orderId ??
        order?.order_id;

      console.log(
        "Created Order ID:",
        orderId
      );

      // -----------------------------------
      // Make sure ID exists
      // -----------------------------------

      if (!orderId) {
        console.error(
          "Order response does not contain an ID:",
          order
        );

        throw new Error(
          "Order was created but order ID was not returned by the server."
        );
      }

      // -----------------------------------
      // Clear cart
      // -----------------------------------

      await clearCart();

      // -----------------------------------
      // Go to order details
      // -----------------------------------

      navigate(`/orders/${orderId}`);

    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      setError(
        error.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------------
  // Empty cart
  // -----------------------------------

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add products before proceeding to checkout.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-8 rounded bg-black px-8 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  // -----------------------------------
  // Checkout page
  // -----------------------------------

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your delivery details to place your order.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

        {/* ================================= */}
        {/* DELIVERY FORM */}
        {/* ================================= */}

        <form
          onSubmit={handlePlaceOrder}
          className="rounded-lg border bg-white p-6"
        >

          <h2 className="text-xl font-bold">
            Delivery Information
          </h2>

          {/* Full Name */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* Phone */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* Address */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House number, street, area"
              rows="4"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* City */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* State */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* Pincode */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="w-full rounded border px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* Place Order */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded bg-black px-6 py-4 text-lg font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

        {/* ================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================= */}

        <div className="h-fit rounded-lg border bg-white p-6">

          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">

            {/* Items */}

            <div className="flex justify-between">

              <span className="text-gray-600">
                Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>

            {/* Subtotal */}

            <div className="flex justify-between">

              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                ₹{Number(totalPrice || 0).toFixed(2)}
              </span>

            </div>

            {/* Shipping */}

            <div className="flex justify-between">

              <span className="text-gray-600">
                Shipping
              </span>

              <span>
                ₹99
              </span>

            </div>

            {/* Total */}

            <div className="border-t pt-4">

              <div className="flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {(
                    Number(totalPrice || 0) + 99
                  ).toFixed(2)}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;