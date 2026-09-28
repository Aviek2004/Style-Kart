import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

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
          onClick={() => navigate("/products")}
          className="mt-8 rounded bg-black px-8 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  function handleCheckout(data) {
    console.log(
      "Checkout information:",
      data
    );

    /*
      Phase 19:
      This will call createOrder(data)
      and create the order in MySQL.
    */

    alert(
      "Address saved. Order creation will be connected in the next phase."
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-3xl font-bold">
        Checkout
      </h1>

      <p className="mt-2 text-gray-500">
        Enter your delivery details.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

        <CheckoutForm
          onSubmit={handleCheckout}
        />

        <OrderSummary
          cartItems={cartItems}
        />

      </div>

    </div>
  );
}

export default Checkout;