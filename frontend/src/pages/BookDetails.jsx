
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Tag,
  Hash,
  CheckCircle2,
  Clock3,
  BookMarked,
  Info
} from "lucide-react";

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8"
];

export default function BookDetails({
  book,
  onBack,
  onBorrow,
  isBorrowed = false,
}) {
  if (!book) {
    return (
      <div className="bg-white rounded-[24px] p-10 text-center">
        <h2 className="text-xl font-bold text-[#292929]">
          Book not found
        </h2>

        <button
          onClick={onBack}
          className="mt-5 bg-[#F5C96A] px-5 py-3 rounded-xl font-semibold"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const colorIndex = Math.max(0, Number(book.id) - 1);
  const background = bookColors[colorIndex % bookColors.length];

  return (
    <div className="space-y-7">

      {/* BACK NAVIGATION */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[#85817B] hover:text-[#292929] font-semibold text-sm transition"
      >
        <ArrowLeft size={18} />
        Back to Catalogue
      </button>

      {/* PAGE HEADING */}
      <div>
        <p className="text-[#A29A90] text-sm font-medium">
          Library Collection / Book Details
        </p>

        <h1 className="text-3xl font-bold text-[#292929] mt-2">
          Book Details
        </h1>

        <p className="text-[#85817B] text-sm mt-2">
          Explore information about this book.
        </p>
      </div>

      {/* MAIN DETAILS CARD */}
      <div className="bg-white border border-[#EEEAE4] rounded-[28px] p-5 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* BOOK COVER */}
          <div
            style={{ backgroundColor: background }}
            className="min-h-[390px] rounded-[24px] relative overflow-hidden flex items-center justify-center p-8"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/20" />

            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/20" />

            <div className="relative w-48 h-64 bg-white/80 rounded-r-xl rounded-l-sm shadow-2xl border-l-[10px] border-[#292929]/20 flex flex-col items-center justify-center p-6 text-center rotate-[-4deg]">
              <BookOpen
                size={44}
                className="text-[#292929] mb-6"
              />

              <h2 className="text-lg font-extrabold text-[#292929] leading-tight">
                {book.title}
              </h2>

              <p className="text-xs text-[#625B55] mt-4">
                {book.author}
              </p>
            </div>
          </div>

          {/* BOOK INFORMATION */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#F9E8B5] text-[#87651F] px-4 py-2 rounded-full text-xs font-bold">
                {book.category}
              </span>

              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
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

                {book.available ? "Available" : "Borrowed"}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#292929] mt-6 leading-tight">
              {book.title}
            </h2>

            <p className="text-lg text-[#85817B] mt-3">
              by {book.author}
            </p>

            {/* METADATA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-[#F7F5F0] rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#85817B] text-xs mb-2">
                  <UserRound size={16} />
                  Author
                </div>

                <p className="font-bold text-[#292929] text-sm">
                  {book.author}
                </p>
              </div>

              <div className="bg-[#F7F5F0] rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#85817B] text-xs mb-2">
                  <Tag size={16} />
                  Category
                </div>

                <p className="font-bold text-[#292929] text-sm">
                  {book.category}
                </p>
              </div>

              <div className="bg-[#F7F5F0] rounded-2xl p-4 sm:col-span-2">
                <div className="flex items-center gap-2 text-[#85817B] text-xs mb-2">
                  <Hash size={16} />
                  ISBN
                </div>

                <p className="font-bold text-[#292929] text-sm">
                  {book.isbn}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#292929]">
                About This Book
              </h3>

              <p className="text-[#777D78] text-sm leading-7 mt-3">
                {book.description}
              </p>
            </div>

           {/* BORROW BUTTON */}
<div className="mt-auto pt-8">
  <button
    type="button"
    onClick={() => onBorrow?.(book)}
    disabled={!book.available || isBorrowed}
    className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-bold text-sm transition-colors ${
      book.available && !isBorrowed
        ? "bg-[#123D30] text-white hover:bg-[#1C5846] cursor-pointer"
        : "bg-[#F2F0EA] text-[#9B978F] cursor-not-allowed"
    }`}
  >
    <BookMarked size={19} />

    {isBorrowed
      ? "Already Borrowed"
      : book.available
        ? "Borrow Book"
        : "Currently Unavailable"}
  </button>

  <p className="text-xs text-[#A29A90] mt-3">
    {isBorrowed
      ? "This book is already in your demo loans."
      : "Borrowing is simulated in this frontend prototype."}
  </p>
</div>

          </div>
        </div>
      </div>

      {/* INFORMATION NOTICE */}
      
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info
          size={20}
          className="text-[#276C64] shrink-0 mt-0.5"
        />

        <div>
          <h3 className="text-sm font-bold text-[#292929]">
            Library Information
          </h3>

          <p className="text-sm text-[#55736C] mt-1 leading-relaxed">
            This is a prototype library catalogue. Book information
            is currently stored locally for demonstration purposes.
            Real-time availability and borrowing will be added
            during backend integration.
          </p>
        </div>
      </div>
    </div>
  );
}
