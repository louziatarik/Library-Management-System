
import { useState } from "react";
import {
  Search,
  BookOpen,
  Filter,
  ArrowRight,
  Library,
  X,
  Sparkles,
} from "lucide-react";

// ----------------------------------
// BOOK CARD BACKGROUND COLORS
// ----------------------------------

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8",
];

// ----------------------------------
// 3D BOOK COVER COMPONENT
// ----------------------------------

function BookCover({ book }) {
  const [failedUrl, setFailedUrl] = useState(null);

  const coverUrl =
    book.cover ||
    (book.isbn
      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
      : null);

  const imageFailed =
    !coverUrl || failedUrl === coverUrl;

  return (
    <div
      className="book-3d-scene relative z-[1] flex h-full w-full items-center justify-center"
      style={{ perspective: "900px" }}
    >
      {/* GROUND SHADOW */}
      <div
        className="pointer-events-none absolute bottom-3 h-5 w-32 rounded-full bg-black/25 blur-xl"
        aria-hidden="true"
      />

      {/* 3D BOOK */}
      <div
        className="book-3d relative h-[174px] w-[124px] transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-24deg) rotateX(5deg)",
          filter: "drop-shadow(12px 12px 9px rgba(0,0,0,0.22))",
        }}
      >
        {/* BOOK SPINE */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[17px] rounded-l-sm"
          style={{
            background:
              "linear-gradient(90deg, #292929 0%, #565656 45%, #202020 100%)",
            transform:
              "translateX(-9px) rotateY(-90deg)",
            transformOrigin: "right center",
          }}
        />

        {/* PAGE BLOCK */}
        <div
          className="absolute inset-y-[5px] right-[-7px] w-[10px] rounded-r-sm"
          style={{
            background:
              "repeating-linear-gradient(to bottom, #fffdf7 0px, #fffdf7 2px, #e0dcd2 3px)",
            transform: "rotateY(45deg)",
          }}
        />

        {/* FRONT COVER */}
        <div
          className="absolute inset-0 overflow-hidden rounded-r-[4px] rounded-l-[2px] bg-[#F7F5F0]"
          style={{
            transform: "translateZ(7px)",
            boxShadow:
              "inset 5px 0 7px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.12)",
          }}
        >
          {!imageFailed ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              onError={() => setFailedUrl(coverUrl)}
              className="h-full w-full object-fill"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#F7F5F0] px-3 text-center">
              <BookOpen
                size={28}
                className="mb-4 text-[#123D30]"
              />

              <span className="text-xs font-extrabold leading-tight text-[#292929]">
                {book.title}
              </span>
            </div>
          )}

          {/* SPINE HIGHLIGHT */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[8px] bg-gradient-to-r from-black/25 to-transparent" />

          {/* COVER REFLECTION */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
        </div>
      </div>

      <style>{`
        .book-3d-scene:hover .book-3d,
        .group:hover .book-3d {
          transform: rotateY(-7deg) rotateX(2deg) translateY(-7px) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .book-3d {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ----------------------------------
// BOOK CATALOGUE PAGE
// ----------------------------------

export default function BookCatalogue({
  books = [],
  onViewDetails,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    "All Categories"
  );
  const [availability, setAvailability] = useState(
    "All Books"
  );

  const [sortBy, setSortBy] = useState("title-asc");

  // ----------------------------------
  // CATEGORIES
  // ----------------------------------

  const categories = [
    "All Categories",
    ...new Set(
      books.map((book) => book.category)
    ),
  ];

  // ----------------------------------
  // FILTER BOOKS
  // ----------------------------------

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      String(book.title || "")
        .toLowerCase()
        .includes(query) ||
      String(book.author || "")
        .toLowerCase()
        .includes(query) ||
      String(book.isbn || "").includes(query);

    const matchesCategory =
      category === "All Categories" ||
      book.category === category;

    const matchesAvailability =
      availability === "All Books" ||
      (availability === "Available" &&
        book.available) ||
      (availability === "Borrowed" &&
        !book.available);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability
    );
  });

  // ----------------------------------
  // SORT FILTERED BOOKS
  // ----------------------------------

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const compare = (field) =>
      String(a[field] || "").localeCompare(
        String(b[field] || ""),
        undefined,
        { sensitivity: "base" }
      );

    switch (sortBy) {
      case "title-desc":
        return -compare("title");

      case "author-asc":
        return compare("author");

      case "author-desc":
        return -compare("author");

      case "category-asc":
        return compare("category");

      case "title-asc":
      default:
        return compare("title");
    }
  });

  // ----------------------------------
  // CLEAR FILTERS
  // ----------------------------------

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setAvailability("All Books");
    setSortBy("title-asc");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    availability !== "All Books" ||
    sortBy !== "title-asc";

  // ----------------------------------
  // PAGE
  // ----------------------------------

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#A29A90]">
            Library Collection
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#292929]">
            Explore Library
          </h1>

          <p className="mt-2 text-sm text-[#85817B]">
            Discover something new and find
            your next favorite book.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5C96A]">
          <Library
            size={27}
            className="text-[#292929]"
          />
        </div>
      </header>

      {/* COLLECTION BANNER */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#D8EDE8] p-7 md:p-8">
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-xs font-bold text-[#276C64]">
            <Sparkles size={15} />
            DISCOVER & LEARN
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-[#292929] md:text-3xl">
            Every great story
            <br />
            starts with a book.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#55736C]">
            Explore our collection of
            programming, technology, design,
            and educational books.
          </p>
        </div>

        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/30" />

        <div className="absolute -bottom-24 right-12 h-48 w-48 rounded-full bg-[#A9D7D0]" />
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="rounded-[24px] border border-[#EEEAE4] bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
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
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-xl border border-[#EEEAE4] bg-[#F7F5F0] py-3.5 pl-12 pr-4 text-[#292929] placeholder:text-[#AAA59D] transition focus:border-[#D3A843] focus:outline-none"
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="relative">
            <Filter
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B]"
            />

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              aria-label="Filter by category"
              className="w-full rounded-xl border border-[#EEEAE4] bg-[#F7F5F0] py-3.5 pl-11 pr-4 text-[#292929] focus:border-[#D3A843] focus:outline-none lg:w-56"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* AVAILABILITY FILTER */}
          <select
            value={availability}
            onChange={(event) =>
              setAvailability(
                event.target.value
              )
            }
            aria-label="Filter by availability"
            className="w-full rounded-xl border border-[#EEEAE4] bg-[#F7F5F0] px-4 py-3.5 text-[#292929] focus:border-[#D3A843] focus:outline-none lg:w-40"
          >
            <option>All Books</option>
            <option>Available</option>
            <option>Borrowed</option>
          </select>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#A67C28] hover:text-[#292929]"
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

          <p className="mt-1 text-sm text-[#85817B]">
            Browse books available in our
            library.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="book-sort"
            className="text-sm font-medium text-[#85817B]"
          >
            Sort by
          </label>

          <select
            id="book-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-[#EEEAE4] bg-white px-4 py-2.5 text-sm font-semibold text-[#292929] focus:border-[#D3A843] focus:outline-none"
          >
            <option value="title-asc">Title: A?Z</option>
            <option value="title-desc">Title: Z?A</option>
            <option value="author-asc">Author: A?Z</option>
            <option value="author-desc">Author: Z?A</option>
            <option value="category-asc">Category: A?Z</option>
          </select>

          <span className="rounded-full border border-[#EEEAE4] bg-white px-4 py-2 text-sm font-semibold text-[#625B55]">
            {filteredBooks.length} Books Found
          </span>
        </div>
      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sortedBooks.map((book, index) => {
          const originalIndex =
            books.findIndex(
              (item) => item.id === book.id
            );

          const colorIndex =
            originalIndex >= 0
              ? originalIndex
              : index;

          const background =
            bookColors[
              colorIndex % bookColors.length
            ];

          return (
            <article
              key={book.id}
              className="group flex flex-col rounded-[24px] border border-[#EEEAE4] bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* 3D BOOK COVER AREA */}
              <div
                style={{
                  backgroundColor: background,
                }}
                className="relative flex h-64 items-center justify-center overflow-hidden rounded-[18px]"
              >
                {/* BACKGROUND DECORATION */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/20" />

                <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-white/20" />

                {/* 3D BOOK */}
                <BookCover
                  key={`${book.id}-${book.cover || book.isbn}`}
                  book={book}
                />

                {/* AVAILABILITY BADGE */}
                <span
                  className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1.5 text-xs font-bold ${
                    book.available
                      ? "bg-white text-[#27816B]"
                      : "bg-white text-[#C17742]"
                  }`}
                >
                  {book.available
                    ? "Available"
                    : "Borrowed"}
                </span>
              </div>

              {/* BOOK INFORMATION */}
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <span className="text-xs font-semibold text-[#A67C28]">
                  {book.category}
                </span>

                <h3 className="mt-2 text-lg font-bold leading-snug text-[#292929]">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-[#85817B]">
                  by {book.author}
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#85817B]">
                  {book.description}
                </p>

                <div className="mt-5 border-t border-[#EEEAE4] pt-4">
                  <p className="mb-4 text-xs text-[#AAA59D]">
                    ISBN: {book.isbn}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      onViewDetails?.(book)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5C96A] py-3 text-sm font-semibold text-[#292929] transition hover:bg-[#E9B950]"
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
        <div className="rounded-[24px] border border-[#EEEAE4] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F5F0]">
            <BookOpen
              size={30}
              className="text-[#A29A90]"
            />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            No books found
          </h3>

          <p className="mt-2 text-sm text-[#85817B]">
            Try changing your search or
            filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-[#F5C96A] px-5 py-3 text-sm font-semibold text-[#292929]"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* FOOTER NOTE */}
      <p className="text-xs text-[#A29A90]">
        Prototype catalogue — book records
        are sample data. Live information
        will be connected to the backend
        later.
      </p>
    </div>
  );
}
