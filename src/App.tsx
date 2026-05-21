import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

// Layouts
import { RootLayout } from "./layouts/RootLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Customer Pages
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { AdminLogin } from "./pages/AdminLogin";
import { AboutUs } from "./pages/AboutUs";
import { Gallery } from "./pages/Gallery";
import { Contact } from "./pages/Contact";

// Admin Pages
import { AdminDashboard } from "./pages/AdminDashboard";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";
import { Categories } from "./pages/Categories";
import { Settings } from "./pages/Settings";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Customer Routes - no login page visible here */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Secret Admin Login - hidden from customers */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin Panel Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="categories" element={<Categories />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Redirect old /login to home so customers don't find it */}
            <Route path="/login" element={<Navigate to="/" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
};
export default App;
