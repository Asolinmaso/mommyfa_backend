import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch for React Router v6
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import SellerRegistrationForm from "@/components/forms/seller-registration-form";
import NotFoundPage from "@/pages/not-found";
import SellerRegistrationPage from "@/pages/seller-registration"; // Ensure this import exists

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/seller/register" element={<SellerRegistrationPage />} /> {/* Ensure this route exists */}
      <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
    </Routes>
  </Router>
);

export default AppRouter;
