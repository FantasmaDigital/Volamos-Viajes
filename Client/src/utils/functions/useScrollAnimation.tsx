import { useInView } from "react-intersection-observer";
import { useSpring } from "@react-spring/web";

export const useScrollAnimation = (delay = 0) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Activar cuando el 5% del componente es visible
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)", // Ajuste menor en la traducción
    delay,
    config: { mass: 1, tension: 220, friction: 18 }, // Más tensión y menos fricción para mayor fluidez
  });

  return { ref, springProps };
};
