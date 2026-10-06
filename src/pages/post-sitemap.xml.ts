import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const prerender = true;
export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts.map((post) => {
    const lastModified = post.data.updatedDate ?? post.data.publishDate;
    return `<url><loc>${new URL(`/blog/${post.id}/`, site.url).toString()}</loc><lastmod>${lastModified.toISOString().slice(0, 10)}</lastmod></url>`;
  }).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
