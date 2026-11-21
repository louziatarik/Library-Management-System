
import { useMemo, useState } from "react";
import {
  Tags,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  BookOpen,
  AlertCircle
} from "lucide-react";

import { books } from "../../data/books";

const initialCategories = [
  {
    id: 1,
    name: "Software Engineering",
    description: "Software design, development, and best practices.",
    color: "#F5D77A"
  },
  {
    id: 2,
    name: "Programming",
    description: "Programming languages and practical coding.",
    color: "#F5C96A"
  },
  {
    id: 3,
    name: "Computer Science",
    description: "Algorithms, data structures, and computing.",
    color: "#E8B44D"
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "User experience and interface design.",
    color: "#FFE5A3"
  }
];

const categoryColors = [
  "#F5D77A",
  "#F5C96A",
  "#E8B44D",
  "#FFE5A3",
  "#FCECC0",
  "#F2D5B5"
];

export default function ManageCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    color: categoryColors[0]
  });

  const categoryData = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      bookCount: books.filter(
        (book) => book.category === category.name
      ).length
    }));
  }, [categories]);

  const filteredCategories = categoryData.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalClassifiedBooks = categoryData.reduce(
    (total, category) => total + category.bookCount,
    0
  );

  const openAddForm = () => {
    setEditingId(null);
    setError("");
    setForm({
      name: "",
      description: "",
      color: categoryColors[0]
    });
    setShowForm(true);
  };

  const openEditForm = (category) => {
    setEditingId(category.id);
    setError("");
    setForm({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingId
    );

    if (duplicate) {
      setError("A category with this name already exists.");
      return;
    }

    if (editingId !== null) {
      const existing = categories.find(
        (category) => category.id === editingId
      );

      // Avoid breaking existing book references in demo mode.
      if (
        existing &&
        existing.name !== name &&
        books.some((book) => book.category === existing.name)
      ) {
        setError(
          "This category contains books. Move its books to another category before renaming it."
        );
        return;
      }

      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name,
                description,
                color: form.color
              }
            : category
        )
      );
    } else {
      setCategories((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          name,
          description,
          color: form.color
        }
      ]);
    }

    closeForm();
  };

  const handleDelete = (category) => {
    if (category.bookCount > 0) {
      window.alert(
        `Cannot delete "${category.name}" because it contains ${category.bookCount} book(s).`
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete the category "${category.name}"?`
    );

    if (!confirmed) return;

    setCategories((current) =>
      current.filter((item) => item.id !== category.id)
    );
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#A29A90]">
            Administration / Categories
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Manage Categories
          </h1>

          <p className="text-sm text-[#85817B] mt-2">
            Organize your library collection by subject.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-2 bg-[#F5C96A] text-[#292929] px-5 py-3 rounded-2xl font-semibold hover:bg-[#E9BA50] transition-colors shadow-sm"
        >
          <Plus size={19} />
          Add Category
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-[#FFF1C2] rounded-[24px] p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-[#805500]">
              Total Categories
            </p>
            <h2 className="text-3xl font-extrabold text-[#292929] mt-2">
              {categories.length}
            </h2>
          </div>
          <Tags size={30} className="text-[#A66B00]" />
        </div>

        <div className="bg-[#FCE7A6] rounded-[24px] p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-[#805500]">
              Books Classified
            </p>
            <h2 className="text-3xl font-extrabold text-[#292929] mt-2">
              {totalClassifiedBooks}
            </h2>
          </div>
          <BookOpen size={30} className="text-[#A66B00]" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white border border-[#EEEAE4] rounded-[24px] p-5">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            aria-label="Search categories"
            className="w-full pl-11 pr-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
          />
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-[#EEEAE4] rounded-[24px] p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-3">
              <div
                style={{ backgroundColor: category.color }}
                className="w-13 h-13 rounded-2xl flex items-center justify-center p-3"
              >
                <Tags size={24} className="text-[#805500]" />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEditForm(category)}
                  aria-label={`Edit ${category.name}`}
                  className="p-2 bg-[#F7F5F0] rounded-lg hover:bg-[#F5C96A] transition-colors"
                >
                  <Pencil size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(category)}
                  aria-label={`Delete ${category.name}`}
                  className="p-2 bg-[#FFF0ED] text-[#B45C53] rounded-lg hover:bg-[#F6D7D1]"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#292929] mt-5">
              {category.name}
            </h3>

            <p className="text-sm text-[#85817B] mt-2 min-h-10">
              {category.description || "No description provided."}
            </p>

            <div className="border-t border-[#EEEAE4] mt-5 pt-4 flex items-center gap-2 text-sm text-[#805500]">
              <BookOpen size={17} />
              <span>
                {category.bookCount}{" "}
                {category.bookCount === 1 ? "book" : "books"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center text-[#85817B]">
          No categories found.
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-form-title"
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[28px] p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                id="category-form-title"
                className="text-2xl font-bold text-[#292929]"
              >
                {editingId !== null
                  ? "Edit Category"
                  : "Add New Category"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="p-2 hover:bg-[#FFF5D9] rounded-lg"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-semibold text-[#292929]">
                Category Name
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => {
                    setError("");
                    setForm((current) => ({
                      ...current,
                      name: event.target.value
                    }));
                  }}
                  className="mt-2 w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] font-normal"
                />
              </label>

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

              <div>
                <p className="text-sm font-semibold text-[#292929] mb-3">
                  Category Color
                </p>

                <div className="flex flex-wrap gap-3">
                  {categoryColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          color
                        }))
                      }
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                      aria-pressed={form.color === color}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        form.color === color
                          ? "ring-2 ring-offset-2 ring-[#A66B00]"
                          : ""
                      }`}
                    >
                      {form.color === color && (
                        <Check size={18} className="text-[#805500]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="bg-[#FFF0ED] rounded-xl p-3 flex items-start gap-2 text-sm text-[#B45C53]"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-3 bg-[#F7F5F0] rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-[#F5C96A] rounded-xl text-sm font-semibold hover:bg-[#E9BA50] flex items-center gap-2"
                >
                  <Check size={18} />
                  {editingId !== null
                    ? "Save Changes"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <p className="text-xs text-[#85817B]">
        Demo mode: categories and book counts use local demonstration
        data. Changes reset when the page is reloaded.
      </p>
    </div>
  );
}
