import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../services/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        setOrders(data);
      } catch (error) {
        console.error(error);

        setError(
          error.message || "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-gray-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-3xl font-bold">
        My Orders
      </h1>

      <p className="mt-2 text-gray-500">
        View your previous orders and their details.
      </p>

      {orders.length === 0 ? (
        <div className="mt-16 text-center">

          <h2 className="text-xl font-semibold">
            No orders yet
          </h2>

          <p className="mt-2 text-gray-500">
            Start shopping to place your first order.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded bg-black px-8 py-3 font-semibold text-white"
          >
            Start Shopping
          </Link>

        </div>
      ) : (
        <div className="mt-10 space-y-8">

          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border bg-white p-6"
            >

              {/* Order Header */}

              <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                <Link
                    to={`/orders/${order.id}`}
                    className="mt-1 block font-semibold hover:underline"
                >
                #{order.id}
                </Link>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span className="mt-1 inline-block rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 font-semibold">
                    ₹{Number(order.total_amount).toFixed(2)}
                  </p>
                </div>

              </div>

              {/* Products */}

              <div className="mt-6 space-y-5">

                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 rounded object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Price: ₹
                        {Number(item.price).toFixed(2)}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* Delivery */}

              <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                  Delivery Address
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {order.full_name}
                  <br />
                  {order.phone}
                  <br />
                  {order.address}
                  <br />
                  {order.city}, {order.state} -{" "}
                  {order.pincode}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;