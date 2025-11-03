import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollTopBtn";
import WhatsAppBtn from "../../components/WhatsAppBtn";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from "classnames";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiMessageCircle,
  FiShield,
  FiAward,
} from "react-icons/fi";
import Newsletter from "../../components/Newsletter";

const TOTAL_PAGES = 51;
const FILE_PREFIX =
  "S&EE Catálogo Mundial FIFA Hospitality 2026_20250917_062600_0000_page-";
const FILE_EXTENSION = ".jpg";

interface CatalogPage {
  src: string;
  alt: string;
  pageNumber: number;
}

const Mundial2026: React.FC = () => {
  const [pageWidth, setPageWidth] = useState(480);
  const aspectRatio = 1.415; // Approx ratio for catalog pages
  const pageHeight = Math.round(pageWidth * aspectRatio);
  const bookWrapperRef = useRef<HTMLDivElement>(null);
  const modalCarouselRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const pages = useMemo<CatalogPage[]>(
    () =>
      Array.from({ length: TOTAL_PAGES }, (_, index) => {
        const page = String(index + 1).padStart(4, "0");
        const pageNumber = index + 1;
        return {
          src: `/img/mundial-2026/${FILE_PREFIX}${page}${FILE_EXTENSION}`,
          alt: `Catálogo Mundial 2026 página ${pageNumber}`,
          pageNumber,
        };
      }),
    []
  );
  const spreads = useMemo(() => {
    const result: CatalogPage[][] = [];
    for (let i = 0; i < pages.length; i += 2) {
      result.push(pages.slice(i, i + 2));
    }
    return result;
  }, [pages]);
  const carouselConfig = useMemo(
    () => ({
      desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      tablet: {
        breakpoint: { max: 1280, min: 768 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        partialVisibilityGutter: 0,
      },
    }),
    []
  );

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (!bookWrapperRef.current) return;
      const { offsetWidth } = bookWrapperRef.current;
      const computedWidth = Math.min(520, Math.max(300, offsetWidth - 220));
      setPageWidth(computedWidth);
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const isDesktopView = viewportSize.width >= 1024;
  const displaySlides = useMemo(
    () => (isDesktopView ? spreads : pages.map((page) => [page])),
    [isDesktopView, spreads, pages]
  );
  const totalSlides = displaySlides.length;

  useEffect(() => {
    if (!isModalOpen || totalSlides === 0) return;
    const targetIndex = Math.min(Math.max(currentSlide, 0), totalSlides - 1);
    if (targetIndex !== currentSlide) {
      setCurrentSlide(targetIndex);
      return;
    }
    if (modalCarouselRef.current) {
      modalCarouselRef.current.goToSlide(targetIndex, false);
    }
  }, [isModalOpen, currentSlide, totalSlides]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-hidden">
      <Helmet>
        <title>Catálogo Hospitality Mundial 2026 | Volamos Viajes</title>
        <meta
          name="description"
          content="Explora el catálogo oficial de Hospitality para el Mundial 2026 con nuestra experiencia de lectura tipo revista."
        />
        <link rel="canonical" href="https://volamosviajes.com/mundial-2026" />
      </Helmet>
      <Header color="white" showPromoCarousel={false} />
      <header className="relative mt-20 overflow-hidden bg-black py-40 text-white">
        <div className="absolute inset-0 bg-[url('/img/mundial-2026/M2026.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
          <span className="rounded-full bg-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/90 backdrop-blur-md">
            Mundial 2026
          </span>
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
            Catálogo FIFA World Cup 2026™
          </h1>
          <p className="max-w-3xl text-base text-blue-100 sm:text-lg">
            Vive la emoción del Mundial 2026 como nunca antes. Descubre, siente y comparte
            experiencias únicas que te harán vibrar con cada jugada, en cada estadio y
            en cada rincón del planeta fútbol.
          </p>

        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        <section className="w-full bg-white py-12">
          <div className="mx-auto flex w-full sm:w-[80%] md:w-[85%] overflow-hidden flex-col gap-8 px-4">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6">
              <div className="mb-8 grid gap-6 text-text lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    <FiAward className="h-4 w-4" /> Experiencias Corporativas
                  </span>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Diseña vivencias VIP para el Mundial 2026</h2>
                    <p className="text-sm text-text/80">
                      Conectate con tus equipos favoritos en la Copa del Mundo mediante programas oficiales y exclusivos. Define sedes, fechas y beneficios a la medida con nuestro acompañamiento integral.
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-text/80">
                    <li className="flex items-start gap-3">
                      <FiShield className="mt-0.5 h-4 w-4 text-primary" />
                      Suites, palcos y lounges oficiales con gastronomía de autor, mixología premium..
                    </li>
                    <li className="flex items-start gap-3">
                      <FiShield className="mt-0.5 h-4 w-4 text-primary" />
                      Planificación puerta a puerta: vuelos, hoteles, traslados dedicados y concierge en sitio para tu grupo.
                    </li>
                    <li className="flex items-start gap-3">
                      <FiShield className="mt-0.5 h-4 w-4 text-primary" />
                      Agendas exclusivas “Follow Your Team”, finales y eventos privados para relacionamiento de alto nivel.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-primary/5 p-6">
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0px_20px_40px_-25px_rgba(15,23,42,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FiDownload className="h-6 w-6" />
                    </div>
                    <div className="text-sm text-text">
                      <p className="font-semibold text-primary">Catálogo oficial PDF</p>
                      <p className="text-text/80">Solicita el dossier completo con detalles de precios, ubicaciones y upgrades directamente con nuestro equipo.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-sm">
                    <a
                      href="https://wa.me/50374778466?text=Hola%20Volamos%20Viajes,%20quiero%20que%20me%20env%C3%ADen%20el%20cat%C3%A1logo%20VIP%202026%20en%20PDF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-primary/90"
                    >
                      Solicitar PDF por WhatsApp
                      <FiDownload className="h-5 w-5" />
                    </a>
                    <a
                      href="https://wa.me/50374778466?text=Hola%20Volamos%20Viajes,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20VIP%20para%20el%20Mundial%202026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 font-semibold uppercase tracking-wide text-primary transition hover:-translate-y-1 hover:border-primary hover:text-primary/90"
                    >
                      Agenda una asesoría
                      <FiMessageCircle className="h-5 w-5" />
                    </a>
                  </div>

                  {/* <p className="text-xs text-text/70">
                    Atención preferencial para grupos corporativos, agencias y marcas que buscan experiencias de lujo en la Copa del Mundo.
                  </p> */}
                </div>
              </div>
              <div ref={bookWrapperRef} className="mt-12 flex w-full justify-center">
                <Carousel
                  responsive={carouselConfig}
                  infinite
                  swipeable
                  draggable
                  autoPlay={false}
                  containerClass="w-full"
                  itemClass="px-2"
                  keyBoardControl
                  renderDotsOutside={false}
                  arrows={!isModalOpen}
                  afterChange={(previousSlide, state) => {
                    const next = state?.currentSlide ?? 0;
                    const clamped = Math.min(Math.max(next, 0), totalSlides - 1);
                    setCurrentSlide(clamped);
                  }}
                >
                  {displaySlides.map((slidePages, slideIndex) => {
                    const pageNumbers = slidePages.map((page) => page.pageNumber);
                    const slideLabel =
                      pageNumbers.length === 2
                        ? `Pág. ${pageNumbers[0]} & ${pageNumbers[1]}`
                        : `Pág. ${pageNumbers[0]}`;
                    return (
                      <div key={`slide-${pageNumbers[0]}`} className="flex w-full justify-center">
                        <div className="flex max-w-full flex-col items-center gap-4">
                          <div
                            className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                            style={{ minHeight: pageHeight }}
                          >
                            {slidePages.map((page, index) => (
                              <figure
                                key={page.pageNumber}
                                className={classNames(
                                  "relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-white",
                                  "group cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
                                  index > 0 ? "hidden lg:block" : "block"
                                )}
                                style={{
                                  width: "100%",
                                  maxWidth: pageWidth,
                                  aspectRatio: `${1 / aspectRatio}`,
                                }}
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                  setCurrentSlide(slideIndex);
                                  setIsModalOpen(true);
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setCurrentSlide(slideIndex);
                                    setIsModalOpen(true);
                                  }
                                }}
                              >
                                <img
                                  src={page.src}
                                  alt={page.alt}
                                  loading={page.pageNumber <= 2 ? "eager" : "lazy"}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-[1.05]"
                                />
                                <figcaption className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
                                  Pág. {page.pageNumber}
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            {slideLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-background pb-16">
          <div className="mx-auto flex w-full sm:w-[80%] md:w-[85%] flex-col gap-8 px-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-0 py-0 md:px-10 md:py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr.1)]">
                <div className="space-y-4 text-text">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Inspiración en cancha
                  </span>
                  <h3 className="text-3xl font-semibold text-primary">Visualiza la experiencia que mereces</h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Estas escenas reales del catálogo reflejan la atmósfera exclusiva que puedes ofrecer a tus invitados en el Mundial 2026. Personaliza cada detalle con nuestro equipo y convierte el evento en una vivencia inolvidable.
                  </p>
                  <ul className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      Suites privadas con servicio gourmet y barra premium.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary"></span>
                      Agenda de networking y activaciones personalizadas.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Atención de concierge 24/7 para tu grupo.
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/50374778466?text=Hola%20Volamos%20Viajes,%20quiero%20cotizar%20un%20paquete%20VIP%20para%20el%20Mundial%202026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-primary/90"
                  >
                    Diseñar mi experiencia
                    <FiMessageCircle className="h-5 w-5" />
                  </a>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
                  <img
                    src="/img/mundial-2026/S&EE Catálogo Mundial FIFA Hospitality 2026_20250917_062600_0000_page-0051.jpg"
                    alt="Vista a cancha desde la zona VIP"
                    className="h-[30rem] w-full rounded-2xl object-cover object-center shadow-lg"
                  />
                  <img
                    src="/img/mundial-2026/S&EE Catálogo Mundial FIFA Hospitality 2026_20250917_062600_0000_page-0028.jpg"
                    alt="Hospitality lounge premium"
                    className="h-[30rem] w-full rounded-2xl object-cover object-bottom shadow-lg"
                  />
                  <img
                    src="/img/mundial-2026/S&EE Catálogo Mundial FIFA Hospitality 2026_20250917_062600_0000_page-0007.jpg"
                    alt="Recepción con invitados VIP"
                    className="col-span-2 h-[30rem] w-full rounded-2xl object-cover object-center shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/90 px-4 py-10">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Cerrar vista ampliada"
          >
            ✕
          </button>
          <div className="relative flex w-full max-w-6xl flex-col items-center justify-center">
            <button
              aria-label="Página anterior"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              onClick={() => modalCarouselRef.current?.previous()}
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Página siguiente"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              onClick={() => modalCarouselRef.current?.next()}
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
            <Carousel
              ref={modalCarouselRef}
              responsive={carouselConfig}
              arrows={false}
              infinite
              swipeable
              draggable
              autoPlay={false}
              containerClass="w-full"
              itemClass="px-2"
              keyBoardControl
              renderDotsOutside={false}
              afterChange={(previousSlide, state) => {
                const next = state?.currentSlide ?? 0;
                const clamped = Math.min(Math.max(next, 0), totalSlides - 1);
                setCurrentSlide(clamped);
              }}
            >
              {displaySlides.map((slidePages) => {
                const viewportWidth = viewportSize.width || window.innerWidth || 1280;
                const viewportHeight = viewportSize.height || window.innerHeight || 900;
                const maxModalWidth = Math.max(420, Math.round(viewportWidth * 0.9));
                const maxModalHeight = Math.max(480, Math.round(viewportHeight * 0.9));
                const gapBetween = slidePages.length > 1 ? 40 : 0;
                const totalGap = gapBetween * Math.max(slidePages.length - 1, 0);
                let figureHeight = maxModalHeight - 80;
                let figureWidth = figureHeight / aspectRatio;
                let containerWidth = figureWidth * slidePages.length + totalGap;

                if (containerWidth > maxModalWidth) {
                  const scale = maxModalWidth / containerWidth;
                  figureWidth *= scale;
                  figureHeight *= scale;
                  containerWidth = maxModalWidth;
                }

                figureHeight = Math.max(360, figureHeight);
                figureWidth = Math.max(figureHeight / aspectRatio, figureWidth);

                const containerHeight = figureHeight + 80;
                const firstPageNumber = slidePages[0]?.pageNumber ?? 1;
                const lastPageNumber =
                  slidePages[slidePages.length - 1]?.pageNumber ?? firstPageNumber;

                return (
                  <div key={`modal-slide-${firstPageNumber}`} className="flex w-full items-center justify-center">
                    <div
                      className="flex flex-col items-center justify-center gap-6"
                      style={{
                        width: containerWidth,
                        minHeight: containerHeight,
                        height: containerHeight,
                      }}
                    >
                      <div
                        className="flex w-full flex-col items-center justify-center md:flex-row"
                        style={{
                          minHeight: figureHeight,
                          columnGap: gapBetween,
                          rowGap: 32,
                        }}
                      >
                        {slidePages.map((page) => (
                          <figure
                            key={`modal-page-${page.pageNumber}`}
                            className="relative w-full max-w-[80%] overflow-hidden rounded-3xl shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]"
                            style={{
                              width: figureWidth,
                              height: figureHeight,
                            }}
                          >
                            <img
                              src={page.src}
                              alt={page.alt}
                              loading={page.pageNumber <= 2 ? "eager" : "lazy"}
                              className="h-full w-full object-contain"
                            />
                            <figcaption className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                              Pág. {page.pageNumber}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
            {(() => {
              const currentSlidePages = displaySlides[currentSlide] ?? [];
              const firstPageNumber = currentSlidePages[0]?.pageNumber ?? 1;
              const lastPageNumber = currentSlidePages[currentSlidePages.length - 1]?.pageNumber ?? firstPageNumber;
              const hasPrev = currentSlide > 0;
              const hasNext = currentSlide < totalSlides - 1;
              return (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-white/80 w-full max-w-4xl">
                  <button
                    className={classNames(
                      "inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                      hasPrev ? "hover:bg-white/10" : "opacity-40 cursor-not-allowed"
                    )}
                    onClick={() => hasPrev && modalCarouselRef.current?.previous()}
                    disabled={!hasPrev}
                  >
                    ← {hasPrev ? `Pág. ${firstPageNumber - 1}` : "Inicio"}
                  </button>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    Pág. {firstPageNumber}
                    {firstPageNumber !== lastPageNumber ? ` - ${lastPageNumber}` : ""} de {TOTAL_PAGES}
                  </span>
                  <button
                    className={classNames(
                      "inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                      hasNext ? "hover:bg-white/10" : "opacity-40 cursor-not-allowed"
                    )}
                    onClick={() => hasNext && modalCarouselRef.current?.next()}
                    disabled={!hasNext}
                  >
                    {hasNext ? `Pág. ${lastPageNumber + 1}` : "Fin"} →
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Testimonials con zoom-in y Newsletter */}
      <section
        className="w-full flex flex-col gap-10 mt-36"
        style={{
          backgroundImage: 'url("/img/background/testimonial.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Newsletter />
      </section>
      {/* Botones fijos y footer */}
      <Footer />
      <WhatsAppBtn />
      <ScrollToTop />
      <SpeedInsights />
    </div>
  );
};

export default Mundial2026;
