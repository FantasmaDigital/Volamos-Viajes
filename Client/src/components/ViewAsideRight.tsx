import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputsAppointment } from '../interface/forms.interface';
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import Paragraph from "../utils/Paragraph";
import { ERROR_ALERT, SUCCESS_ALERT } from "../utils/Alets";
import emailjs from "emailjs-com";

// Definición del tipo para los campos
interface FormField {
  id: 'destination' | 'name' | 'email' | 'phone';
  label: string;
  type: string;
  placeholder: string;
  validation: Record<string, any>;
}

interface PropsViewAsideRight {
  destination: string;
}

const ViewAsideRight: React.FC<PropsViewAsideRight> = ({ destination }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputsAppointment>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const onSubmit: SubmitHandler<FormInputsAppointment> = (data) => {
    setIsSubmitting(true);

    // Configuración de EmailJS
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID, // Reemplaza con tu ID de servicio de EmailJS
        import.meta.env.VITE_TEMPLATE_ID_2,
        {
          destination: data.destination,
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        import.meta.env.VITE_USER_ID
      )
      .then(() => {
        setIsSubmitting(false);
        setFormSubmitted(true);
        reset(); // Restablecer el formulario
        SUCCESS_ALERT("Tu solicitud fue enviada con éxito.");
      })
      .catch(() => {
        setIsSubmitting(false);
        ERROR_ALERT("Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.");
      });
  };

  const getInputClasses = (hasError: boolean) => {
    return `w-full p-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${hasError ? "border border-red-500" : "border-none shadow-md"}`;
  };

  // Definición de los campos del formulario con validación de correo
  const fields: FormField[] = [
    { id: 'name', label: 'Nombres', type: 'text', placeholder: 'Ingresa tu nombre completo', validation: { required: 'Los nombres son obligatorios' } },
    {
      id: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      placeholder: 'Ingresa tu correo',
      validation: {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Por favor, ingresa un correo electrónico válido'
        }
      }
    },
    { id: 'phone', label: 'Número de Teléfono', type: 'tel', placeholder: 'Ingresa tu número', validation: { required: 'El teléfono es obligatorio' } }
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 shadow-2xl px-6 py-6 rounded-md">
        <Titles text="Agendar Solicitud" type={titles.SUBTITLE} styles="text-center my-0" />

        {/* Input oculto para la destinación */}
        <input type="hidden" value={destination} {...register('destination')} />

        {/* Mapeo de los campos */}
        {fields.map(({ id, label, type, placeholder, validation }) => (
          <div className="flex flex-col gap-2" key={id}>
            <label className="text-lg font-semibold" htmlFor={id}>{label}:</label>
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              {...register(id, validation)}
              className={getInputClasses(!!errors[id]?.message)}
            />
            {errors[id] && <span className="text-red-500">{errors[id]?.message}</span>}
          </div>
        ))}

        {/* Botón de envío */}
        <button type="submit" className="py-3 px-4 rounded-md bg-primary text-white font-semibold hover:bg-secondary transition-all duration-300 ease-in-out" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>

      {/* Mostrar mensaje de éxito si el formulario fue enviado */}
      {formSubmitted && (
        <div className="mt-4">
          {SUCCESS_ALERT('Tu solicitud fue enviada con éxito.')}
        </div>
      )}

      {/* Información Adicional */}
      <div className="mt-8 p-4 bg-gray-100 shadow-2xl rounded-md">
        <Titles text="Información Adicional" type={titles.DESCRIPTION} />
        <Paragraph paragraph="Nuestro equipo te contactará para completar los detalles de tu viaje. Asegúrate de proporcionar un correo y teléfono válidos." />
        <ul className="pl-5 mt-2 text-gray-600 space-y-2 text-base">
          <li><Paragraph paragraph="Tiempo de respuesta: 24 a 48 horas." /></li>
          <li><Paragraph paragraph="Requisitos especiales: Háganos saber si tienes alguna solicitud especial." /></li>
          <li><Paragraph paragraph="Soporte: Contacta nuestro servicio de soporte para más información." /></li>
        </ul>
      </div>
    </>
  );
}

export default ViewAsideRight;
