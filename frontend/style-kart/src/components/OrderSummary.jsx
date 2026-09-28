function OrderSummary({ cartItems }) {
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price *
        item.quantity,
    0
  );

  const deliveryFee =
    subtotal >= 999 ? 0 : 99;

  const total =
    subtotal + deliveryFee;

  return (
    <div className="rounded-lg border bg-white p-6">

      <h2 className="text-xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span>
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Delivery
          </span>

          <span>
            {deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee}`}
          </span>
        </div>

        <div className="border-t pt-4">

          <div className="flex justify-between font-semibold">
            <span>
              Total
            </span>

            <span>
              ₹{total}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderSummary;