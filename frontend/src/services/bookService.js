
import { apiRequest } from "./api";

// Backend endpoint configuration.
// Update these paths when the FastAPI routes are confirmed.
const BOOK_ENDPOINTS = {
  list: "/books",
  detail: (id) => `/books/${encodeURIComponent(id)}`
};

// Retrieve all books from the backend.
export async function getBooks() {
  return apiRequest(BOOK_ENDPOINTS.list);
}

// Retrieve one book by ID.
export async function getBookById(id) {
  return apiRequest(BOOK_ENDPOINTS.detail(id));
}

// Add a new book (administrator).
export async function createBook(bookData) {
  return apiRequest(BOOK_ENDPOINTS.list, {
    method: "POST",
    body: JSON.stringify(bookData)
  });
}

// Update an existing book (administrator).
export async function updateBook(id, bookData) {
  return apiRequest(BOOK_ENDPOINTS.detail(id), {
    method: "PUT",
    body: JSON.stringify(bookData)
  });
}

// Delete a book (administrator).
export async function deleteBook(id) {
  return apiRequest(BOOK_ENDPOINTS.detail(id), {
    method: "DELETE"
  });
}
