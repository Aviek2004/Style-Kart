import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CartSummary() {
  const {
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="text-xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Items
          </span>

          <span>
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Delivery
          </span>

          <span className="text-green-600">
            Free
          </span>
        </div>

        <div className="flex justify-between border-t pt-4">
          <span className="font-semibold">
            Total
          </span>

          <span className="font-bold">
            ₹{Number(totalPrice).toFixed(2)}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block w-full rounded bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-800"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/products"
        className="mt-3 block text-center text-sm text-gray-500 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default CartSummary;