import React from "react";
import './App.css';
import AllIceCreamsPage from "./Components/AllIceCreamsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from "./Components/LogInPage";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<AllIceCreamsPage />} />
              {/*<Route path="/register" element={<RegisterPage />} />*/}
              <Route path="/login" element={<LogInPage />} />
          </Routes>
      </Router>
  );
}

export default App;
