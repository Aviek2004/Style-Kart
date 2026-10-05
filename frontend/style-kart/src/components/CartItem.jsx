import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const {
    product,
    quantity,
  } = item;

  return (
    <div className="flex gap-5 border-b py-6">

      {/* Product Image */}

      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-24 rounded object-cover"
      />

      {/* Product Information */}

      <div className="flex flex-1 flex-col">

        <div className="flex justify-between gap-4">

          <div>

            <p className="text-xs uppercase text-gray-500">
              {product.brand}
            </p>

            <h3 className="mt-1 font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Category: {product.category}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              ₹
              {Number(
                product.price
              ).toFixed(2)}{" "}
              each
            </p>

          </div>

          {/* Total */}

          <p className="font-semibold">
            ₹
            {(
              Number(
                product.price
              ) *
              Number(quantity)
            ).toFixed(2)}
          </p>

        </div>

        {/* Controls */}

        <div className="mt-auto flex items-center gap-4">

          <div className="flex items-center rounded border">

            <button
              onClick={() =>
                decreaseQuantity(
                  product.id
                )
              }
              className="px-3 py-1 text-lg hover:bg-gray-100"
            >
              −
            </button>

            <span className="px-3">
              {quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  product.id
                )
              }
              className="px-3 py-1 text-lg hover:bg-gray-100"
            >
              +
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(
                product.id
              )
            }
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  );
}

export default CartItem;