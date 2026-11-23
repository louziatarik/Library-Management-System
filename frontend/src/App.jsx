
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  registerStudent,
  loginDemo,
  saveDemoSession,
  getDemoSession,
} from "./services/demoAuth";
import { books } from "./data/books";
import { fetchBooks } from "./services/booksApi";
import {
  getStudentLoans,
  saveStudentLoans,
} from "./services/demoLoans";
import Sidebar from "./components/Sidebar";
import AdminSidebar from "./components/AdminSidebar";

import Dashboard from "./pages/Dashboard";
import BookCatalogue from "./pages/BookCatalogue";
import BookDetails from "./pages/BookDetails";
import MyLoans from "./pages/MyLoans";
import MyProfile from "./pages/MyProfile";

import LandingPage from "./pages/LandingPage";
import PublicLibrary from "./pages/PublicLibrary";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageLoans from "./pages/admin/ManageLoans";
import ManageStudents from "./pages/admin/ManageStudents";

// ----------------------------------
// ROUTES
// ----------------------------------

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
  Object.entries(adminRoutes).map(([page, path]) => [
    path,
    page,
  ])
);

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8",
];

// ----------------------------------
// HELPERS
// ----------------------------------

function toLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ----------------------------------
// PUBLIC BOOK DETAILS
// ----------------------------------

function PublicBookDetails({
  book,
  onBack,
  onLogin,
  onRegister,
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <header className="bg-white border-b border-[#EEEAE4]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 text-[#292929]"
          >
            <div className="w-11 h-11 bg-[#F5C96A] rounded-xl flex items-center justify-center">
              <BookOpen size={23} />
            </div>

            <span className="text-xl font-extrabold">
              BookNest
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EEEAE4] rounded-xl text-sm font-semibold text-[#292929]"
            >
              <LogIn size={17} />
              Login
            </button>

            <button
              type="button"
              onClick={onRegister}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F5C96A] rounded-xl text-sm font-semibold text-[#292929]"
            >
              <UserPlus size={17} />
              Register
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#625B55] hover:text-[#292929] mb-8"
        >
          <ArrowLeft size={18} />
          Back to Library
        </button>

        <div className="bg-white border border-[#EEEAE4] rounded-[28px] p-6 md:p-10">
          <div className="grid md:grid-cols-[280px_1fr] gap-10">
            
<div className="bg-[#D8EDE8] rounded-[24px] min-h-80 flex items-center justify-center p-8">
  <img
    src={
      book.cover ||
      (book.isbn
        ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
        : "")
    }
    alt={`Cover of ${book.title}`}
    className="max-h-72 max-w-full object-contain rounded-sm shadow-2xl"
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src =
        "https://placehold.co/240x340/F7F5F0/292929?text=Book+Cover";
    }}
  />
</div>

            <div>
              <span className="text-sm font-bold text-[#A67C28]">
                {book.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[#292929] mt-3">
                {book.title}
              </h1>

              <p className="text-[#85817B] mt-3">
                by {book.author}
              </p>

              <span
                className={`inline-block mt-6 px-4 py-2 rounded-full text-sm font-bold ${
                  book.available
                    ? "bg-[#E4F5EB] text-[#27816B]"
                    : "bg-[#FFF0E5] text-[#C17742]"
                }`}
              >
                {book.available
                  ? "Available"
                  : "Borrowed"}
              </span>

              <h2 className="text-lg font-bold text-[#292929] mt-8">
                About this book
              </h2>

              <p className="text-[#625B55] leading-relaxed mt-3">
                {book.description}
              </p>

              <p className="text-sm text-[#85817B] mt-6">
                ISBN: {book.isbn}
              </p>

              <div className="bg-[#FFF4D6] border border-[#F3E1AE] rounded-2xl p-5 mt-8">
                <p className="font-bold text-[#292929]">
                  Want to borrow this book?
                </p>

                <p className="text-sm text-[#76694D] mt-2">
                  Sign in with your student account
                  to borrow books.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">
                  <button
                    type="button"
                    onClick={onLogin}
                    className="bg-[#292929] text-white px-6 py-3 rounded-xl text-sm font-semibold"
                  >
                    Student Login
                  </button>

                  <button
                    type="button"
                    onClick={onRegister}
                    className="bg-[#F5C96A] text-[#292929] px-6 py-3 rounded-xl text-sm font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ----------------------------------
// MAIN APP
// ----------------------------------

function App() {
  const navigate = useNavigate();
  const location = useLocation();

 const [demoUser, setDemoUser] = useState(getDemoSession);

const [loans, setLoans] = useState(() => {
  const user = getDemoSession();
  return user?.role === "student"
    ? getStudentLoans(user.id)
    : [];
});


const [apiBooks, setApiBooks] = useState([]);

useEffect(() => {
  let active = true;

  async function loadBooks() {
    try {
      const result = await fetchBooks();

      if (active) {
        setApiBooks(result);
        console.log("BookNest API books loaded:", result.length);
      }
    } catch (error) {
      console.warn("BookNest API unavailable:", error.message);
    }
  }

  loadBooks();

  return () => {
    active = false;
  };
}, []);

const libraryBooks = apiBooks.length > 0 ? apiBooks : books;
  const path = location.pathname;
  const query = new URLSearchParams(location.search);
const roleSelectionMode =
  query.get("mode") === "register" ? "register" : "login";
  const requestedRole =
    query.get("role") === "admin"
      ? "admin"
      : "student";

  const isLanding = path === "/";
  const isRoleSelection = path === "/choose-role";
  const isLogin = path === "/login";
  const isRegister = path === "/register";
  const isExplore = path === "/explore";

  const isAdmin = path.startsWith("/admin");
  const isStudent = path.startsWith("/student");

  const publicBookMatch = path.match(
    /^\/explore\/books\/([^/]+)\/?$/
  );

  const studentBookMatch = path.match(
    /^\/student\/books\/([^/]+)\/?$/
  );

  const publicBookId =
    publicBookMatch?.[1] ?? null;

  const studentBookId =
    studentBookMatch?.[1] ?? null;

  // ----------------------------------
  // CURRENT PAGES
  // ----------------------------------

  const studentPage =
    path === "/student/books"
      ? "Book Catalogue"
      : path === "/student/loans"
        ? "My Loans"
        : path === "/student/profile"
          ? "My Profile"
          : studentBookId
            ? "Book Details"
            : "Dashboard";

  const adminPage =
    adminPagesByPath[path] || "Admin Dashboard";

  // ----------------------------------
  // BOOK AVAILABILITY
  // ----------------------------------

  const catalogueBooks = libraryBooks.map((book) => {
    const hasActiveLoan = loans.some(
      (loan) =>
        String(loan.bookId) === String(book.id) &&
        loan.status === "Active"
    );

    return {
      ...book,
      available:
        Boolean(book.available) && !hasActiveLoan,
    };
  });

  const publicBook = publicBookId
    ? catalogueBooks.find(
        (book) =>
          String(book.id) === publicBookId
      )
    : null;

  // ----------------------------------
  // NAVIGATION
  // ----------------------------------

  
const openRoleSelection = (mode = "login") => {
  navigate(
    mode === "register"
      ? "/choose-role?mode=register"
      : "/choose-role"
  );
};

const openStudentLogin = () => {
  navigate("/login?role=student");
};

const openAdminLogin = () => {
  navigate("/login?role=admin");
};

const openAdminRegister = () => {
  navigate("/register?role=admin");
};

const openStudentRegister = () => {
  navigate("/register");
};


const openCreateAccount = () => {
  openRoleSelection("register");
};

const openPublicLibrary = () => {
  navigate("/explore");
};

const goHome = () => {
  navigate("/");
};


  // ----------------------------------
  // DEMO AUTHENTICATION
  // ----------------------------------

  
const handleLogin = ({ email, password }) => {
  const role = requestedRole;

  const result = loginDemo({
    email,
    password,
    role,
  });

  if (result.error) {
    return { error: result.error };
  }

  setDemoUser(result.user);
saveDemoSession(result.user);
setLoans(
  result.user.role === "student"
    ? getStudentLoans(result.user.id)
    : []
);
  if (result.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/student/dashboard");
  }

  return { success: true };
};


  

const handleRegister = ({
  fullName,
  email,
  password,
  role = "student",
}) => {
  // Administrator registration requires backend approval.
  // Never create an active administrator through demoAuth.
  if (role === "admin") {
    return {
      error:
        "Administrator registration is not available until the backend approval system is connected.",
    };
  }

  if (role !== "student") {
    return { error: "Invalid account type." };
  }

  const result = registerStudent({
    fullName,
    email,
    password,
  });

  if (result.error) {
    return { error: result.error };
  }

  setDemoUser(result.user);
saveDemoSession(result.user);

// Load this student's demo borrowing history.
setLoans(getStudentLoans(result.user.id));

navigate("/student/dashboard");

  return { success: true };
};



  const handleStudentNavigation = (page) => {
    navigate(
      studentRoutes[page] || "/student/dashboard"
    );
  };

  const handleAdminNavigation = (page) => {
    navigate(
      adminRoutes[page] || "/admin/dashboard"
    );
  };

  const openBookDetails = (book) => {
    navigate(`/student/books/${book.id}`);
  };

  const backToCatalogue = () => {
    navigate("/student/books");
  };

  // ----------------------------------
  // BORROW BOOK
  // ----------------------------------

  const handleBorrow = (book) => {
    if (!demoUser || demoUser.role !== "student") {
      openStudentLogin();
      return;
    }

    if (!book?.available) return;

    const alreadyBorrowed = loans.some(
      (loan) =>
        String(loan.bookId) ===
          String(book.id) &&
        loan.status === "Active"
    );

    if (alreadyBorrowed) return;

    const today = new Date();
    const dueDate = new Date(today);

    dueDate.setDate(
      dueDate.getDate() + 14
    );

    const bookIndex = libraryBooks.findIndex(
      (item) =>
        String(item.id) === String(book.id)
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

    setLoans((previous) => {
  const updatedLoans = [
    newLoan,
    ...previous,
  ];

  saveStudentLoans(demoUser.id, updatedLoans);

    return updatedLoans;
});

navigate("/student/loans");
};

// ----------------------------------
// RETURN BOOK
// ----------------------------------

  const handleReturn = (loanId) => {
    if (!demoUser || demoUser.role !== "student") {
      return;
    }

    const returnedDate =
      toLocalDate(new Date());

    
setLoans((previous) => {
  const updatedLoans = previous.map((loan) =>
    loan.id === loanId && loan.status === "Active"
      ? {
          ...loan,
          status: "Returned",
          returnedDate,
        }
      : loan
  );

  saveStudentLoans(demoUser.id, updatedLoans);

  return updatedLoans;
});

  };

  // ----------------------------------
  // STUDENT PAGES
  // ----------------------------------

  const renderStudentPage = () => {
    switch (studentPage) {
      case "Dashboard":
        return (
          <Dashboard
            setActivePage={
              handleStudentNavigation
            }
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
        const currentBook =
          catalogueBooks.find(
            (book) =>
              String(book.id) ===
              studentBookId
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
            setActivePage={
              handleStudentNavigation
            }
          />
        );
    }
  };

  // ----------------------------------
  // ADMIN PAGES
  // ----------------------------------

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

  // ----------------------------------
  // 1. LANDING PAGE
  // ----------------------------------

  if (isLanding) {
    return (
      <LandingPage
        onExplore={openPublicLibrary}
        onLogin={openRoleSelection}
        onRegister={openCreateAccount}
      />
    );
  }

  // ----------------------------------
  // 2. ROLE SELECTION
  // ----------------------------------

  
if (isRoleSelection) {
  return (
    <RoleSelection
      mode={roleSelectionMode}
      onStudent={
        roleSelectionMode === "register"
          ? openStudentRegister
          : openStudentLogin
      }
      onAdmin={
  roleSelectionMode === "register"
    ? openAdminRegister
    : openAdminLogin
}
      onBack={goHome}
    />
  );
}


  // ----------------------------------
  // 3. PUBLIC LIBRARY
  // ----------------------------------

  if (isExplore) {
    return (
      <PublicLibrary
        books={catalogueBooks}
        onHome={goHome}
        onLogin={openRoleSelection}
        onRegister={openCreateAccount}
        onViewDetails={(book) =>
          navigate(
            `/explore/books/${book.id}`
          )
        }
      />
    );
  }

  // ----------------------------------
  // 4. PUBLIC BOOK DETAILS
  // ----------------------------------

  if (publicBookId) {
    if (!publicBook) {
      return (
        <PublicLibrary
          books={catalogueBooks}
          onHome={goHome}
          onLogin={openRoleSelection}
          onRegister={openCreateAccount}
          onViewDetails={(book) =>
            navigate(
              `/explore/books/${book.id}`
            )
          }
        />
      );
    }

    return (
      <PublicBookDetails
        book={publicBook}
        onBack={openPublicLibrary}
        onLogin={openStudentLogin}
        onRegister={openCreateAccount}
      />
    );
  }

  // ----------------------------------
  // 5. LOGIN
  // ----------------------------------

  if (isLogin) {
  return (
    <Login
      role={requestedRole}
      onLogin={handleLogin}
      onRegister={openCreateAccount}
      onBack={openRoleSelection}
    />
  );
}
  // ----------------------------------
  // 6. REGISTER
  // ----------------------------------

  
if (isRegister) {
  return (
    <Register
      role={requestedRole}
      onRegister={handleRegister}
      onLogin={openRoleSelection}
      onBack={goHome}
    />
  );
}


  // ----------------------------------
  // 7. STUDENT AREA
  // ----------------------------------

  if (isStudent) {
    if (
      !demoUser ||
      demoUser.role !== "student"
    ) {
      return (
        <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-5 text-center">
          <GraduationAccessMessage
            onLogin={openStudentLogin}
            onExplore={openPublicLibrary}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F7F5F0] flex">
        <Sidebar
          activePage={studentPage}
          setActivePage={
            handleStudentNavigation
          }
          onGoHome={goHome}
        />

        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {renderStudentPage()}
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------
  // 8. ADMIN AREA
  // ----------------------------------

  if (isAdmin) {
    if (
      !demoUser ||
      demoUser.role !== "admin"
    ) {
      return (
        <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-5 text-center">
          <AdminAccessMessage
            onLogin={openAdminLogin}
            onHome={goHome}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F7F5F0] flex">
        <AdminSidebar
          activePage={adminPage}
          setActivePage={
            handleAdminNavigation
          }
          onGoHome={goHome}
        />

        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {renderAdminPage()}
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------
  // 9. NOT FOUND
  // ----------------------------------

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center px-5 text-center">
      <BookOpen
        size={48}
        className="text-[#D3A843] mb-5"
      />

      <h1 className="text-3xl font-extrabold text-[#292929]">
        Page Not Found
      </h1>

      <p className="text-[#85817B] mt-3">
        The page you're looking for
        doesn't exist.
      </p>

      <button
        type="button"
        onClick={goHome}
        className="mt-6 bg-[#F5C96A] px-6 py-3 rounded-xl font-semibold text-[#292929]"
      >
        Return Home
      </button>
    </div>
  );
}

// ----------------------------------
// ACCESS MESSAGES
// ----------------------------------

function GraduationAccessMessage({
  onLogin,
  onExplore,
}) {
  return (
    <>
      <BookOpen
        size={45}
        className="text-[#D3A843] mb-5"
      />

      <h1 className="text-2xl font-extrabold text-[#292929]">
        Student Login Required
      </h1>

      <p className="text-[#85817B] mt-3 max-w-md">
        Please sign in with your student
        account to access your dashboard
        and manage borrowed books.
      </p>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onLogin}
          className="bg-[#F5C96A] px-6 py-3 rounded-xl font-semibold text-[#292929]"
        >
          Student Login
        </button>

        <button
          type="button"
          onClick={onExplore}
          className="bg-white border border-[#EEEAE4] px-6 py-3 rounded-xl font-semibold text-[#292929]"
        >
          Explore Books
        </button>
      </div>
    </>
  );
}

function AdminAccessMessage({
  onLogin,
  onHome,
}) {
  return (
    <>
      <BookOpen
        size={45}
        className="text-[#D3A843] mb-5"
      />

      <h1 className="text-2xl font-extrabold text-[#292929]">
        Administrator Access
      </h1>

      <p className="text-[#85817B] mt-3 max-w-md">
        This area is reserved for
        administrator accounts.
      </p>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onLogin}
          className="bg-[#F5C96A] px-6 py-3 rounded-xl font-semibold text-[#292929]"
        >
          Admin Login
        </button>

        <button
          type="button"
          onClick={onHome}
          className="bg-white border border-[#EEEAE4] px-6 py-3 rounded-xl font-semibold text-[#292929]"
        >
          Back Home
        </button>
      </div>
    </>
  );
}

export default App;
