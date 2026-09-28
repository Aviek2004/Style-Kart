import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-lg border bg-white">

      <Link to={`/products/${product.id}`}>
        <div className="aspect-3/4 overflow-hidden bg-gray-100">

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

        </div>
      </Link>

      <div className="p-4">

        <p className="text-xs uppercase text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-1 font-medium">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">

          <p className="font-semibold">
            ₹{product.price}
          </p>

          <span className="text-sm text-gray-500">
            ★ {product.rating}
          </span>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;