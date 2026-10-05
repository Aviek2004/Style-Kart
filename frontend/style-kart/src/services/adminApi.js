const API_URL =
  "http://localhost:5000/api/v1/orders";

function getToken() {
  return localStorage.getItem("token");
}

async function request(url, options = {}) {
  const token = getToken();

  const response = await fetch(url, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,

      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Admin request failed"
    );
  }

  return data.data;
}

export async function getAllOrders() {
  return request(`${API_URL}/admin/all`);
}

export async function updateOrderStatus(
  orderId,
  status
) {
  return request(
    `${API_URL}/admin/${orderId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );
}