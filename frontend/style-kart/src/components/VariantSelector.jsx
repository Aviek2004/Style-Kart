function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div>
      <h3 className="font-semibold">
        Select Size
      </h3>

      <div className="mt-4 flex flex-wrap gap-3">
        {variants.map((variant) => {
          const outOfStock = variant.stock === 0;

          const selected =
            selectedVariant?.id === variant.id;

          return (
            <button
              key={variant.id}
              disabled={outOfStock}
              onClick={() => onSelect(variant)}
              className={`
                min-w-16 rounded border px-4 py-3
                transition
                ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white"
                }
                ${
                  outOfStock
                    ? "cursor-not-allowed opacity-40 line-through"
                    : "hover:border-black"
                }
              `}
            >
              {variant.size}
            </button>
          );
        })}
      </div>

      {selectedVariant && (
        <p className="mt-4 text-sm text-gray-600">
          {selectedVariant.stock} available
        </p>
      )}
    </div>
  );
}

export default VariantSelector;