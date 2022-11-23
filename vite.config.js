// vite.config.js
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  // omit

  server: {
    host: true,
    port: 5100,
    open: './index.html',
  },
});
