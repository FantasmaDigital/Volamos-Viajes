import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewDestination from "./pages/view/ViewDestination";
import Visas from "./pages/visas/Visas";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route index element={<Home />} />

        {/* Rutas dinámicas */}
        <Route path="/view/:destinationName" element={<ViewDestination />} />
        <Route path="/visas" element={<Visas />} />
        {/* El Mundial 2026 ya pasó: los enlaces viejos llevan a Visas */}
        <Route path="/mundial-2026" element={<Navigate to="/visas" replace />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
