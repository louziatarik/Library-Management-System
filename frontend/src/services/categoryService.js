
import { apiRequest } from "./api";

// Provisional endpoints.
// Confirm these paths with the FastAPI backend.
const CATEGORY_ENDPOINTS = {
  list: "/categories",
  detail: (id) => `/categories/${encodeURIComponent(id)}`
};

// Retrieve all categories.
export async function getCategories() {
  return apiRequest(CATEGORY_ENDPOINTS.list);
}

// Retrieve a single category.
export async function getCategoryById(id) {
  return apiRequest(CATEGORY_ENDPOINTS.detail(id));
}

// Create a new category (administrator).
export async function createCategory(categoryData) {
  return apiRequest(CATEGORY_ENDPOINTS.list, {
    method: "POST",
    body: JSON.stringify(categoryData)
  });
}

// Update an existing category (administrator).
export async function updateCategory(id, categoryData) {
  return apiRequest(CATEGORY_ENDPOINTS.detail(id), {
    method: "PUT",
    body: JSON.stringify(categoryData)
  });
}

// Delete a category (administrator).
export async function deleteCategory(id) {
  return apiRequest(CATEGORY_ENDPOINTS.detail(id), {
    method: "DELETE"
  });
}
