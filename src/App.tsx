import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";

import EditBook from "./pages/EditBook/EditBook";
import About from "./pages/About/About";
import { useEffect, useState } from "react";
import booksListData from "./components/BooksData/BooksData";

function App() {
  useEffect(() => {
    const storedData = localStorage.getItem("booksListData");
    if (!storedData) {
      localStorage.setItem("booksListData", JSON.stringify(booksListData));
    }
  }, []);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  return (
    <div className="main-card">
      <Router>
        <Header setSearchKeyWord={setSearchKeyWord} />
        <main>
          <Routes>
            <Route path="/" element={<Home searchKeyWord={searchKeyWord} />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/about/:id" element={<About />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
