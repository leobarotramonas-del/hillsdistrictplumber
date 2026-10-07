import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thehillsdistrictplumber.com.au',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
});

