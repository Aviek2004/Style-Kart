import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { subtotal } = useCart();

  const shipping = subtotal >= 2000 ? 0 : 99;

  const total = subtotal + shipping;

  return (
    <div className="rounded-lg border p-6">

      <h2 className="text-xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span>
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span>
            {shipping === 0
              ? "Free"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="border-t pt-4">

          <div className="flex justify-between text-lg font-semibold">

            <span>Total</span>

            <span>
              ₹{total}
            </span>

          </div>

        </div>

      </div>

      <Link
        to="/checkout"
        className="mt-6 block rounded bg-black py-4 text-center font-semibold text-white hover:bg-gray-800"
      >
        Proceed to Checkout
      </Link>

    </div>
  );
}

export default CartSummary;