
import { useState } from "react";
import {
  Search,
  BookOpen,
  Filter,
  ArrowRight,
  Library,
  X,
  Sparkles
} from "lucide-react";

import { books } from "../data/books";

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8"
];

export default function BookCatalogue({ onViewDetails }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [availability, setAvailability] = useState("All Books");

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

    const matchesAvailability =
      availability === "All Books" ||
      (availability === "Available" && book.available) ||
      (availability === "Borrowed" && !book.available);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setAvailability("All Books");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    availability !== "All Books";

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[#A29A90] text-sm font-medium">
            Library Collection
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Explore Library
          </h1>

          <p className="text-[#85817B] text-sm mt-2">
            Discover something new and find your next favorite book.
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#F5C96A] flex items-center justify-center">
          <Library size={27} className="text-[#292929]" />
        </div>
      </header>

      {/* COLLECTION BANNER */}
      <section className="bg-[#D8EDE8] rounded-[28px] p-7 md:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-3 py-1.5 text-xs font-bold text-[#276C64]">
            <Sparkles size={15} />
            DISCOVER & LEARN
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#292929] mt-4">
            Every great story
            <br />
            starts with a book.
          </h2>

          <p className="text-[#55736C] text-sm mt-3 leading-relaxed">
            Explore our collection of programming, technology,
            design, and educational books.
          </p>
        </div>

        <div className="absolute -right-12 -top-20 w-64 h-64 bg-white/30 rounded-full" />
        <div className="absolute right-12 -bottom-24 w-48 h-48 bg-[#A9D7D0] rounded-full" />
      </section>

      {/* SEARCH & FILTERS */}
      <section className="bg-white border border-[#EEEAE4] rounded-[24px] p-5 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B978F]"
            />

            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#EEEAE4] rounded-xl py-3.5 pl-12 pr-4 text-[#292929] placeholder:text-[#AAA59D] focus:outline-none focus:border-[#D3A843] transition"
            />
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B] pointer-events-none"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="w-full lg:w-56 bg-[#F7F5F0] border border-[#EEEAE4] rounded-xl py-3.5 pl-11 pr-4 text-[#292929] focus:outline-none focus:border-[#D3A843]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* AVAILABILITY */}
          <select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            aria-label="Filter by availability"
            className="w-full lg:w-40 bg-[#F7F5F0] border border-[#EEEAE4] rounded-xl py-3.5 px-4 text-[#292929] focus:outline-none focus:border-[#D3A843]"
          >
            <option>All Books</option>
            <option>Available</option>
            <option>Borrowed</option>
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#A67C28] hover:text-[#292929]"
          >
            <X size={15} />
            Clear Filters
          </button>
        )}
      </section>

      {/* RESULTS HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#292929]">
            Our Collection
          </h2>

          <p className="text-[#85817B] text-sm mt-1">
            Browse books available in our library.
          </p>
        </div>

        <span className="bg-white border border-[#EEEAE4] rounded-full px-4 py-2 text-sm font-semibold text-[#625B55]">
          {filteredBooks.length} Books Found
        </span>
      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const originalIndex = books.findIndex(
            (item) => item.id === book.id
          );

          const background =
            bookColors[originalIndex % bookColors.length];

          return (
            <article
              key={book.id}
              className="bg-white border border-[#EEEAE4] rounded-[24px] p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >

              {/* BOOK COVER AREA */}
              <div
                style={{ backgroundColor: background }}
                className="h-56 rounded-[18px] relative overflow-hidden flex items-center justify-center"
              >
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/20" />

                <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/20" />

                <span
                  className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold ${
                    book.available
                      ? "bg-white text-[#27816B]"
                      : "bg-white text-[#C17742]"
                  }`}
                >
                  {book.available ? "Available" : "Borrowed"}
                </span>

                {/* STYLIZED BOOK */}
                <div className="relative w-32 h-40 bg-white/80 rounded-r-lg rounded-l-sm shadow-xl border-l-[7px] border-[#292929]/20 flex flex-col items-center justify-center p-4 text-center rotate-[-5deg]">
                  <BookOpen
                    size={30}
                    className="text-[#292929] mb-4"
                  />

                  <span className="text-xs font-extrabold text-[#292929] leading-tight">
                    {book.title}
                  </span>
                </div>
              </div>

              {/* BOOK INFORMATION */}
              <div className="px-2 pt-5 pb-2 flex flex-col flex-1">
                <span className="text-xs font-semibold text-[#A67C28]">
                  {book.category}
                </span>

                <h3 className="text-lg font-bold text-[#292929] mt-2 leading-snug">
                  {book.title}
                </h3>

                <p className="text-[#85817B] text-sm mt-1">
                  by {book.author}
                </p>

                <p className="text-[#85817B] text-sm mt-4 leading-relaxed flex-1">
                  {book.description}
                </p>

                <div className="border-t border-[#EEEAE4] mt-5 pt-4">
                  <p className="text-[#AAA59D] text-xs mb-4">
                    ISBN: {book.isbn}
                  </p>

                  <button
  onClick={() => onViewDetails(book)}
  className="w-full flex items-center justify-center gap-2 bg-[#F5C96A] text-[#292929] rounded-xl py-3 font-semibold text-sm hover:bg-[#E9B950] transition"
>
  View Details
  <ArrowRight size={17} />
</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredBooks.length === 0 && (
        <div className="bg-white border border-[#EEEAE4] rounded-[24px] text-center py-16 px-6">
          <div className="w-16 h-16 bg-[#F7F5F0] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <BookOpen size={30} className="text-[#A29A90]" />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            No books found
          </h3>

          <p className="text-[#85817B] text-sm mt-2">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-5 bg-[#F5C96A] text-[#292929] px-5 py-3 rounded-xl font-semibold text-sm"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* FOOTER NOTE */}
      <p className="text-xs text-[#A29A90]">
        Prototype catalogue — book records are sample data.
        Live information will be connected to the backend later.
      </p>
    </div>
  );
}
