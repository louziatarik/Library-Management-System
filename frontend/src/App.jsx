
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BookCatalogue from "./pages/BookCatalogue";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Book Catalogue":
  return <BookCatalogue />;

      case "My Loans":
        return (
          <h1 className="text-3xl font-bold text-white">
            My Loans — Coming Soon
          </h1>
        );

      case "My Profile":
        return (
          <h1 className="text-3xl font-bold text-white">
            My Profile — Coming Soon
          </h1>
        );

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
