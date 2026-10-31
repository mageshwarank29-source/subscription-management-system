const API_BASE_URL = "https://brightloop-backend-jyn7.onrender.com";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail || data);

    throw new Error(message || `Request failed: ${response.status}`);
  }

  return data;
}

export async function getCustomers() {
  const data = await apiRequest("/customers/");
  return data.customers || [];
}

export async function createCustomer(customer) {
  return apiRequest("/customers/", {
    method: "POST",
    body: JSON.stringify({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    }),
  });
}