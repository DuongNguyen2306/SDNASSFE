import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PerfumeDetails from "./pages/PerfumeDetails";
import AdminDashboard from "./pages/AdminDashboard";
import CollectorList from "./pages/CollectorList";
import BrandManagement from "./pages/BrandManagement";
import PerfumeManagement from "./pages/PerfumeManagement";
import { AuthProvider, useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.isAdmin ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/perfume/:id" element={<PerfumeDetails />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/collectors" element={<AdminRoute><CollectorList /></AdminRoute>} />
            <Route path="/admin/brands" element={<AdminRoute><BrandManagement /></AdminRoute>} />
            <Route path="/admin/perfumes" element={<AdminRoute><PerfumeManagement /></AdminRoute>} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
