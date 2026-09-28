import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

function Cart() {
  const { cartItems, emptyCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add some products to your cart.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded bg-black px-8 py-3 font-semibold text-white"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        <button
          onClick={emptyCart}
          className="text-sm text-red-600 hover:underline"
        >
          Clear Cart
        </button>

      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">

        {/* Cart Items */}

        <div>

          {cartItems.map((item) => (
            <CartItem
              key={`${item.product.id}-${item.variant.id}`}
              item={item}
            />
          ))}

        </div>

        {/* Summary */}

        <div>
          <CartSummary />
        </div>

      </div>

    </div>
  );
}

export default Cart;