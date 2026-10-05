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

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error(
      "Invalid server response:",
      text
    );

    throw new Error(
      "Server returned an invalid response"
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Order request failed"
    );
  }

  return data.data;
}


// =====================================
// PLACE ORDER
// =====================================

export async function placeOrder(orderData) {
  return request(API_URL, {
    method: "POST",

    body: JSON.stringify(orderData),
  });
}


// =====================================
// GET USER ORDERS
// =====================================

export async function getOrders() {
  return request(API_URL);
}


// =====================================
// GET SINGLE ORDER
// =====================================

export async function getOrder(id) {
  if (!id) {
    throw new Error("Order ID is required");
  }

  return request(`${API_URL}/${id}`);
}


// =====================================
// CANCEL ORDER
// =====================================

export async function cancelOrder(id) {
  if (!id) {
    throw new Error("Order ID is required");
  }

  return request(
    `${API_URL}/${id}/cancel`,
    {
      method: "PATCH",
    }
  );
}