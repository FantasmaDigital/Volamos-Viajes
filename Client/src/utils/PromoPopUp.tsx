import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PromoPopUp: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle smooth scrolling
  const smoothScrollToSection = (sectionId: string) => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      navigate("/", { replace: true });
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500); // Increased timeout to allow time for navigation and layout
  };

  useEffect(() => {
    // Only show the pop-up if we are on the "/" route and it hasn't been shown recently
    const currentPath = window.location.pathname;
    const lastShownTimestamp = localStorage.getItem("lastPromoPopupShown");
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    // If we are on the home route and the popup hasn't been shown recently
    if (currentPath === "/" && (!lastShownTimestamp || currentTime - Number(lastShownTimestamp) > fiveMinutesInMilliseconds)) {
      // Show the SweetAlert2 pop-up
      Swal.fire({
        html: `
          <div class="relative text-center w-full">
              <div class="relative w-full h-[500px] md:h-[500px]">
                  <img src="/img/promotionpkg/f1/formula_1.jpg" alt="Imagen de F1" class="rounded-sm absolute top-0 left-0 w-full h-full object-cover mb-4"/>
                  <div class="absolute top-0 left-0 w-full text-center text-black p-2 h-full">
                      <img src="/img/promotionpkg/f1/logo-f1.png" alt="Imagen de F1" class="mx-auto h-1/4 w-auto mb-4"/>
                      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent">
                          <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full">
                              <p class="w-[90%] m-auto text-white text-sm md:text-base font-semibold">¡No te pierdas la emoción de la F1!</p>
                              <p class="w-[90%] m-auto mb-14 text-white text-sm md:text-base ">Vive la velocidad, la adrenalina y las últimas noticias sobre tus pilotos y equipos favoritos</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        `,
        showConfirmButton: true,
        confirmButtonColor: '#0e3d5e',
        confirmButtonText: 'Ver más!',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        cancelButtonColor: '#dc2626',
        backdrop: 'rgba(0, 0, 0, 0.8)',
        customClass: {
          popup: 'bg-transparent border-none w-full md:w-[50%] p-0 m-0',
          title: 'text-white',
          cancelButton: 'move-button-up',
          confirmButton: 'move-button-up',
          actions: 'custom-actions-position',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          smoothScrollToSection('promopkg'); // Scroll to the promo section
        }
      });

      // After showing the popup, store the current timestamp in localStorage
      localStorage.setItem("lastPromoPopupShown", currentTime.toString());
    }
  }, [navigate]);

  return null;
};

export default PromoPopUp;
