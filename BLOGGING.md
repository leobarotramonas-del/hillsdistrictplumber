# Publishing a Blog Post

Blog articles are Markdown files stored in `src/content/blog`. Every published article receives a clean URL under `/blog/` and is added automatically to `post-sitemap.xml`.

## Add an Article

1. Copy `src/content/blog/_draft-template.md`.
2. Rename the copy with a short lowercase filename, for example `blocked-drain-warning-signs.md`.
3. Replace the frontmatter and article text.
4. Keep `draft: true` while writing.
5. Change it to `draft: false` when the article is ready to appear on the website.
6. Run `npm run build` before publishing.

The filename becomes the URL:

```text
src/content/blog/blocked-drain-warning-signs.md
https://thehillsdistrictplumber.com.au/blog/blocked-drain-warning-signs/
```

## Frontmatter Template

```yaml
---
title: "A Clear Search Title Between 30 and 60 Characters"
description: "A useful search summary between 100 and 150 characters that accurately explains the article and what readers will learn."
publishDate: 2026-10-06
updatedDate: 2026-10-10 # Optional; remove this line until the article is updated.
author: "The Hills District Plumber"
category: "Blocked Drains"
image: "/images/blocked-drains.webp" # Optional.
imageAlt: "Describe the image clearly" # Include when an image is used.
draft: true
---
```

Use title-case section headings, short paragraphs and accurate local wording. Do not promise prices, causes, arrival times or repair outcomes that have not been confirmed.

## Sitemap Files

- `/sitemap.xml` is the sitemap index submitted to Google Search Console.
- `/page-sitemap.xml` contains the home page, service pages, service-area pages and blog index.
- `/post-sitemap.xml` contains every blog post with `draft: false`.

Draft posts do not create public pages and do not appear in either sitemap.
