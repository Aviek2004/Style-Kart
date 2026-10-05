function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  if (!variants || variants.length === 0) {
    return (
      <p className="text-sm text-red-600">
        No variants available.
      </p>
    );
  }

  return (
    <div>
      <h3 className="font-semibold">
        Select Size
      </h3>

      <div className="mt-3 flex flex-wrap gap-3">
        {variants.map((variant) => {
          const selected =
            selectedVariant?.id === variant.id;

          const unavailable = variant.stock <= 0;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={unavailable}
              onClick={() => onSelect(variant)}
              className={`rounded border px-5 py-2 text-sm ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white"
              } ${
                unavailable
                  ? "cursor-not-allowed opacity-40"
                  : "hover:border-black"
              }`}
            >
              {variant.size}
            </button>
          );
        })}
      </div>

      {selectedVariant && (
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Color:{" "}
            <span className="font-medium text-gray-800">
              {selectedVariant.color}
            </span>
          </p>

          <p>
            Stock: {selectedVariant.stock}
          </p>
        </div>
      )}
    </div>
  );
}

export default VariantSelector;