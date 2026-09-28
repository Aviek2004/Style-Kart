import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const { product, variant, quantity } = item;

  return (
    <div className="flex gap-5 border-b py-6">

      {/* Image */}

      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-24 rounded object-cover"
      />

      {/* Information */}

      <div className="flex flex-1 flex-col">

        <div className="flex justify-between">

          <div>
            <p className="text-xs uppercase text-gray-500">
              {product.brand}
            </p>

            <h3 className="mt-1 font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Size: {variant.size}
            </p>

            <p className="text-sm text-gray-500">
              Color: {variant.color}
            </p>
          </div>

          <p className="font-semibold">
            ₹{product.price * quantity}
          </p>

        </div>

        {/* Quantity */}

        <div className="mt-auto flex items-center gap-4">

          <div className="flex items-center rounded border">

            <button
              onClick={() =>
                decreaseQuantity(
                  product.id,
                  variant.id
                )
              }
              className="px-3 py-1 text-lg"
            >
              −
            </button>

            <span className="px-3">
              {quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  product.id,
                  variant.id
                )
              }
              className="px-3 py-1 text-lg"
            >
              +
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(
                product.id,
                variant.id
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