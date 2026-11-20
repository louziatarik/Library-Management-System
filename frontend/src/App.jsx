
import { useState } from "react";

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

function App() {
  // Available screens: landing, login, register, library
  const [screen, setScreen] = useState("landing");

  // Student navigation
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedBook, setSelectedBook] = useState(null);

  // Development-only role preview
  const [previewRole, setPreviewRole] = useState("student");

  // Admin navigation
  const [adminPage, setAdminPage] = useState("Admin Dashboard");

  // Temporary demo account information (not real authentication)
  const [demoUser, setDemoUser] = useState(null);

  const goHome = () => {
    setScreen("landing");
  };

  const openLibraryPreview = () => {
    setScreen("library");
  };

  const handleLogin = ({ email }) => {
    // Frontend demonstration only.
    // Any nonempty email/password accepted by Login.jsx.
    setDemoUser({
      fullName: "BookNest Student",
      email,
    });

    setPreviewRole("student");
    setActivePage("Dashboard");
    setScreen("library");
  };

  const handleRegister = ({ fullName, email }) => {
    // Frontend demonstration only.
    // No real account is created or password stored.
    setDemoUser({ fullName, email });
    setPreviewRole("student");
    setActivePage("Dashboard");
    setScreen("library");
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setActivePage("Book Details");
  };

  const backToCatalogue = () => {
    setActivePage("Book Catalogue");
  };

  const renderStudentPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Book Catalogue":
        return <BookCatalogue onViewDetails={openBookDetails} />;

      case "Book Details":
        return selectedBook ? (
          <BookDetails
            book={selectedBook}
            onBack={backToCatalogue}
          />
        ) : (
          <BookCatalogue onViewDetails={openBookDetails} />
        );

      case "My Loans":
        return <MyLoans />;

      case "My Profile":
        return <MyProfile />;

      default:
        return <Dashboard setActivePage={setActivePage} />;
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

  // Landing Page
  if (screen === "landing") {
    return (
      <LandingPage
        onExplore={openLibraryPreview}
        onLogin={() => setScreen("login")}
        onRegister={() => setScreen("register")}
      />
    );
  }

  // Login Page
  if (screen === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setScreen("register")}
        onBack={goHome}
      />
    );
  }

  // Registration Page
  if (screen === "register") {
    return (
      <Register
        onRegister={handleRegister}
        onLogin={() => setScreen("login")}
        onBack={goHome}
      />
    );
  }

  // Admin Preview
  if (previewRole === "admin") {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex">
        <AdminSidebar
          activePage={adminPage}
          setActivePage={setAdminPage}
          onGoHome={goHome}
        />

        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setPreviewRole("student")}
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

  // Student Preview
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onGoHome={goHome}
      />

      <main className="flex-1 min-w-0 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setPreviewRole("admin")}
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

export default App;
