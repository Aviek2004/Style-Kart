import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrder, cancelOrder } from "../services/orderApi";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  async function handleCancelOrder() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      await cancelOrder(order.id);

      setOrder((previous) => ({
        ...previous,
        status: "CANCELLED",
      }));
    } catch (error) {
      console.error(error);

      alert(error.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  }

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const data = await getOrder(id);

        setOrder(data);
      } catch (error) {
        console.error(error);

        setError(error.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        Loading order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Order Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

        <Link
          to="/orders"
          className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Back Button */}
      <Link
        to="/orders"
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back to Orders
      </Link>

      {/* Order Header */}
      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row">

        <div>
          <h1 className="text-3xl font-bold">
            Order #{order.id}
          </h1>

          <p className="mt-2 text-gray-500">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Status + Cancel */}
        <div className="flex flex-col items-end gap-3">

          <span
            className={`h-fit rounded px-4 py-2 text-sm font-semibold ${
              order.status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {order.status}
          </span>

          {(order.status === "PLACED" ||
            order.status === "CONFIRMED") && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="rounded border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">

        {/* Products */}
        <div className="rounded-lg border bg-white p-6">

          <h2 className="text-xl font-bold">
            Ordered Items
          </h2>

          <div className="mt-6 divide-y">

            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 py-5"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-24 rounded object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 font-medium">
                    ₹{Number(item.price).toFixed(2)}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">

          {/* Total */}
          <div className="rounded-lg border bg-white p-6">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between border-t pt-4">

              <span className="font-semibold">
                Total
              </span>

              <span className="font-bold">
                ₹{Number(order.total_amount).toFixed(2)}
              </span>

            </div>

          </div>

          {/* Address */}
          <div className="rounded-lg border bg-white p-6">

            <h2 className="text-xl font-bold">
              Delivery Address
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {order.full_name}
              <br />
              {order.phone}
              <br />
              {order.address}
              <br />
              {order.city}, {order.state} - {order.pincode}
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}

export default OrderDetails;