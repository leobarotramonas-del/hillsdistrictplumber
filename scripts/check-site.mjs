import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
if (!fs.existsSync(root)) throw new Error('dist is missing. Run npm run build first.');
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);
const errors = [];
const canonicalBase = 'https://thehillsdistrictplumber.com.au';
const pages = new Map();
const strip = (value) => value.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (html, tag, name) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${name}=["']([^"']*)["'][^>]*>`, 'gi'))].map((match) => match[1]);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const urlPath = rel === 'index.html' ? '/' : rel === '404.html' ? '/404/' : `/${rel.replace(/index\.html$/, '')}`;
  pages.set(urlPath, html);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? '';
  const expected = new URL(urlPath, canonicalBase).toString();
  const is404 = urlPath === '/404/';
  if (title.length < 30 || title.length > 60) errors.push(`${urlPath}: title length ${title.length}`);
  if (description.length < 100 || description.length > 150) errors.push(`${urlPath}: description length ${description.length}`);
  if (canonical !== expected) errors.push(`${urlPath}: canonical ${canonical} should be ${expected}`);
  for (const lang of ['en-AU', 'x-default']) if (!html.includes(`hreflang="${lang}" href="${expected}"`)) errors.push(`${urlPath}: missing self-referencing ${lang}`);
  if (!/<html lang="en-AU">/i.test(html)) errors.push(`${urlPath}: missing en-AU language`);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`${urlPath}: expected one H1, found ${h1Count}`);
  const imgs = [...html.matchAll(/<img\b([^>]*)>/gi)];
  for (const image of imgs) {
    const attrs = image[1];
    if (!/\balt="[^"]+"/i.test(attrs) && !/\balt=""/i.test(attrs)) errors.push(`${urlPath}: image without alt`);
    if (!/\bwidth="\d+"/i.test(attrs) || !/\bheight="\d+"/i.test(attrs)) errors.push(`${urlPath}: image without dimensions`);
  }
  const sources = attr(html, 'img', 'src').filter((src) => !src.startsWith('data:'));
  if (new Set(sources).size !== sources.length) errors.push(`${urlPath}: duplicate content image`);
  if (/pages\.dev|workers\.dev|localhost|127\.0\.0\.1/i.test(html)) errors.push(`${urlPath}: preview URL leaked into HTML`);
  if (!html.includes('"@type":"Plumber"') || !html.includes('"@type":"WebSite"') || !html.includes('"@type":"WebPage"')) errors.push(`${urlPath}: missing required schema node`);
  if (is404 && !html.includes('noindex,nofollow')) errors.push('/404/: missing noindex,nofollow');
  const visible = strip(html).toLowerCase();
  for (const us of [' color ', ' neighborhood ', ' license #', ' organized ', ' center ']) if (visible.includes(us)) errors.push(`${urlPath}: possible US spelling ${us.trim()}`);
}

for (const [urlPath, html] of pages) {
  for (const href of attr(html, 'a', 'href')) {
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || /^https?:\/\//.test(href)) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!clean.endsWith('/') && !clean.includes('.')) errors.push(`${urlPath}: internal link missing trailing slash ${href}`);
    if (clean.endsWith('/') && !pages.has(clean)) errors.push(`${urlPath}: broken internal link ${href}`);
  }
}

for (const legal of ['/privacy/', '/terms/']) {
  const incoming = [...pages.values()].filter((html) => html.includes(`href="${legal}"`)).length;
  if (incoming < 1) errors.push(`${legal}: orphan page`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const urlPath of pages.keys()) {
  if (urlPath === '/404/') continue;
  const absolute = new URL(urlPath, canonicalBase).toString();
  const count = sitemapUrls.filter((url) => url === absolute).length;
  if (count !== 1) errors.push(`${urlPath}: sitemap count ${count}`);
}
if (sitemap.includes('/404/')) errors.push('sitemap: 404 must be excluded');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
for (const required of ['User-agent: AhrefsSiteAudit', 'User-agent: AhrefsBot', 'Sitemap: https://thehillsdistrictplumber.com.au/sitemap.xml']) if (!robots.includes(required)) errors.push(`robots.txt: missing ${required}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Site check passed: ${htmlFiles.length} HTML pages, sitemap and robots verified.`);

