import { areas, services, site } from '../data/site';

export const prerender = true;
export function GET() {
  const paths = ['/', '/services/', ...services.map((service) => `/services/${service.slug}/`), '/service-areas/', ...areas.map((area) => `/service-areas/${area.slug}/`), '/about/', '/contact/', '/privacy/', '/terms/'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(path, site.url).toString()}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

