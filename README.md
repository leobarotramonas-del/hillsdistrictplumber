# The Hills District Plumber

Production-ready Astro 5 static website for **The Hills District Plumber**.

## Local development

Requires Node.js 20 or later.

```powershell
npm install
npm run dev
```

## Validation

```powershell
npm run build
npm run check:site
npm run check:performance
git diff --check
```

The production build is written to `dist`.

## Deployment

The intended production hostname is `https://thehillsdistrictplumber.com.au`. Build with `npm run build` and publish `dist` to a separate Cloudflare project. Do not enable indexing until the apex domain, HTTPS certificate and `www` redirect have been verified.

