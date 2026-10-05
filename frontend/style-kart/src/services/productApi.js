const API_URL =
  "http://localhost:5000/api/v1/products";

async function request(url) {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }

  return data.data;
}

export async function getProducts() {
  return request(API_URL);
}

export async function getProductById(id) {
  return request(`${API_URL}/${id}`);
}