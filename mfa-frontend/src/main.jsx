import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import MFASetup from "./components/MFASetup.jsx";
import VerifyTOTP from "./components/VerifyTOTP.jsx";
import Dashboard from "./pages/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup-mfa" element={<MFASetup />} />
        <Route path="/verify-totp" element={<VerifyTOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
