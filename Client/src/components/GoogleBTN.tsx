import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const GoogleBTN: React.FC<{text:"signin_with" | "signup_with" | "continue_with" | "signin"}> = ({text}) => {
  const navigateTo = useNavigate();
  const [showMessage, setShowMessage] = React.useState<string>("");
  const [showSeverity, setShowSeverity] = React.useState<"success" | "error" | "info" | undefined>(undefined);
  const [stateMessage, setStateMessage] = React.useState<boolean>(false);

  const handleGoogleResponse = async (response: CredentialResponse) => {
    const googleToken = response.credential;

    try {
      // Enviar los datos al backend
      fetch(`${import.meta.env.VITE_API_URL}/users/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            Cookies.set("authToken", data.token, {
              expires: 1 / 24,
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            localStorage.setItem("user", JSON.stringify(data.user));

            setShowSeverity("success");
            setShowMessage(data.isNewUser ? "Cuenta creada exitosamente con Google." : "Inicio de sesión exitoso con Google.");
            setStateMessage(true);

            setTimeout(() => {
              setStateMessage(false);
              navigateTo("/");
            }, 1500);
          } else {
            setShowSeverity("error");
            setShowMessage("Error al autenticar con Google.");
            setStateMessage(true);
            setTimeout(() => setStateMessage(false), 5000);
          }
        });
    } catch (error) {
      console.error("Error al obtener datos de Google:", error);
      setShowSeverity("error");
      setShowMessage("No se pudo autenticar con Google. Inténtalo de nuevo.");
      setStateMessage(true);

      setTimeout(() => setStateMessage(false), 5000);
    }
  };

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
            className: 'w-full shadow-xl',
        }}
      />
    </div>
  );
};

export default GoogleBTN;
