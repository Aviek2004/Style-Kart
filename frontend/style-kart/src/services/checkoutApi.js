const API_URL =
  "http://localhost:5000/api/v1/checkout";

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
      data.message ||
        "Checkout request failed"
    );
  }

  return data.data;
}

export async function createOrder(
  checkoutData
) {
  return request(API_URL, {
    method: "POST",

    body: JSON.stringify(
      checkoutData
    ),
  });
}