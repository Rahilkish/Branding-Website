import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Matches the paths configuration in your tsconfig.json
      '@': path.resolve(__dirname, './'),
    },
  },
  // IMPORTANT: Replace this string with your exact GitHub repository name
  // Example: If your URL is https://username.github.io/my-portfolio/, use '/my-portfolio/'
  base: '/<Rahilkish/Branding-Website>/', 
});
