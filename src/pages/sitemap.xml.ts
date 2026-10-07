import { getCollection } from 'astro:content';
import { areas, services, site } from '../data/site';

export const prerender = true;
export async function GET() {
  const pagePaths = ['/', '/services/', ...services.map((service) => `/services/${service.slug}/`), '/service-areas/', ...areas.map((area) => `/service-areas/${area.slug}/`), '/blog/', '/about/', '/contact/', '/privacy/', '/terms/'];
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const pageUrls = pagePaths.map((path) => `  <url><loc>${new URL(path, site.url).toString()}</loc></url>`);
  const postUrls = posts.map((post) => {
    const lastModified = post.data.updatedDate ?? post.data.publishDate;
    return `  <url><loc>${new URL(`/blog/${post.id}/`, site.url).toString()}</loc><lastmod>${lastModified.toISOString().slice(0, 10)}</lastmod></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pageUrls, ...postUrls].join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

