import React from "react"; // Add this import
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calculator from "./components/Calculator/Calculator";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { useAuth, AuthProvider } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) { // Use React.ReactNode instead of JSX.Element
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/calculator" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}