import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewDestination from "./pages/view/ViewDestination";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import NewPassword from "./components/NewPassword";

const App: React.FC = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        {/* Ruta principal */}
        <Route index element={<Home />} />

        {/* Rutas de autenticación */}
        <Route path="/signin" element={<ProtectedRoute><SignIn /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />

        {/* Rutas dinámicas */}
        <Route path="/view/:destinationName" element={<ViewDestination />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;