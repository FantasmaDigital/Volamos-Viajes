import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const AppDownloadSection: React.FC = () => {
  return (
    <section
      id="download-app"
      className="w-full bg-gradient-to-b from-primary/10 via-white to-white py-16 px-6 "
    >
      <div className=" w-full sm:w-[80%] md:w-[85%] mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="flex flex-col items-center lg:items-start gap-3">
            <img
              src="/img/app/favicon.jpg"
              alt="Logo Abono Viajes"
              className="w-28 h-28 mb-5 rounded-2xl object-contain drop-shadow-md"
            />
            <p className="uppercase tracking-[0.3em] text-secondary font-semibold">
              Abono Viajes
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-primary leading-tight">
            Reserva tu destino soñado pagando en abonos parciales
          </h2>
          <p className="text-base sm:text-lg text-text">
            Nuestra app móvil <span className="font-semibold text-primary">Abono Viajes</span> te
            ayuda a separar tu paquete ideal y pagarlo a tu ritmo. Define tu meta,
            realiza pagos seguros y recibe alertas para que nada se te escape.
          </p>
          <ul className="text-left text-text space-y-2 inline-block">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
              <span>Elige tu paquete soñado y aparta con pagos flexibles.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
              <span>Monitorea tus avances con recordatorios inteligentes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
              <span>Comparte tu plan con amigos y familia para que aporten.</span>
            </li>
          </ul>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-4">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-secondary to-primary px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" aria-hidden="true"></span>
                <FaGooglePlay className="relative text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="relative text-sm uppercase tracking-wide">Google Play</span>
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-lg border border-secondary px-7 py-3 font-semibold text-secondary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-2xl"
              >
                <span className="absolute inset-0 scale-0 rounded-lg bg-secondary/10 transition-transform duration-300 group-hover:scale-100" aria-hidden="true"></span>
                <FaApple className="relative text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="relative text-sm uppercase tracking-wide">App Store</span>
              </a>
            </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative flex justify-center">
            <img
              src="/img/app/av-1.jpeg"
              alt="Pantalla principal de Abono Viajes"
              className="w-64 sm:w-72 lg:w-80 rounded-[2.5rem] shadow-2xl border border-white/40 object-cover"
            />
            <img
              src="/img/app/av-2.jpeg"
              alt="Historial de aportes en Abono Viajes"
              className="hidden sm:block w-56 sm:w-64 lg:w-72 rounded-[2.5rem] shadow-xl border border-white/40 absolute -right-6 sm:-right-12 top-10 rotate-6 object-cover"
            />
            <div className="absolute -bottom-10 sm:-bottom-14 left-1/2 -translate-x-1/2 sm:-translate-x-24 bg-white border border-gray-100 rounded-2xl shadow-xl px-6 py-4 w-[260px] sm:w-[280px]">
              <p className="text-sm font-semibold text-primary mb-1">Progreso de tu viaje</p>
              <p className="text-xs text-gray-500 mb-3">Cancún todo incluido · Meta $2,400</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Abonado</span>
                <span className="text-primary font-semibold">$1,488</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
