// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aqui adicionamos as cores personalizadas da marca
      colors: {
        'brand-red': '#C81B1B',      // O vermelho principal (estimado das imagens)
        'brand-red-dark': '#9A1A1A', // Um tom mais escuro do vermelho para banners/links
        'brand-brown': '#5C3A2E',  // O marrom do logo
        'brand-yellow': '#F9E01E', // O amarelo do logo
        'brand-footer': '#1A1A1A', // O fundo escuro do rodapé
      },
    },
  },
  plugins: [],
};

export default config; // Usamos 'export default' por ser um arquivo .mjs