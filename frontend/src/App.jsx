
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { books } from "./data/books";

import Sidebar from "./components/Sidebar";
import AdminSidebar from "./components/AdminSidebar";

import Dashboard from "./pages/Dashboard";
import BookCatalogue from "./pages/BookCatalogue";
import BookDetails from "./pages/BookDetails";
import MyLoans from "./pages/MyLoans";
import MyProfile from "./pages/MyProfile";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageLoans from "./pages/admin/ManageLoans";
import ManageStudents from "./pages/admin/ManageStudents";

const studentRoutes = {
  Dashboard: "/student/dashboard",
  "Book Catalogue": "/student/books",
  "My Loans": "/student/loans",
  "My Profile": "/student/profile",
};

const adminRoutes = {
  "Admin Dashboard": "/admin/dashboard",
  "Manage Books": "/admin/books",
  "Manage Categories": "/admin/categories",
  "Manage Loans": "/admin/loans",
  "Manage Students": "/admin/students",
};

const adminPagesByPath = Object.fromEntries(
  Object.entries(adminRoutes).map(([page, path]) => [path, page])
);

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8",
];

function toLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loans, setLoans] = useState([]);
  const [demoUser, setDemoUser] = useState(null);

  // The URL is the source of truth for navigation.
  const path = location.pathname;

  const isLanding = path === "/";
  const isLogin = path === "/login";
  const isRegister = path === "/register";
  const isAdmin = path.startsWith("/admin");
  const isStudent = path.startsWith("/student");

  const bookDetailsMatch = path.match(
    /^\/student\/books\/([^/]+)\/?$/
  );

  const selectedBookId = bookDetailsMatch?.[1] ?? null;

  const selectedBook = selectedBookId
    ? books.find(
        (book) => String(book.id) === selectedBookId
      )
    : null;

  const studentPage =
    path === "/student/books"
      ? "Book Catalogue"
      : path === "/student/loans"
        ? "My Loans"
        : path === "/student/profile"
          ? "My Profile"
          : selectedBookId
            ? "Book Details"
            : "Dashboard";

  const adminPage =
    adminPagesByPath[path] || "Admin Dashboard";

  // Synchronize availability with active loans.
  const catalogueBooks = books.map((book) => {
    const hasActiveLoan = loans.some(
      (loan) =>
        String(loan.bookId) === String(book.id) &&
        loan.status === "Active"
    );

    return {
      ...book,
      available: Boolean(book.available) && !hasActiveLoan,
    };
  });

  const goHome = () => {
    navigate("/");
  };

  const openLibraryPreview = () => {
    navigate("/student/dashboard");
  };

  const handleLogin = ({ email }) => {
    // Demo authentication only.
    setDemoUser({
      fullName: "BookNest Student",
      email,
    });

    navigate("/student/dashboard");
  };

  const handleRegister = ({ fullName, email }) => {
    // Demo registration only.
    setDemoUser({ fullName, email });

    navigate("/student/dashboard");
  };

  const handleStudentNavigation = (page) => {
    navigate(studentRoutes[page] || "/student/dashboard");
  };

  const handleAdminNavigation = (page) => {
    navigate(adminRoutes[page] || "/admin/dashboard");
  };

  const openBookDetails = (book) => {
    navigate(`/student/books/${book.id}`);
  };

  const backToCatalogue = () => {
    navigate("/student/books");
  };

  const handleBorrow = (book) => {
    if (!book?.available) return;

    const alreadyBorrowed = loans.some(
      (loan) =>
        String(loan.bookId) === String(book.id) &&
        loan.status === "Active"
    );

    if (alreadyBorrowed) return;

    const today = new Date();
    const dueDate = new Date(today);

    dueDate.setDate(dueDate.getDate() + 14);

    const bookIndex = books.findIndex(
      (item) => String(item.id) === String(book.id)
    );

    const newLoan = {
      id: crypto.randomUUID(),
      bookId: book.id,
      title: book.title,
      author: book.author,
      borrowedDate: toLocalDate(today),
      dueDate: toLocalDate(dueDate),
      returnedDate: null,
      status: "Active",
      color:
        bookColors[
          (bookIndex >= 0 ? bookIndex : 0) %
            bookColors.length
        ],
    };

    setLoans((previous) => [
      newLoan,
      ...previous,
    ]);

    navigate("/student/loans");
  };

  const handleReturn = (loanId) => {
    const returnedDate = toLocalDate(new Date());

    setLoans((previous) =>
      previous.map((loan) =>
        loan.id === loanId &&
        loan.status === "Active"
          ? {
              ...loan,
              status: "Returned",
              returnedDate,
            }
          : loan
      )
    );
  };

  const renderStudentPage = () => {
    switch (studentPage) {
      case "Dashboard":
        return (
          <Dashboard
            setActivePage={handleStudentNavigation}
          />
        );

      case "Book Catalogue":
        return (
          <BookCatalogue
            books={catalogueBooks}
            onViewDetails={openBookDetails}
          />
        );

      case "Book Details": {
        const currentBook = catalogueBooks.find(
          (book) =>
            String(book.id) === selectedBookId
        );

        if (!currentBook) {
          return (
            <BookCatalogue
              books={catalogueBooks}
              onViewDetails={openBookDetails}
            />
          );
        }

        const isBorrowed = loans.some(
          (loan) =>
            String(loan.bookId) ===
              String(currentBook.id) &&
            loan.status === "Active"
        );

        return (
          <BookDetails
            book={currentBook}
            onBack={backToCatalogue}
            onBorrow={handleBorrow}
            isBorrowed={isBorrowed}
          />
        );
      }

      case "My Loans":
        return (
          <MyLoans
            loans={loans}
            onReturn={handleReturn}
          />
        );

      case "My Profile":
        return <MyProfile />;

      default:
        return (
          <Dashboard
            setActivePage={handleStudentNavigation}
          />
        );
    }
  };

  const renderAdminPage = () => {
    switch (adminPage) {
      case "Admin Dashboard":
        return <AdminDashboard />;

      case "Manage Books":
        return <ManageBooks />;

      case "Manage Categories":
        return <ManageCategories />;

      case "Manage Loans":
        return <ManageLoans />;

      case "Manage Students":
        return <ManageStudents />;

      default:
        return <AdminDashboard />;
    }
  };

  // Landing page
  if (isLanding) {
    return (
      <LandingPage
        onExplore={openLibraryPreview}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
      />
    );
  }

  // Login page
  if (isLogin) {
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => navigate("/register")}
        onBack={goHome}
      />
    );
  }

  // Registration page
  if (isRegister) {
    return (
      <Register
        onRegister={handleRegister}
        onLogin={() => navigate("/login")}
        onBack={goHome}
      />
    );
  }

  // Admin preview
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex">
        <AdminSidebar
          activePage={adminPage}
          setActivePage={handleAdminNavigation}
          onGoHome={goHome}
        />

        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() =>
                  navigate("/student/dashboard")
                }
                className="bg-white border border-[#EEEAE4] rounded-xl px-4 py-2 text-sm font-semibold text-[#292929] hover:bg-[#F5C96A] transition-colors"
              >
                Switch to Student Preview
              </button>
            </div>

            {renderAdminPage()}
          </div>
        </main>
      </div>
    );
  }

  // Student preview
  if (isStudent) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex">
        <Sidebar
          activePage={studentPage}
          setActivePage={handleStudentNavigation}
          onGoHome={goHome}
        />

        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/dashboard")
                }
                className="bg-[#F5C96A] rounded-xl px-4 py-2 text-sm font-semibold text-[#292929] hover:bg-[#E9BA50] transition-colors"
              >
                Switch to Admin Preview
              </button>
            </div>

            {renderStudentPage()}
          </div>
        </main>
      </div>
    );
  }

  // Unknown URLs return to the landing page.
  return <NavigateToHome navigate={navigate} />;
}

function NavigateToHome({ navigate }) {
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default App;
