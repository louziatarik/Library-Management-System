
export const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "9780132350884",
    available: true,
    description: "A practical guide to writing readable and maintainable code."
  },
  {
    id: 2,
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    isbn: "9781718502703",
    available: true,
    description: "A hands-on introduction to programming with Python."
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen et al.",
    category: "Computer Science",
    isbn: "9780262046305",
    available: false,
    description: "An introduction to algorithms and data structures."
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    category: "Software Engineering",
    isbn: "9780135957059",
    available: true,
    description: "Practical approaches to software development."
  },
  {
    id: 5,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Computer Science",
    isbn: "9781449373320",
    available: true,
    description: "Explores the architecture of reliable and scalable data systems."
  },
  {
    id: 6,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    category: "UI/UX Design",
    isbn: "9780321965516",
    available: false,
    description: "An introduction to intuitive web usability and design."
  }
];

const getBookCover = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

books.forEach((book) => {
  book.cover = getBookCover(book.isbn);
});
