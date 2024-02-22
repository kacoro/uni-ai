import uni from '@dcloudio/vite-plugin-uni';
import { defineConfig } from 'vite';

import path from 'path';
const resolve = dir => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
});
