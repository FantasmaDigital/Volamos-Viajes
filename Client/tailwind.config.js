/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        VVorange: '#e3462d',
        primary: '#0e3d5e',           // Azul Profundo
        secondary: '#1f567a',         // Azul Medio
        background: '#f4f6f9',        // Fondo General Gris Claro
        sectionBackground: '#e3e8ec', // Fondo Alterno
        cardBackground: '#ffffff',    // Fondo de Tarjetas
        accentBackground: '#d1dae0',  // Fondo de Encabezados o CTA
        text: '#333333',              // Gris Oscuro para el Texto
      },
      textShadow: {
        'custom': '4px 2px 4px #000',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-custom': {
          textShadow: '4px 2px 4px #000',
        },
      });
    },
  ],
}