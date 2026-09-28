import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const PRODUCTS_PER_PAGE = 4;

function Products() {
  const { products, loading, error } = useProducts();

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  // Get unique brands
  const brands = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.brand)),
    ];
  }, [products]);

  // Filtering + sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Brand
    if (brand !== "All") {
      result = result.filter(
        (product) => product.brand === brand
      );
    }

    // Minimum price
    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >= Number(minPrice)
      );
    }

    // Maximum price
    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }

    // Sorting
    if (sort === "price-low") {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  ]);

  // Total pages
  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  // Products for current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  ]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 text-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">
          Shop
        </h1>

        <p className="text-gray-500 mt-2">
          Discover products from StyleKart
        </p>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Brand
              </label>

              <select
                value={brand}
                onChange={(e) =>
                  setBrand(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Price
              </label>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value)
                  }
                  className="w-1/2 border rounded-lg px-3 py-2"
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Sort
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">
                  Default
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* Result count */}
        <div className="flex justify-between items-center mb-5">
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Products */}
        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <h2 className="text-xl font-semibold">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {currentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >

                {/* Image */}
                <div className="h-72 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-4">

                  <p className="text-sm text-gray-500">
                    {product.brand}
                  </p>

                  <h2 className="font-semibold text-lg mt-1">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <p className="font-bold text-lg">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                    <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                      ★ {Number(product.rating).toFixed(1)}
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Products;