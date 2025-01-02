import React, { useEffect, useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../context/AuthContext";

const GoogleBTN: React.FC<{ text: "signin_with" | "signup_with" | "continue_with" | "signin" }> = ({ text }) => {
  const navigateTo = useNavigate();
  const { setToken, saveUser } = useAuth()
  const [showMessage, setShowMessage] = useState<string>("");
  const [showSeverity, setShowSeverity] = useState<"success" | "error" | "info" | undefined>(undefined);
  const [stateMessage, setStateMessage] = useState<boolean>(false);

  const { postData, loading, dataPost, error } = usePost({
    url: `${import.meta.env.VITE_API_URL}/users/google-auth`,
    body: {},
  });

  const handleGoogleResponse = async (response: CredentialResponse) => {
    const googleToken = response.credential;

    if (googleToken) {
      postData({ googleToken });
    }
  };

  useEffect(() => {
    if (dataPost?.ok) {
      setToken(dataPost.token)
      saveUser(dataPost.user);

      setShowSeverity("success");
      setShowMessage(dataPost.isNewUser ? "Cuenta creada exitosamente con Google." : "Inicio de sesión exitoso con Google.");
      setStateMessage(true);

      setTimeout(() => {
        setStateMessage(false);
        navigateTo("/");
      }, 1500);
    } else if (error) {
      setShowSeverity("error");
      setShowMessage(error);
      setStateMessage(true);
      setTimeout(() => setStateMessage(false), 5000);
    }
  }, [dataPost, error, navigateTo]);

  const handleGoogleFailure = () => {
    setShowSeverity("error");
    setShowMessage("Autenticación con Google fallida. Inténtalo de nuevo.");
    setStateMessage(true);

    setTimeout(() => setStateMessage(false), 5000);
  };

  return (
    <div className="flex flex-col items-center">
      {stateMessage && (
        <div className="shadow-md border mb-4 flex justify-center items-center w-full">
          <Alert severity={showSeverity} className="w-full flex justify-center items-center">
            {showMessage}
          </Alert>
        </div>
      )}

      <GoogleLogin
        onSuccess={handleGoogleResponse}
        onError={handleGoogleFailure}
        useOneTap
        type="standard"
        theme="outline"
        size="large"
        text={text}
        containerProps={{
          className: "w-full shadow-xl",
          style: { minWidth: "100%" }, // Garantiza que el botón ocupe al menos el 100% del ancho.
        }}
      />
      {loading && <p className="text-gray-500 mt-2">Autenticando...</p>}
    </div>
  );
};

export default GoogleBTN;
