import { Heart, BookOpen, ArrowRight } from "lucide-react";

export default function MyWishlist({
  books = [],
  wishlist = [],
  onToggleWishlist,
  onViewDetails,
}) {
  const savedBooks = books.filter((book) =>
    wishlist.includes(String(book.id))
  );

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#A29A90]">
            Your Personal Collection
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#292929]">
            My Wishlist
          </h1>

          <p className="mt-2 text-sm text-[#85817B]">
            Keep track of the books you want to read.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE4E6]">
          <Heart size={27} className="fill-[#E45B65] text-[#E45B65]" />
        </div>
      </header>

      {/* WISHLIST SUMMARY */}
      <section className="rounded-[24px] border border-[#EEEAE4] bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE4E6]">
            <Heart size={23} className="text-[#E45B65]" />
          </div>

          <div>
            <p className="text-sm text-[#85817B]">Saved Books</p>
            <p className="text-2xl font-bold text-[#292929]">
              {savedBooks.length}
            </p>
          </div>
        </div>
      </section>

      {/* SAVED BOOKS */}
      {savedBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {savedBooks.map((book) => (
            <article
              key={book.id}
              className="flex flex-col rounded-[24px] border border-[#EEEAE4] bg-white p-5 transition hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[#F7F5F0] px-3 py-1.5 text-xs font-semibold text-[#A67C28]">
                  {book.category}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleWishlist?.(book.id)}
                  aria-label={`Remove ${book.title} from wishlist`}
                  title="Remove from Wishlist"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE4E6] transition hover:scale-110"
                >
                  <Heart
                    size={20}
                    className="fill-[#E45B65] text-[#E45B65]"
                  />
                </button>
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#292929]">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-[#85817B]">
                  by {book.author}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#85817B]">
                  {book.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#EEEAE4] pt-4">
                <p className="mb-4 text-xs text-[#AAA59D]">
                  ISBN: {book.isbn}
                </p>

                <button
                  type="button"
                  onClick={() => onViewDetails?.(book)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5C96A] py-3 text-sm font-semibold text-[#292929] transition hover:bg-[#E9B950]"
                >
                  View Details
                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-[#EEEAE4] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F5F0]">
            <BookOpen size={30} className="text-[#A29A90]" />
          </div>

          <h2 className="text-xl font-bold text-[#292929]">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-sm text-[#85817B]">
            Explore the catalogue and click the heart icon to save books.
          </p>
        </div>
      )}
    </div>
  );
}
