/**
 * Centralized API service for Activity 5 - Laravel Eloquent ORM
 * Base URL: http://127.0.0.1:8000/api/v1
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      // not JSON
    }
    const message = errorJson?.message || `HTTP ${response.status}: ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = errorJson;
    throw error;
  }

  return response.json();
}

/**
 * Fetch all 15 pre-computed queries from /products/queries
 */
export async function getProductQueries() {
  const res = await request('/products/queries');
  // Laravel ApiResponse trait returns { status: 200, message: "...", data: { ... } }
  return res.data || res;
}

/**
 * Fetch paginated products from /products
 * @param {number} page
 */
export async function getProducts(page = 1) {
  return request(`/products?page=${page}`);
}

/**
 * Fetch specific product by ID from /products/{id}
 * @param {string|number} id
 */
export async function getProductById(id) {
  return request(`/products/${id}`);
}

/**
 * Fetch categories from /categories
 */
export async function getCategories() {
  const res = await request('/categories');
  // CategoryController returns { success: true, data: [...] }
  return res.data || res;
}

export { API_BASE_URL };
