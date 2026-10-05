import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  if (loading) {
    return (
      <div className="px-6 py-20 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-20 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Browse our latest collection.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded border px-4 py-3 outline-none focus:border-black"
        />

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded px-5 py-2 ${
              category === item
                ? "bg-black text-white"
                : "border"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {filteredProducts.map(
            (product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group"
              >

                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-80 w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <p className="mt-4 text-xs uppercase text-gray-500">
                  {product.brand}
                </p>

                <h2 className="mt-1 font-semibold">
                  {product.name}
                </h2>

                <div className="mt-2 flex justify-between">
                  <span className="font-semibold">
                    ₹{product.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    ★ {product.rating}
                  </span>
                </div>

              </Link>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Products;