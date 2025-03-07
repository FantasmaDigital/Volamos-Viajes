import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { LocationProvider } from './context/guide/LocationContext.tsx';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>    <LocationProvider>
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
    </LocationProvider>
    </HelmetProvider>
  </StrictMode>,
)
