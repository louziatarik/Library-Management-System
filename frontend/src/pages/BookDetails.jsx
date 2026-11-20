
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Tag,
  Hash,
  CheckCircle2,
  Clock3,
  BookMarked,
  Info,
} from "lucide-react";

// ----------------------------------
// BOOK BACKGROUND COLORS
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
// LARGE 3D BOOK COVER
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
      className="book-details-3d-scene relative z-10 flex h-full w-full items-center justify-center"
      style={{ perspective: "1100px" }}
    >
      {/* GROUND SHADOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 h-9 w-48 rounded-full bg-black/25 blur-2xl"
      />

      {/* 3D BOOK */}
      <div
        className="book-details-3d relative h-[290px] w-[205px] transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-25deg) rotateX(5deg)",
          filter:
            "drop-shadow(18px 18px 13px rgba(0,0,0,0.25))",
        }}
      >
        {/* BACK COVER */}
        <div
          className="absolute inset-0 rounded-r-md bg-[#304A43]"
          style={{
            transform: "translateZ(-12px)",
          }}
        />

        {/* BOOK SPINE */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[26px] rounded-l-sm"
          style={{
            background:
              "linear-gradient(90deg, #172D27 0%, #46675D 45%, #14251F 100%)",
            transform:
              "translateX(-13px) rotateY(-90deg)",
            transformOrigin: "right center",
          }}
        />

        {/* PAGE BLOCK */}
        <div
          className="absolute bottom-[6px] right-[-12px] top-[6px] w-[22px] rounded-r-sm"
          style={{
            background:
              "repeating-linear-gradient(to bottom, #fffdf7 0px, #fffdf7 2px, #e0dcd2 3px)",
            transform: "rotateY(45deg)",
          }}
        />

        {/* FRONT COVER */}
        <div
          className="absolute inset-0 overflow-hidden rounded-l-[3px] rounded-r-[6px] bg-[#F7F5F0]"
          style={{
            transform: "translateZ(12px)",
            boxShadow:
              "inset 7px 0 12px rgba(0,0,0,0.22), 3px 3px 8px rgba(0,0,0,0.12)",
          }}
        >
          {!imageFailed ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              onError={() => setFailedUrl(coverUrl)}
              className="h-full w-full object-fill"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#F7F5F0] p-6 text-center">
              <BookOpen
                size={44}
                className="mb-6 text-[#123D30]"
              />

              <h2 className="text-lg font-extrabold leading-tight text-[#292929]">
                {book.title}
              </h2>

              <p className="mt-4 text-xs text-[#625B55]">
                {book.author}
              </p>
            </div>
          )}

          {/* SPINE SHADOW */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[12px] bg-gradient-to-r from-black/30 to-transparent" />

          {/* COVER REFLECTION */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
        </div>
      </div>

      <style>{`
        .book-details-3d-scene:hover .book-details-3d {
          transform:
            rotateY(-8deg)
            rotateX(2deg)
            translateY(-10px) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .book-details-3d {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ----------------------------------
// BOOK DETAILS PAGE
// ----------------------------------

export default function BookDetails({
  book,
  onBack,
  onBorrow,
  isBorrowed = false,
}) {
  if (!book) {
    return (
      <div className="rounded-[24px] bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-[#292929]">
          Book not found
        </h2>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 rounded-xl bg-[#F5C96A] px-5 py-3 font-semibold"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const numericId = Number(book.id);
  const colorIndex = Number.isFinite(numericId)
    ? Math.max(0, numericId - 1)
    : 0;

  const background =
    bookColors[colorIndex % bookColors.length];

  return (
    <div className="space-y-7">
      {/* BACK NAVIGATION */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#85817B] transition hover:text-[#292929]"
      >
        <ArrowLeft size={18} />
        Back to Catalogue
      </button>

      {/* PAGE HEADING */}
      <div>
        <p className="text-sm font-medium text-[#A29A90]">
          Library Collection / Book Details
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#292929]">
          Book Details
        </h1>

        <p className="mt-2 text-sm text-[#85817B]">
          Explore information about this book.
        </p>
      </div>

      {/* MAIN DETAILS CARD */}
      <div className="rounded-[28px] border border-[#EEEAE4] bg-white p-5 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          {/* 3D BOOK COVER */}
          <div
            style={{ backgroundColor: background }}
            className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[24px] p-6"
          >
            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/20" />

            {/* 3D BOOK */}
            <BookCover
              key={`${book.id}-${book.cover || book.isbn}`}
              book={book}
            />
          </div>

          {/* BOOK INFORMATION */}
          <div className="flex flex-col">
            {/* CATEGORY AND AVAILABILITY */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#F9E8B5] px-4 py-2 text-xs font-bold text-[#87651F]">
                {book.category}
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                  book.available
                    ? "bg-[#E9F4F0] text-[#27816B]"
                    : "bg-[#FFF0E5] text-[#C17742]"
                }`}
              >
                {book.available ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <Clock3 size={15} />
                )}

                {book.available
                  ? "Available"
                  : "Borrowed"}
              </span>
            </div>

            {/* BOOK TITLE */}
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-[#292929] md:text-4xl">
              {book.title}
            </h2>

            <p className="mt-3 text-lg text-[#85817B]">
              by {book.author}
            </p>

            {/* METADATA */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* AUTHOR */}
              <div className="rounded-2xl bg-[#F7F5F0] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-[#85817B]">
                  <UserRound size={16} />
                  Author
                </div>

                <p className="text-sm font-bold text-[#292929]">
                  {book.author}
                </p>
              </div>

              {/* CATEGORY */}
              <div className="rounded-2xl bg-[#F7F5F0] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-[#85817B]">
                  <Tag size={16} />
                  Category
                </div>

                <p className="text-sm font-bold text-[#292929]">
                  {book.category}
                </p>
              </div>

              {/* ISBN */}
              <div className="rounded-2xl bg-[#F7F5F0] p-4 sm:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-xs text-[#85817B]">
                  <Hash size={16} />
                  ISBN
                </div>

                <p className="break-all text-sm font-bold text-[#292929]">
                  {book.isbn}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#292929]">
                About This Book
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#777D78]">
                {book.description}
              </p>
            </div>

            {/* BORROW BUTTON */}
            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={() => onBorrow?.(book)}
                disabled={
                  !book.available || isBorrowed
                }
                className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-7 py-4 text-sm font-bold transition-colors sm:w-auto ${
                  book.available && !isBorrowed
                    ? "cursor-pointer bg-[#123D30] text-white hover:bg-[#1C5846]"
                    : "cursor-not-allowed bg-[#F2F0EA] text-[#9B978F]"
                }`}
              >
                <BookMarked size={19} />

                {isBorrowed
                  ? "Already Borrowed"
                  : book.available
                    ? "Borrow Book"
                    : "Currently Unavailable"}
              </button>

              <p className="mt-3 text-xs text-[#A29A90]">
                {isBorrowed
                  ? "This book is already in your demo loans."
                  : "Borrowing is simulated in this frontend prototype."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATION NOTICE */}
      <div className="flex items-start gap-3 rounded-[20px] bg-[#E9F4F0] p-5">
        <Info
          size={20}
          className="mt-0.5 shrink-0 text-[#276C64]"
        />

        <div>
          <h3 className="text-sm font-bold text-[#292929]">
            Library Information
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-[#55736C]">
            This is a prototype library catalogue.
            Book information is currently stored
            locally for demonstration purposes.
            Real-time availability and borrowing
            will be added during backend integration.
          </p>
        </div>
      </div>
    </div>
  );
}
