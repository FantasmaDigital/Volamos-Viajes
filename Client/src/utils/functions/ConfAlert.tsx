import { Alert } from "@mui/material";
import React from "react";

interface ConfAlertProps {
  statusCode: number | null; // Código de estado, puede ser null si no hay alerta
}

const ConfAlert: React.FC<ConfAlertProps> = ({ statusCode }) => {
  if (statusCode === null) return null; // No renderizar si no hay código de estado

  let severity: "success" | "info" | "warning" | "error" = "info";
  let message = "Algo sucedió, revisa tu acción.";

  switch (statusCode) {
    case 200:
      severity = "success";
      message = "¡Solicitud exitosa!";
      break;
    case 201:
      severity = "success";
      message = "¡Creado exitosamente!";
      break;
    case 400:
      severity = "warning";
      message = "Solicitud incorrecta. Por favor, verifica los datos enviados.";
      break;
    case 500:
      severity = "error";
      message = "Error interno del servidor. Intenta nuevamente más tarde.";
      break;
    default:
      severity = "info";
      message = "Estado no reconocido.";
      break;
  }

  return (
    <div
      className="fixed bottom-4 right-4 shadow-md border border-gray-300 z-50"
      style={{ width: "300px" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};

export default ConfAlert;
