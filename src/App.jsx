import { Routes, Route } from "react-router";

//! Pages:
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

//! Components:
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div data-theme="forest" className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main content area that grows to fill the screen */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="create-note" element={<CreatePage />} />
          <Route path="detail-note/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>

      {/* Sticky footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
