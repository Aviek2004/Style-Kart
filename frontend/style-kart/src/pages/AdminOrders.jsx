import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/adminApi";

function AdminOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllOrders();

      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.role === "ADMIN") {
      loadOrders();
    }
  }, [user]);

  async function handleStatusChange(
    orderId,
    status
  ) {
    try {
      await updateOrderStatus(
        orderId,
        status
      );

      setOrders((previous) =>
        previous.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  if (user?.role !== "ADMIN") {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Access Denied
        </h1>

        <p className="mt-2 text-gray-500">
          Admin access is required.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-6 py-20 text-center">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-20 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-3xl font-bold">
        Admin Orders
      </h1>

      <p className="mt-2 text-gray-500">
        Manage customer orders and their status.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border">

        <table className="w-full text-left">

          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                Order
              </th>

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >

                <td className="px-6 py-4 font-medium">
                  #{order.id}
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium">
                    {order.user_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user_email}
                  </p>
                </td>

                <td className="px-6 py-4">
                  ₹{order.total_amount}
                </td>

                <td className="px-6 py-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="rounded border px-3 py-2"
                  >

                    <option value="PLACED">
                      PLACED
                    </option>

                    <option value="CONFIRMED">
                      CONFIRMED
                    </option>

                    <option value="SHIPPED">
                      SHIPPED
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>

                  </select>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {orders.length === 0 && (
          <p className="p-10 text-center text-gray-500">
            No orders found.
          </p>
        )}

      </div>

    </div>
  );
}

export default AdminOrders;