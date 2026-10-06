import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const errors = [];
const media = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full); else media.push(full);
  }
}
walk(dist);
for (const file of media) {
  const size = fs.statSync(file).size;
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext) && size > 250_000) errors.push(`${path.relative(dist, file)}: unoptimised photographic asset (${size} bytes)`);
  if (['.webp', '.avif'].includes(ext) && size > 400_000) errors.push(`${path.relative(dist, file)}: image exceeds 400 KB (${size} bytes)`);
  if (['.mp4', '.webm'].includes(ext) && size > 4_500_000) errors.push(`${path.relative(dist, file)}: hero video exceeds 4.5 MB (${size} bytes)`);
}
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!/<video[^>]*preload="metadata"[^>]*poster="\/media\/antons-hero-poster\.webp"/i.test(home)) errors.push('home: hero video must use metadata preload and local poster');
if (!/<video[^>]*width="464"[^>]*height="832"/i.test(home)) errors.push('home: hero video needs explicit dimensions');
if (/home-hero[^]*?<img/i.test(home.split('</section>')[0] ?? '')) errors.push('home: separate image found in hero section');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Performance check passed: media budgets and hero loading verified.');

