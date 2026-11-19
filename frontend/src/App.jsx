
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BookCatalogue from "./pages/BookCatalogue";
import BookDetails from "./pages/BookDetails";
import MyLoans from "./pages/MyLoans";
import MyProfile from "./pages/MyProfile";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedBook, setSelectedBook] = useState(null);

  // Open the details page for a selected book
  const openBookDetails = (book) => {
    setSelectedBook(book);
    setActivePage("Book Details");
  };

  // Return to the catalogue
  const backToCatalogue = () => {
    setActivePage("Book Catalogue");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Book Catalogue":
        return (
          <BookCatalogue
            onViewDetails={openBookDetails}
          />
        );

      case "Book Details":
        return selectedBook ? (
          <BookDetails
            book={selectedBook}
            onBack={backToCatalogue}
          />
        ) : (
          <BookCatalogue
            onViewDetails={openBookDetails}
          />
        );

      case "My Loans":
  return <MyLoans />;

      case "My Profile":
  return <MyProfile />;

      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1 min-w-0 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
