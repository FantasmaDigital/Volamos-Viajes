import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewDestination from "./pages/view/ViewDestination";
import Mundial2026 from "./pages/mundial/Mundial2026";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route index element={<Home />} />

        {/* Rutas dinámicas */}
        <Route path="/view/:destinationName" element={<ViewDestination />} />
        <Route path="/mundial-2026" element={<Mundial2026 />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
