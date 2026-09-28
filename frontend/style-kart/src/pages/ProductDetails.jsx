import { useParams } from "react-router-dom";
import { useState } from "react";

import products from "../data/products";
import VariantSelector from "../components/VariantSelector";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedVariant, setSelectedVariant] =
    useState(null);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-12 md:grid-cols-2">

        {/* Product Image */}

        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-650px w-full object-cover"
          />
        </div>

        {/* Product Information */}

        <div className="flex flex-col">

          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.brand}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">

            <p className="text-xl font-semibold">
              ₹{product.price}
            </p>

            <span className="rounded bg-gray-100 px-3 py-1 text-sm">
              ★ {product.rating}
            </span>

          </div>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="my-8 border-t" />

          {/* Variant Selector */}

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={setSelectedVariant}
          />

          {/* Add To Cart */}

          <button
            disabled={!selectedVariant}
            onClick={() => {
            addToCart(
            product.id,
            selectedVariant.id
            );
          }}
          className="
            mt-8
            w-full
            rounded
           bg-black
            py-4
            font-semibold
           text-white
            transition
           hover:bg-gray-800
            disabled:cursor-not-allowed
           disabled:bg-gray-300"
          >
            {selectedVariant
              ? "Add to Cart"
              : "Select a Size"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;