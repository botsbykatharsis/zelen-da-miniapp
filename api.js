(function (global) {
  const API_BASE = "https://zelen-da-backend.onrender.com";
  const API_PRODUCTS = API_BASE + "/products/";
  const API_ORDERS = API_BASE + "/orders/";

  async function parseJsonSafe(res) {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }

  async function getProducts() {
    const res = await fetch(API_PRODUCTS, { method: "GET", headers: { "Accept": "application/json" } });
    if (!res.ok) {
      const body = await parseJsonSafe(res);
      throw new Error("Failed to load products: " + res.status + " " + (typeof body === "string" ? body : JSON.stringify(body)));
    }
    return res.json();
  }

  async function createOrder(order) {
    const res = await fetch(API_ORDERS, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(order)
    });
    if (!res.ok) {
      const body = await parseJsonSafe(res);
      throw new Error("Order failed: " + res.status + " " + (typeof body === "string" ? body : JSON.stringify(body)));
    }
    return res.json();
  }

  global.api = {
    getProducts,
    createOrder,
    _urls: { API_BASE, API_PRODUCTS, API_ORDERS }
  };
})(window);