
import { useMemo, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  Library,
  BookCheck,
  BookX,
} from "lucide-react";

import { books as initialBooks } from "../../data/books";

// ----------------------------------
// HELPERS
// ----------------------------------

const getBookCover = (isbn) => {
  const cleanedISBN = String(isbn || "")
    .replace(/[\s-]/g, "")
    .trim();

  if (!cleanedISBN) return null;

  return `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(
    cleanedISBN
  )}-M.jpg?default=false`;
};

const emptyForm = {
  title: "",
  author: "",
  category: "",
  isbn: "",
  description: "",
  available: true,
};

// ----------------------------------
// REAL BOOK COVER
// ----------------------------------

function BookCover({ book, large = false }) {
  const [failedUrl, setFailedUrl] = useState(null);

  const coverUrl =
    book.cover || getBookCover(book.isbn);

  const imageFailed =
    !coverUrl || failedUrl === coverUrl;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#FFF1C2] ${
        large ? "h-40 w-28 p-3" : "h-16 w-12 p-1"
      }`}
    >
      {!imageFailed ? (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title || "book"}`}
          loading="lazy"
          onError={() => setFailedUrl(coverUrl)}
          className="max-h-full max-w-full rounded-sm object-contain shadow-sm"
        />
      ) : (
        <BookOpen
          size={large ? 35 : 22}
          className="text-[#805500]"
        />
      )}
    </div>
  );
}

// ----------------------------------
// MANAGE BOOKS
// ----------------------------------

export default function ManageBooks() {
  const [books, setBooks] = useState(() =>
    initialBooks.map((book) => ({ ...book }))
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [availabilityFilter, setAvailabilityFilter] =
    useState("All");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // ----------------------------------
  // CATEGORIES AND FILTERS
  // ----------------------------------

  const categories = useMemo(
    () =>
      [
        ...new Set(
          books.map((book) => book.category)
        ),
      ].sort(),
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = search.trim().toLowerCase();

      const matchesSearch = [
        book.title,
        book.author,
        book.isbn,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query)
      );

      const matchesCategory =
        categoryFilter === "All" ||
        book.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available"
          ? book.available
          : !book.available);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [
    books,
    search,
    categoryFilter,
    availabilityFilter,
  ]);

  const availableCount = books.filter(
    (book) => book.available
  ).length;

  // ----------------------------------
  // FORM ACTIONS
  // ----------------------------------

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEditForm = (book) => {
    setEditingId(book.id);

    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      description: book.description ?? "",
      available: book.available,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  // ----------------------------------
  // ADD / EDIT BOOK
  // ----------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleaned = {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      isbn: form.isbn.trim(),
      description: form.description.trim(),
    };

    if (
      !cleaned.title ||
      !cleaned.author ||
      !cleaned.category ||
      !cleaned.isbn
    ) {
      return;
    }

    const duplicateISBN = books.some(
      (book) =>
        String(book.isbn).toLowerCase() ===
          cleaned.isbn.toLowerCase() &&
        book.id !== editingId
    );

    if (duplicateISBN) {
      window.alert(
        "A book with this ISBN already exists."
      );
      return;
    }

    // Generate the cover URL from the current ISBN.
    const updatedBook = {
      ...cleaned,
      cover: getBookCover(cleaned.isbn),
    };

    if (editingId !== null) {
      setBooks((current) =>
        current.map((book) =>
          book.id === editingId
            ? { ...book, ...updatedBook }
            : book
        )
      );
    } else {
      const newBook = {
        ...updatedBook,
        id: crypto.randomUUID(),
      };

      setBooks((current) => [
        ...current,
        newBook,
      ]);
    }

    closeForm();
  };

  // ----------------------------------
  // DELETE BOOK
  // ----------------------------------

  const handleDelete = (book) => {
    const confirmed = window.confirm(
      `Delete "${book.title}" from the demo inventory?`
    );

    if (!confirmed) return;

    setBooks((current) =>
      current.filter(
        (item) => item.id !== book.id
      )
    );
  };

  // ----------------------------------
  // PAGE
  // ----------------------------------

  return (
    <div className="space-y-7">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#A29A90]">
            Administration / Books
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#292929]">
            Manage Books
          </h1>

          <p className="mt-2 text-sm text-[#85817B]">
            Add, edit, and organize your library
            collection.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-2xl bg-[#F5C96A] px-5 py-3 font-semibold text-[#292929] shadow-sm transition-colors hover:bg-[#E9BA50]"
        >
          <Plus size={19} />
          Add New Book
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          {
            label: "Total Books",
            value: books.length,
            icon: Library,
            color: "#FFF1C2",
          },
          {
            label: "Available",
            value: availableCount,
            icon: BookCheck,
            color: "#FCE7A6",
          },
          {
            label: "Unavailable",
            value:
              books.length - availableCount,
            icon: BookX,
            color: "#F6D7D1",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: stat.color,
              }}
              className="flex items-center justify-between rounded-[24px] p-6"
            >
              <div>
                <p className="text-sm text-[#625B55]">
                  {stat.label}
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#292929]">
                  {stat.value}
                </h2>
              </div>

              <div className="rounded-xl bg-white/60 p-3">
                <Icon
                  size={25}
                  className="text-[#805500]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTERS */}
      <div className="rounded-[24px] border border-[#EEEAE4] bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search title, author, ISBN..."
              aria-label="Search books"
              className="w-full rounded-xl bg-[#F7F5F0] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#F5C96A]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            aria-label="Filter by category"
            className="w-full rounded-xl bg-[#F7F5F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5C96A]"
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(event) =>
              setAvailabilityFilter(
                event.target.value
              )
            }
            aria-label="Filter by availability"
            className="w-full rounded-xl bg-[#F7F5F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5C96A]"
          >
            <option value="All">
              All Availability
            </option>

            <option value="Available">
              Available
            </option>

            <option value="Unavailable">
              Unavailable
            </option>
          </select>
        </div>
      </div>

      {/* BOOK INVENTORY */}
      <div className="overflow-hidden rounded-[28px] border border-[#EEEAE4] bg-white">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-bold text-[#292929]">
            Book Inventory
          </h2>

          <span className="text-sm text-[#85817B]">
            {filteredBooks.length} results
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FFF8E6]">
              <tr className="text-xs uppercase tracking-wide text-[#805500]">
                <th className="px-6 py-4">
                  Book
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  ISBN
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-[#EEEAE4] hover:bg-[#FFFCF3]"
                >
                  {/* BOOK COVER + INFORMATION */}
                  <td className="px-6 py-4">
                    <div className="flex min-w-48 items-center gap-3">
                      <BookCover
                        key={`${book.id}-${book.cover || book.isbn}`}
                        book={book}
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#292929]">
                          {book.title}
                        </p>

                        <p className="mt-1 text-xs text-[#85817B]">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#625B55]">
                    {book.category}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#85817B]">
                    {book.isbn}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                        book.available
                          ? "bg-[#FFF5D9] text-[#A66B00]"
                          : "bg-[#FFF0ED] text-[#B45C53]"
                      }`}
                    >
                      {book.available
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(book)
                        }
                        aria-label={`Edit ${book.title}`}
                        className="rounded-lg bg-[#F7F5F0] p-2 hover:bg-[#F5C96A]"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(book)
                        }
                        aria-label={`Delete ${book.title}`}
                        className="rounded-lg bg-[#FFF0ED] p-2 text-[#B45C53] hover:bg-[#F6D7D1]"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-[#85817B]"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-form-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="book-form-title"
                className="text-2xl font-bold text-[#292929]"
              >
                {editingId !== null
                  ? "Edit Book"
                  : "Add New Book"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="rounded-lg p-2 hover:bg-[#FFF5D9]"
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* BOOK INFORMATION */}
              {[
                {
                  name: "title",
                  label: "Book Title",
                },
                {
                  name: "author",
                  label: "Author",
                },
                {
                  name: "category",
                  label: "Category",
                },
                {
                  name: "isbn",
                  label: "ISBN",
                },
              ].map((field) => (
                <label
                  key={field.name}
                  className="block text-sm font-semibold text-[#292929]"
                >
                  {field.label}

                  <input
                    type="text"
                    required
                    value={form[field.name]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.name]:
                          event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl bg-[#F7F5F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#F5C96A]"
                  />
                </label>
              ))}

              {/* LIVE COVER PREVIEW */}
              <div className="rounded-2xl border border-[#EEEAE4] bg-[#FFFCF3] p-4">
                <p className="mb-3 text-sm font-semibold text-[#292929]">
                  Book Cover Preview
                </p>

                <div className="flex items-center gap-4">
                  <BookCover
                    key={form.isbn}
                    book={{
                      title: form.title,
                      isbn: form.isbn,
                    }}
                    large
                  />

                  <div>
                    <p className="text-sm font-medium text-[#292929]">
                      Automatic ISBN Cover
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#85817B]">
                      Enter a valid ISBN to look
                      up the book cover from
                      Open Library.
                    </p>

                    <p className="mt-2 text-xs text-[#A67C28]">
                      If no cover is available,
                      a book icon will appear.
                    </p>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <label className="block text-sm font-semibold text-[#292929]">
                Description

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description:
                        event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl bg-[#F7F5F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#F5C96A]"
                />
              </label>

              {/* AVAILABILITY */}
              <label className="flex items-center gap-3 text-sm font-semibold text-[#292929]">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      available:
                        event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#D8A53B]"
                />

                Book is available
              </label>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl bg-[#F7F5F0] px-5 py-3 text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#F5C96A] px-5 py-3 text-sm font-semibold hover:bg-[#E9BA50]"
                >
                  <Check size={18} />

                  {editingId !== null
                    ? "Save Changes"
                    : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <p className="text-xs text-[#85817B]">
        Demo mode: changes are temporary and are
        not saved to the database.
      </p>
    </div>
  );
}
