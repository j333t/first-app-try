import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './schedular',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
