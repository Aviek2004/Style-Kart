const API_URL = "http://localhost:5000/api/v1/orders";

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
      data.message || "Order request failed"
    );
  }

  return data.data;
}
export async function getOrder(orderId) {
  return request(
    `${API_URL}/${orderId}`
  );
}

export async function cancelOrder(orderId) {
  return request(
    `${API_URL}/${orderId}/cancel`,
    {
      method: "PATCH",
    }
  );
}

export async function getOrders() {
  return request(API_URL);
}