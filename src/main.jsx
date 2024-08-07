import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserProvider.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
          <Toaster position="top-center" />
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
