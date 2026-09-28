import { useEffect, useState } from "react";

import {
  fetchProducts,
} from "../services/productApi";

function useProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;