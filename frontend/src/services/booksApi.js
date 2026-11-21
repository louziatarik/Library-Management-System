
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// Convert backend book records into frontend format.
export function normalizeBook(book) {
  const availableCopies = Number(book.available_copies ?? 0);

  return {
    id: book.book_id,
    title: book.title,
    author: book.author,
    category: book.category || "Uncategorized",
    isbn: book.isbn || null,
    description: book.description || "",
    cover: book.cover || null,
    availableCopies,
    available: availableCopies > 0,
  };
}

// Fetch books from the Express backend.
export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/api/books`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch books (HTTP ${response.status})`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid books API response");
  }

  return data.map(normalizeBook);
}
