import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";

import EditBook from "./pages/EditBook/EditBook";
import About from "./pages/About/About";
import { useState } from "react";

function App() {
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
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
