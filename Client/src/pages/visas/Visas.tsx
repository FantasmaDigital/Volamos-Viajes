import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  FiMessageCircle,
  FiFileText,
  FiCalendar,
  FiUserCheck,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollTopBtn";
import WhatsAppBtn from "../../components/WhatsAppBtn";
import SEO from "../../conf/SEO";
import { WA_URI } from "../../constants/URIS";
import { scrollToTop } from "../../utils/functions/topScroll";

interface VisaType {
  country: string;
  flag: string;
  description: string;
  services: string[];
}

const visas: VisaType[] = [
  {
    country: "Estados Unidos",
    flag: "🇺🇸",
    description: "Visa de turismo y negocios (B1/B2), primera vez y renovaciones.",
    services: ["Llenado del formulario DS-160", "Agendamiento de cita", "Preparación para la entrevista"],
  },
  {
    country: "Canadá",
    flag: "🇨🇦",
    description: "Visa de visitante y permisos electrónicos de viaje.",
    services: ["Solicitud en línea", "Revisión de documentos", "Toma de biométricos"],
  },
  {
    country: "México",
    flag: "🇲🇽",
    description: "Visa de turista para conocer México o hacer escala.",
    services: ["Formulario consular", "Cita en el consulado", "Lista de requisitos"],
  },
  {
    country: "China",
    flag: "🇨🇳",
    description: "Visa de turismo y negocios con gestión ante la embajada.",
    services: ["Formulario de solicitud", "Gestión de cita", "Entrega y retiro de pasaporte"],
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    description: "Visa de visitante para turismo o visita familiar.",
    services: ["Solicitud en línea", "Carga de documentos", "Seguimiento del trámite"],
  },
  {
    country: "Reino Unido",
    flag: "🇬🇧",
    description: "Visa estándar de visitante para Inglaterra, Escocia y más.",
    services: ["Solicitud en línea", "Cita de biométricos", "Revisión de documentos"],
  },
];

const steps = [
  {
    icon: FiMessageCircle,
    title: "Asesoría por WhatsApp",
    text: "Cuéntanos a dónde quieres viajar y te decimos qué visa necesitas y qué documentos preparar.",
  },
  {
    icon: FiFileText,
    title: "Llenamos tu formulario",
    text: "Nuestro equipo completa la solicitud contigo para evitar errores que retrasen el trámite.",
  },
  {
    icon: FiCalendar,
    title: "Agendamos tu cita",
    text: "Gestionamos la cita en el consulado o centro de solicitudes y te avisamos cada paso.",
  },
  {
    icon: FiUserCheck,
    title: "Te preparamos",
    text: "Revisamos tus documentos y te orientamos para que llegues seguro a tu entrevista.",
  },
];

const tourismOptions = [
  {
    title: "Europa",
    text: "Circuitos por España, Francia, Italia y más, con guía y hoteles incluidos.",
    image: "/img/destinations/disney-paris-1.jpg",
    message: "Hola Volamos Viajes, quiero información de paquetes a Europa",
  },
  {
    title: "Asia",
    text: "Japón, China y Turquía: destinos únicos con todo organizado desde El Salvador.",
    image: "/img/destinations/osaka-1.jpg",
    message: "Hola Volamos Viajes, quiero información de paquetes a Asia",
  },
  {
    title: "Playas del Caribe",
    text: "Cancún, Riviera Maya, Panamá y más, en paquetes todo incluido.",
    image: "/img/destinations/bocas-del-toro-1.jpg",
    message: "Hola Volamos Viajes, quiero información de paquetes de playa",
  },
];

const waLink = (text: string) => `${WA_URI}&text=${encodeURIComponent(text)}`;

const Visas: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const goToDestinations = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-hidden">
      <SEO
        pageTitle="Trámite de Visas desde El Salvador | Volamos Viajes"
        pageDescription="Te ayudamos con tu visa de Estados Unidos, Canadá, México, China, Australia y Reino Unido. Asesoría, llenado de formularios y citas con Volamos Viajes en San Salvador y Santa Ana."
        pagePath="/visas"
        pageImage="/img/destinations/estambul-1.jpg"
        pageKeywords={[
          "trámite de visa El Salvador",
          "visa americana El Salvador",
          "visa canadiense El Salvador",
          "visa china El Salvador",
          "asesoría de visas San Salvador",
          "volamos viajes visas",
        ]}
      />
      <Header color="white" showPromoCarousel={false} />

      {/* Hero */}
      <header className="relative mt-20 overflow-hidden bg-primary py-32 text-white">
        <div className="absolute inset-0 bg-[url('/img/destinations/estambul-1.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center">
          <span className="rounded-full bg-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/90 backdrop-blur-md">
            Servicio de visas
          </span>
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
            Tu visa, sin complicaciones
          </h1>
          <p className="max-w-3xl text-base text-blue-100 sm:text-lg">
            En Volamos Viajes te acompañamos en todo el trámite de tu visa: desde la asesoría
            hasta la cita. Y cuando la tengas, te armamos el viaje completo.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink("Hola Volamos Viajes, quiero asesoría para tramitar mi visa")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-primary shadow-lg transition hover:-translate-y-1 hover:bg-white/90"
            >
              <FiMessageCircle className="h-5 w-5" /> Quiero asesoría
            </a>
            <a
              href="#tipos-de-visa"
              className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Ver visas
            </a>
          </div>
        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        {/* Tipos de visa */}
        <section id="tipos-de-visa" className="w-full bg-background py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">¿A dónde quieres viajar?</h2>
              <p className="mt-2 text-sm text-text/80 sm:text-base">
                Estas son las visas que gestionamos con más frecuencia. Si buscas otro país, escríbenos.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visas.map((visa) => (
                <article
                  key={visa.country}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-cardBackground p-6 shadow-[0px_20px_40px_-30px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl" aria-hidden>{visa.flag}</span>
                    <h3 className="text-xl font-semibold text-primary">{visa.country}</h3>
                  </div>
                  <p className="mt-3 text-sm text-text/80">{visa.description}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-text">
                    {visa.services.map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hola Volamos Viajes, quiero información sobre la visa de ${visa.country}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-secondary"
                  >
                    Consultar requisitos
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="w-full bg-white py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="mb-10 text-center text-2xl font-semibold text-primary sm:text-3xl">
              Así funciona el trámite
            </h2>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="flex flex-col items-center rounded-2xl bg-sectionBackground/60 p-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Paso {index + 1}</span>
                  <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
                  <p className="mt-2 text-sm text-text/80">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 text-xs text-text/70 sm:text-sm">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              La aprobación de la visa depende exclusivamente de cada embajada o consulado. Nuestro trabajo es
              que tu solicitud esté completa y bien presentada.
            </p>
          </div>
        </section>

        {/* Turismo */}
        <section className="w-full bg-background py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">¿Ya tienes tu visa? Ahora viaja con nosotros</h2>
              <p className="mt-2 text-sm text-text/80 sm:text-base">
                Vuelos, hoteles, tours y paquetes completos desde El Salvador.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {tourismOptions.map((option) => (
                <a
                  key={option.title}
                  href={waLink(option.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl text-white shadow-lg"
                >
                  <img
                    src={option.image}
                    alt={`Paquetes a ${option.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative p-6">
                    <h3 className="text-xl font-semibold">{option.title}</h3>
                    <p className="mt-1 text-sm text-white/85">{option.text}</p>
                    <span className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">
                      Cotizar por WhatsApp
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button
                onClick={goToDestinations}
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-secondary"
              >
                Ver todos los destinos
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppBtn />
      <SpeedInsights />
      <ScrollToTop />
    </div>
  );
};

export default Visas;
