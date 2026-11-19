
import { useState } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import { books } from "../data/books";

export default function BookCatalogue() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    ...new Set(books.map((book) => book.category))
  ];

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query);

    const matchesCategory =
      category === "All Categories" ||
      book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-cyan-400 text-sm font-medium mb-2">
          LIBRARY COLLECTION
        </p>

        <h1 className="text-3xl font-bold text-white">
          Book Catalogue
        </h1>

        <p className="text-slate-400 mt-2">
          Discover books and explore the library collection.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search by title, author or ISBN..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="relative">
            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full md:w-60 bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-cyan-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Books
        </h2>

        <p className="text-slate-400 text-sm">
          {filteredBooks.length} books found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/50 transition"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="bg-cyan-500/10 p-4 rounded-xl">
                <BookOpen size={28} className="text-cyan-400" />
              </div>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  book.available
                    ? "bg-green-500/10 text-green-400"
                    : "bg-orange-500/10 text-orange-400"
                }`}
              >
                {book.available ? "Available" : "Borrowed"}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white">
              {book.title}
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              {book.author}
            </p>

            <p className="text-cyan-400 text-xs mt-3">
              {book.category}
            </p>

            <p className="text-slate-400 text-sm mt-4 flex-1">
              {book.description}
            </p>

            <div className="border-t border-slate-800 mt-5 pt-4">
              <p className="text-slate-500 text-xs mb-4">
                ISBN: {book.isbn}
              </p>

              <button
                disabled
                title="Book details will be implemented next"
                className="w-full bg-slate-800 text-slate-400 font-medium py-3 rounded-xl cursor-not-allowed"
              >
                View Details — Coming Soon
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
          <BookOpen size={36} className="mx-auto text-slate-600 mb-4" />

          <h3 className="text-white font-semibold">
            No books found
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            Try another search or category.
          </p>
        </div>
      )}

      <p className="text-slate-500 text-xs">
        Demo catalogue — book information will be loaded from the backend API later.
      </p>
    </div>
  );
}
