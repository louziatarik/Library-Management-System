// Demo-only wishlist storage.
// Saved locally in this browser, separately for each student.

const STORAGE_KEY = "booknest_demo_wishlists";

function getAllWishlists() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : {};

    return data && typeof data === "object" && !Array.isArray(data)
      ? data
      : {};
  } catch {
    return {};
  }
}

export function getStudentWishlist(studentId) {
  if (!studentId) return [];

  const wishlists = getAllWishlists();
  const saved = wishlists[studentId];

  return Array.isArray(saved) ? saved : [];
}

export function saveStudentWishlist(studentId, bookIds) {
  if (!studentId) return;

  const wishlists = getAllWishlists();

  wishlists[studentId] = [
    ...new Set(bookIds.map(String))
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(wishlists)
  );
}

export function toggleWishlistBook(studentId, bookId) {
  if (!studentId || bookId == null) return [];

  const current = getStudentWishlist(studentId);
  const id = String(bookId);

  const updated = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  saveStudentWishlist(studentId, updated);

  return updated;
}
