const API_URL = "http://localhost:5000/api/v1/cart";

function getToken() {
  return localStorage.getItem("token");
}

async function request(url, options = {}) {
  const token = getToken();

  const response = await fetch(url, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Cart request failed"
    );
  }

  return data.data;
}

// GET CART
export async function getCart() {
  return request(API_URL);
}

// ADD PRODUCT
export async function addCartItem(
  productId,
  quantity = 1
) {
  return request(API_URL, {
    method: "POST",

    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
}

// UPDATE QUANTITY
export async function updateCartItem(
  productId,
  quantity
) {
  return request(
    `${API_URL}/${productId}`,
    {
      method: "PATCH",

      body: JSON.stringify({
        quantity,
      }),
    }
  );
}

// REMOVE PRODUCT
export async function removeCartItem(
  productId
) {
  return request(
    `${API_URL}/${productId}`,
    {
      method: "DELETE",
    }
  );
}

// CLEAR CART
export async function clearCart() {
  return request(API_URL, {
    method: "DELETE",
  });
}