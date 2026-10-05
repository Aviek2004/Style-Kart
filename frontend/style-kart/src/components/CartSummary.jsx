import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { totalPrice } = useCart();

  const subtotal = Number(totalPrice) || 0;
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="rounded-lg border bg-white p-8">

      <h2 className="text-3xl font-bold">
        Order Summary
      </h2>

      {/* Subtotal */}
      <div className="mt-10 flex justify-between text-xl">
        <span className="text-gray-600">
          Subtotal
        </span>

        <span>
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}
      <div className="mt-8 flex justify-between text-xl">
        <span className="text-gray-600">
          Shipping
        </span>

        <span>
          ₹{shipping.toFixed(2)}
        </span>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-black" />

      {/* Total */}
      <div className="flex justify-between text-2xl font-bold">
        <span>
          Total
        </span>

        <span>
          ₹{total.toFixed(2)}
        </span>
      </div>

      {/* Checkout */}
      <Link
        to="/checkout"
        className="mt-10 block rounded bg-black px-6 py-5 text-center text-xl font-semibold text-white hover:bg-gray-800"
      >
        Proceed to Checkout
      </Link>

    </div>
  );
}

export default CartSummary;