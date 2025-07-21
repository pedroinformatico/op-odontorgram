import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Configuración para build de librería
  if (command === 'build' && mode === 'lib') {
    return {
      plugins: [react()],
      optimizeDeps: {
        exclude: ['lucide-react'],
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib/odontograma/index.ts'),
          name: 'OpOdontogram',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        copyPublicDir: false
      }
    };
  }
  
  // Configuración para demo/aplicación
  return {
    base: process.env.GITHUB_PAGES ? '/op-odontorgram/' : '/',
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    }
  };
});
