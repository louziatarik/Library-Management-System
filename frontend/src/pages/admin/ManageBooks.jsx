
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
  BookX
} from "lucide-react";

import { books as initialBooks } from "../../data/books";

const emptyForm = {
  title: "",
  author: "",
  category: "",
  isbn: "",
  description: "",
  available: true
};

export default function ManageBooks() {
  const [books, setBooks] = useState(() =>
    initialBooks.map((book) => ({ ...book }))
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const categories = useMemo(
    () => [...new Set(books.map((book) => book.category))].sort(),
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = search.trim().toLowerCase();

      const matchesSearch = [
        book.title,
        book.author,
        book.isbn
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
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
  }, [books, search, categoryFilter, availabilityFilter]);

  const availableCount = books.filter((book) => book.available).length;

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
      available: book.available
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleaned = {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      isbn: form.isbn.trim(),
      description: form.description.trim()
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
        book.isbn.toLowerCase() === cleaned.isbn.toLowerCase() &&
        book.id !== editingId
    );

    if (duplicateISBN) {
      window.alert("A book with this ISBN already exists.");
      return;
    }

    if (editingId !== null) {
      setBooks((current) =>
        current.map((book) =>
          book.id === editingId
            ? { ...book, ...cleaned }
            : book
        )
      );
    } else {
      const newBook = {
        ...cleaned,
        id: crypto.randomUUID()
      };

      setBooks((current) => [...current, newBook]);
    }

    closeForm();
  };

  const handleDelete = (book) => {
    const confirmed = window.confirm(
      `Delete "${book.title}" from the demo inventory?`
    );

    if (!confirmed) return;

    setBooks((current) =>
      current.filter((item) => item.id !== book.id)
    );
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-sm text-[#A29A90]">
            Administration / Books
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Manage Books
          </h1>

          <p className="text-sm text-[#85817B] mt-2">
            Add, edit, and organize your library collection.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-2 bg-[#F5C96A] text-[#292929] px-5 py-3 rounded-2xl font-semibold hover:bg-[#E9BA50] transition-colors shadow-sm"
        >
          <Plus size={19} />
          Add New Book
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            label: "Total Books",
            value: books.length,
            icon: Library,
            color: "#FFF1C2"
          },
          {
            label: "Available",
            value: availableCount,
            icon: BookCheck,
            color: "#FCE7A6"
          },
          {
            label: "Unavailable",
            value: books.length - availableCount,
            icon: BookX,
            color: "#F6D7D1"
          }
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              style={{ backgroundColor: stat.color }}
              className="rounded-[24px] p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-[#625B55]">
                  {stat.label}
                </p>

                <h2 className="text-3xl font-extrabold text-[#292929] mt-2">
                  {stat.value}
                </h2>
              </div>

              <div className="bg-white/60 rounded-xl p-3">
                <Icon size={25} className="text-[#805500]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-[24px] p-5 border border-[#EEEAE4]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, author, ISBN..."
              aria-label="Search books"
              className="w-full pl-11 pr-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
            className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
          >
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(event) => setAvailabilityFilter(event.target.value)}
            aria-label="Filter by availability"
            className="w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* BOOK INVENTORY */}
      <div className="bg-white rounded-[28px] border border-[#EEEAE4] overflow-hidden">
        <div className="p-6 flex justify-between items-center">
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
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">ISBN</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-[#EEEAE4] hover:bg-[#FFFCF3]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-48">
                      <div className="w-11 h-13 bg-[#F5C96A] rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen size={21} className="text-[#292929]" />
                      </div>

                      <div>
                        <p className="font-semibold text-sm text-[#292929]">
                          {book.title}
                        </p>

                        <p className="text-xs text-[#85817B] mt-1">
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
                      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                        book.available
                          ? "bg-[#FFF5D9] text-[#A66B00]"
                          : "bg-[#FFF0ED] text-[#B45C53]"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(book)}
                        aria-label={`Edit ${book.title}`}
                        className="p-2 rounded-lg bg-[#F7F5F0] hover:bg-[#F5C96A]"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(book)}
                        aria-label={`Delete ${book.title}`}
                        className="p-2 rounded-lg bg-[#FFF0ED] text-[#B45C53] hover:bg-[#F6D7D1]"
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
                    className="text-center py-12 text-[#85817B]"
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
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-form-title"
            className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[28px] p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                id="book-form-title"
                className="text-2xl font-bold text-[#292929]"
              >
                {editingId !== null ? "Edit Book" : "Add New Book"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="p-2 rounded-lg hover:bg-[#FFF5D9]"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "title", label: "Book Title" },
                { name: "author", label: "Author" },
                { name: "category", label: "Category" },
                { name: "isbn", label: "ISBN" }
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
                        [field.name]: event.target.value
                      }))
                    }
                    className="mt-2 w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] font-normal"
                  />
                </label>
              ))}

              <label className="block text-sm font-semibold text-[#292929]">
                Description

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value
                    }))
                  }
                  className="mt-2 w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] font-normal"
                />
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold text-[#292929]">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      available: event.target.checked
                    }))
                  }
                  className="w-4 h-4 accent-[#D8A53B]"
                />

                Book is available
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-3 bg-[#F7F5F0] rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-3 bg-[#F5C96A] rounded-xl font-semibold text-sm hover:bg-[#E9BA50]"
                >
                  <Check size={18} />
                  {editingId !== null ? "Save Changes" : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <p className="text-xs text-[#85817B]">
        Demo mode: changes are temporary and are not saved to the database.
      </p>
    </div>
  );
}
