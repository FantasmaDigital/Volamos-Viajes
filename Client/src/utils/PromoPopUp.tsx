import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PromoPopUp: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle smooth scrolling
  const smoothScrollToSection = (sectionId: string, targetPath: string = "/") => {
    const currentPath = window.location.pathname;

    if (currentPath !== targetPath) {
      navigate(targetPath, { replace: false });
    }

    const delay = currentPath !== targetPath ? 600 : 100;

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, delay);
  };

  useEffect(() => {
    // Only show the pop-up on the home route or the Visas page
    const currentPath = window.location.pathname;
    const lastShownTimestamp = localStorage.getItem("lastPromoPopupShown");
    const teenMinutesInMilliseconds = 10 * 60 * 1000;
    const currentTime = new Date().getTime();
    const eligiblePaths = ["/", "/visas"];

    if (eligiblePaths.includes(currentPath) && (!lastShownTimestamp || currentTime - Number(lastShownTimestamp) > teenMinutesInMilliseconds)) {
      // Show the SweetAlert2 pop-up
      Swal.fire({
        html: `
          <div class="relative text-center w-full">
              <div class="relative w-full h-[520px] md:h-[520px] overflow-hidden rounded-3xl">
                  <img src="/img/destinations/estambul-1.jpg" alt="Trámite de visas con Volamos Viajes" class="absolute top-0 left-0 w-full h-full object-cover"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div class="absolute inset-0 flex flex-col items-center justify-end gap-4 pb-10 text-white px-6">
                      <span class="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em]">
                          Servicio de visas
                      </span>
                      <h3 class="text-2xl md:text-3xl font-bold">Tramita tu visa con Volamos Viajes</h3>
                      <p class="max-w-md text-sm md:text-base text-white/80">
                          Estados Unidos, Canadá, México, China, Australia y Reino Unido. Te asesoramos, llenamos tu formulario y agendamos tu cita.
                      </p>
                      <div class="flex flex-col gap-3 w-full max-w-xs mx-auto">
                        <button id="cta-visas-popup" class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary shadow-lg transition">
                          Ver visas
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#0e3d5e',
        backdrop: 'rgba(0, 0, 0, 0.8)',
        customClass: {
          popup: 'bg-transparent border-none w-full md:w-[55%] p-0 m-0',
          cancelButton: 'hidden',
          actions: 'custom-actions-position hidden',
        },
        didOpen: () => {
          const ctaButton = document.getElementById("cta-visas-popup");
          const closeButton = document.getElementById("cta-close-visas");
          if (ctaButton) {
            ctaButton.addEventListener("click", () => {
              Swal.close();
              smoothScrollToSection("tipos-de-visa", "/visas");
            });
          }
          if (closeButton) {
            closeButton.addEventListener("click", () => Swal.close());
          }
        }
      });

      // After showing the popup, store the current timestamp in localStorage
      localStorage.setItem("lastPromoPopupShown", currentTime.toString());
    }
  }, [navigate]);

  return null;
};

export default PromoPopUp;
