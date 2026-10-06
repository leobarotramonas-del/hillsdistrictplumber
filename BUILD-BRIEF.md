# The Hills District Plumber — New Website Build Brief

Copy this entire file into a new Codex chat. Attach the approved Antons logo, truck/team photos and job photos that may be reused. The new chat must create a **separate website and repository** and must not modify the Carlingford website.

---

## Prompt for the new chat

Build a production-ready local plumbing website named **The Hills District Plumber** for:

- Production domain: `https://thehillsdistrictplumber.com.au`
- Preferred hostname: non-`www`
- Business/operator: **Antons Enterprises Pty Ltd**
- Customer-facing association: **by Antons**
- NSW contractor licence: **210933C**
- Phone display: **0493 824 176**
- Phone link: `tel:+61493824176`
- Service availability wording: urgent calls taken 24 hours, 7 days a week; never promise an arrival time
- Framework: Astro 5, TypeScript and static output
- Node: version 20 or later
- Build output: `dist`

Create this as a new sibling project, not inside or on top of the Carlingford repository. Use a name such as `the-hills-district-plumber`.

Before writing local-area claims, ask me to confirm the six priority Hills District suburbs and their postcodes. Do not invent addresses, service coverage, job locations, testimonials, awards, prices, response times or business facts.

## Reference project

Use the existing Carlingford project as a structural and visual reference only:

`C:\Users\User\Documents\ChatGPT\Antons Plumbing\the-carlingford-plumber`

Reuse suitable components, validation scripts and approved Antons assets where legally allowed, but:

- do not modify the reference project;
- do not copy Carlingford-specific text into the new site;
- do not claim that an image was photographed in the Hills District unless that location is verified;
- rewrite every service-area page so it is useful, accurate and not doorway-page duplication;
- keep the new Git history and deployment separate.

## Brand and logo direction

Create or use an approved transparent logo reading:

**THE HILLS DISTRICT PLUMBER**  
**BY ANTONS**

Match the established Antons plumbing-site family: bold condensed lettering, clear plumbing identity, strong red-and-blue contrast and a practical trade-service feel. Do not distort or trace a low-resolution screenshot. Prefer an approved source logo or a clean, high-resolution transparent asset.

Use these design tokens:

```css
:root {
  --red: #b51224;
  --red-dark: #7f0b18;
  --red-light: #ff7b88;
  --red-soft: #fff0f1;
  --blue: #0869f7;
  --blue-dark: #0755c7;
  --blue-light: #8cc1ff;
  --blue-soft: #eaf3ff;
  --navy: #081939;
}
```

Typography may follow the established family:

- Display headings: Saira Extra Condensed 700
- Body/interface: Barlow 400, 600 and 700
- Self-host the fonts through `@fontsource`; do not add render-blocking third-party font requests.

## Visual and responsive requirements

- Keep the site recognisably related to the Carlingford and other Antons plumbing sites, but make it a distinct Hills District site rather than an exact clone.
- Use red for the header and primary brand surfaces.
- On white or pale backgrounds, primary action buttons and text links should be red.
- On red/dark-red sections, use blue for the main call-to-action when it provides clear contrast.
- Keep focus states obvious and accessible.
- Use comfortable spacing and avoid text touching the hero vehicle.
- The hero should feature the approved Antons truck/cutout with readable copy and a clear phone action.
- Build exactly six service cards in an equal grid: three cards per row on desktop, two per row on tablet and one per row on mobile.
- Keep service-card image ratios and heights consistent.
- Use red for all “Learn More” links, postcode labels and numbered process markers.
- Reviews should be a horizontal carousel showing three cards on desktop, fewer on smaller screens, with accessible previous/next controls, optional restrained auto-advance, pause on interaction/hover/focus and reduced-motion support. Use a red scrollbar.
- Add a persistent mobile “Call Now 0493 824 176” pill. It should be red with only a subtle blue outline/glow—not a distracting neon effect—and must respect the safe-area inset.
- Do not hide essential content behind animation or JavaScript.
- Meet WCAG AA colour contrast, keyboard navigation and visible-focus requirements.

## Required routes

Use trailing slashes consistently:

```text
/
/services/
/services/emergency-plumber/
/services/blocked-drains/
/services/hot-water-systems/
/services/plumbing-repairs/
/services/gas-fitting/
/services/leak-detection/
/service-areas/
/service-areas/[confirmed-suburb-slug]/
/about/
/contact/
/privacy/
/terms/
/robots.txt
/sitemap.xml
/404/
```

The footer must contain crawlable links to Services, all confirmed service areas, Contact, Privacy and Website Terms. Privacy and Terms must not be orphan pages.

## Homepage content structure

1. Header with logo, navigation, licence number and click-to-call action.
2. Hero headed around “The Hills District’s Local Plumber”, with accurate supporting copy and approved truck imagery.
3. Local call strip headed “Need a Hills District Local Plumber?”
4. Six service cards.
5. About/experience section using wording such as “More Than 25 Years of Plumbing Experience in the Hills District”, subject to business approval.
6. Service-area directory with six confirmed suburbs and correct postcodes.
7. Four-step repair process.
8. Honest customer feedback carousel. Only use genuine supplied/verified reviews; link to the source and do not invent rating schema.
9. FAQ section with visible answers that match any FAQ structured data exactly.
10. Strong contact CTA and complete footer.

## Service-area content rules

Each confirmed suburb page must have:

- unique title, meta description, H1, introduction and property/access context;
- correct suburb name and postcode;
- useful local information without pretending a specific job occurred there;
- licensing and operator disclosure;
- honest coverage wording: ask the caller for the full address so availability can be confirmed;
- at least six visible, genuinely useful FAQs;
- links to relevant services and neighbouring confirmed coverage pages;
- a unique or contextually appropriate image where possible.

Avoid swapping suburb names into identical paragraphs. Do not use unsupported “best plumber”, “number one”, guaranteed response-time or price claims.

## SEO requirements

Apply these from the first build, not as a later patch:

- Every indexable page has one unique title between 30 and 60 characters.
- Every indexable page has one unique meta description between 100 and 150 characters.
- Titles and descriptions for key pages naturally establish Hills District relevance.
- Exactly one descriptive H1 per page.
- One self-referencing canonical URL using the final HTTPS non-`www` domain and trailing slash.
- Add reciprocal self-referencing alternates on every indexable page:

```html
<link rel="alternate" hreflang="en-AU" href="[canonical URL]">
<link rel="alternate" hreflang="x-default" href="[canonical URL]">
```

- Use `<html lang="en-AU">` and Australian English spelling.
- Add `geo.region=AU-NSW` and an accurate Hills District place label.
- Add Open Graph and Twitter metadata with absolute production URLs.
- Never leak `pages.dev`, `workers.dev`, localhost or preview URLs into production HTML.
- Use clean internal links with trailing slashes and no avoidable redirect hops.
- Every sitemap URL must be canonical, HTTPS, non-`www`, indexable and return 200.
- Exclude the 404 page from the sitemap and mark it `noindex,nofollow`.
- Preview/deployment hosts must remain `noindex,nofollow`.

Use structured data carefully:

- `Plumber`/local business entity with the verified operator, phone, licence and service area;
- one `WebSite` and one `WebPage` node per page;
- `Service` on service pages;
- `BreadcrumbList` on inner pages;
- `FAQPage` only where the same questions and answers are visibly present;
- stable, unique absolute `@id` values;
- do not add `AggregateRating` or `Review` schema unless the visible content and Google eligibility requirements have been verified.

## Robots and sitemap

Create a static, directly accessible `public/robots.txt`:

```text
User-agent: AhrefsSiteAudit
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://thehillsdistrictplumber.com.au/sitemap.xml
```

Create a static or generated XML sitemap containing every indexable canonical page once. Include absolute local image URLs where appropriate.

Add `_headers` rules for the production deployment:

```text
/robots.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600, s-maxage=86400
  X-Content-Type-Options: nosniff

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

https://:version.:subdomain.workers.dev/*
  X-Robots-Tag: noindex, nofollow

https://:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow

https://:branch.:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow
```

## Image and performance requirements

- Convert photographic assets to WebP or AVIF at sensible quality.
- Never ship multi-megabyte PNG/JPEG files for displayed photographs.
- Use Astro image processing or a reusable responsive-image component.
- Generate `srcset` widths appropriate to each layout rather than sending desktop-sized images to mobile.
- Give every image explicit width and height to prevent layout shift.
- The LCP hero image should be discoverable in initial HTML, use `fetchpriority="high"`, and must not be lazy-loaded.
- Lazy-load below-the-fold images and maps.
- Use a local poster/preview before loading any interactive map.
- Do not load the full map until the visitor requests it.
- Every meaningful image needs concise descriptive alt text based on what is actually visible.
- Decorative images need `alt=""` plus explicit decorative semantics when appropriate.
- Do not start alt text with “image of” or “photo of”.
- Do not claim an unverified suburb/job location in alt text.
- Avoid repeating the same content image more than once on a page.
- Preload only the essential heading/body font files and the actual hero asset.
- Target zero CLS, minimal client JavaScript and no unnecessary third-party scripts.

## Technical implementation

Use a central data model for:

- site/business details;
- six services;
- confirmed service areas and postcodes;
- FAQs;
- reviews and their verified source URL;
- image paths and descriptive alt text.

Build reusable components for Header, Footer, Call Bar, responsive images, page hero, service cards, area maps, reviews, CTA bands and FAQ sections. Keep canonical/metadata/schema construction in the base layout.

Include scripts equivalent to:

```json
{
  "dev": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "check": "astro check",
  "check:site": "node scripts/check-site.mjs",
  "check:performance": "node scripts/check-performance.mjs"
}
```

The automated site check must fail for:

- missing/incorrect canonical URLs;
- missing `en-AU` or `x-default` hreflang;
- titles outside 30–60 characters;
- descriptions outside 100–150 characters;
- missing/empty non-decorative alt text;
- missing H1 or multiple H1s;
- broken internal links or missing trailing slashes;
- orphan Privacy or Terms pages;
- missing sitemap routes;
- preview-domain URLs in production HTML;
- incorrect robots directives;
- missing required schema nodes;
- duplicate content images on a page;
- US spelling in visible copy.

## Cloudflare deployment and HTTPS

Do not enable indexing until the final domain works correctly.

1. Create a separate Git repository and push only after I explicitly ask for commit/deploy.
2. Connect the repository to a separate Cloudflare Worker/Pages project.
3. Use build command `npm run build` and output directory `dist`.
4. Add `thehillsdistrictplumber.com.au` as the production custom domain.
5. Confirm the apex DNS record is proxied through Cloudflare and the certificate is active.
6. Add a proxied `www` record.
7. Add an active Cloudflare Single Redirect named `Redirect www to apex`:

```text
Match:     https://www.*
Target:    https://${1}
Status:    301 Permanent Redirect
Option:    Preserve query string
```

8. Enable HTTP-to-HTTPS redirection at Cloudflare.
9. Confirm preview hosts are not indexable.
10. Only then enable `index,follow,max-image-preview:large` on the production hostname.

## Required live verification

After deployment, verify both normal and crawler requests. Do not report completion from a local build alone.

```powershell
curl.exe -I https://thehillsdistrictplumber.com.au/
curl.exe -I https://www.thehillsdistrictplumber.com.au/
curl.exe -I https://thehillsdistrictplumber.com.au/robots.txt
curl.exe -I -L -A "AhrefsSiteAudit" https://www.thehillsdistrictplumber.com.au/robots.txt
curl.exe -I https://thehillsdistrictplumber.com.au/sitemap.xml
```

Expected results:

- apex homepage: 200;
- HTTP requests: one permanent redirect to HTTPS;
- `www`: one 301 redirect to the equivalent apex URL while retaining the path/query;
- apex robots: 200 and `text/plain`;
- sitemap: 200 and valid XML;
- canonical URLs: HTTPS apex URLs only;
- no 522, redirect loop or chain;
- no orphan indexable page;
- Ahrefs user agent can retrieve robots and pages.

Run these before handoff:

```powershell
npm run build
npm run check:site
npm run check:performance
git diff --check
```

Then inspect representative desktop, tablet and mobile screenshots, including keyboard focus, mobile navigation, the six-card grid, review carousel and sticky call bar.

## Final acceptance checklist

- [ ] Separate project and repository created.
- [ ] Approved Hills District logo used at sufficient resolution.
- [ ] Six priority suburbs and postcodes confirmed by me.
- [ ] All local claims and images are truthful.
- [ ] Six service cards display as 3×2 on desktop.
- [ ] Buttons follow the red/blue background rules.
- [ ] Mobile call bar has a restrained blue outline/glow.
- [ ] All meaningful images have descriptive alt text.
- [ ] Images are responsive, compressed and dimensioned.
- [ ] Every indexable page has one H1, valid title and valid description.
- [ ] Canonicals, `en-AU` and `x-default` are self-referencing and correct.
- [ ] Privacy and Terms have incoming footer links.
- [ ] Sitemap contains every canonical page once.
- [ ] Robots returns 200 to Ahrefs and permits crawling.
- [ ] Production domain is HTTPS and non-`www`.
- [ ] `www` redirects to apex with path/query preserved.
- [ ] 404 and preview hosts are noindex.
- [ ] Build, site and performance checks pass.
- [ ] Live URL checks pass without 522s or redirect chains.
- [ ] No commit, push or deployment occurs until I explicitly request it.

## First response expected from the new chat

Start by:

1. confirming the new project location;
2. inspecting the reference project without modifying it;
3. listing the approved assets available for reuse;
4. asking me for the six priority Hills District suburbs/postcodes and any new logo/photo assets that are still missing;
5. proposing a concise build plan before implementation.

