import { site } from '../data/site';

export const prerender = true;
export function GET() {
  const sitemaps = ['/page-sitemap.xml', '/post-sitemap.xml'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps.map((path) => `<sitemap><loc>${new URL(path, site.url).toString()}</loc></sitemap>`).join('')}</sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

