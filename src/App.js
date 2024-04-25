import React from "react";
import './App.css';
import AllIceCreamsPage from "./Components/AllIceCreamsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from "./Components/LogInPage";
import RegisterPage from "./Components/RegisterPage";
import CartPage from "./Components/CartPage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<AllIceCreamsPage />} />
              <Route path="/registration" element={<RegisterPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/cart" element={<CartPage />} />
          </Routes>
      </Router>
  );
}

export default App
