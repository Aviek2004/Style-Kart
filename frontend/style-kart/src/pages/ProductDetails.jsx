import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import VariantSelector from "../components/VariantSelector";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:5000/api/v1/products";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product"
          );
        }

        setProduct(data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-12 md:grid-cols-2">

        {/* Product Image */}

        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full max-h-[650px] w-full object-cover"
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
              addToCart(product, selectedVariant);
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
              disabled:bg-gray-300
            "
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