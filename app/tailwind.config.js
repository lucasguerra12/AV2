/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          background: '#0b101e', // Azul quase preto do fundo
          panel: '#151b2b',      // Cor dos cards
          border: '#232b3e',     // Linhas divisórias
          accent: '#3b82f6',     // Azul dos botões primários
          text: '#94a3b8',       // Texto secundário
          textHigh: '#f8fafc',   // Texto principal
        },
        status: {
          success: '#10b981', // Verde
          warning: '#f59e0b', // Laranja
          critical: '#ef4444' // Vermelho
        }
      }
    },
  },
  plugins: [],
}