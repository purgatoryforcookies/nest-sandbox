import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { keycloakify } from 'keycloakify/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    keycloakify({
      accountThemeImplementation: 'none',
      keycloakVersionTargets: {
        '22-to-25': false,
        'all-other-versions': 'theme.jar',
      },
      themeName: 'custom-theme',
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
