import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewDestination from "./pages/view/ViewDestination";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import NewPassword from "./components/NewPassword";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with "/" */}
        <Route index element={<Home />} />

        {/* Protected SignIn and SignUp routes */}
        <Route path="/signin" element={<ProtectedRoute><SignIn /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
        <Route path="/new-password/:token" element={<NewPassword/>} />

        {/* Other routes */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/view/:id" element={<ViewDestination />} />

        {/* Route page not found */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
