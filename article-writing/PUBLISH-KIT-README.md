# PUBLISH KIT — Instructions for the AI publishing this content

You are given 4 content zips + this kit. Your job: publish ALL articles to the
Scribd-downloader website (React + i18n, 6 locales: en, br/pt-BR, es, fr, de, id).

## What you received

| Zip | Contents |
|---|---|
| `seo-rewrite-01-homepage.zip` | 1 homepage article (en) |
| `seo-rewrite-02-blogs.zip` | 20 blog posts (5 topics × 6 locales, minus hi) |
| `seo-rewrite-03-landing-pages.zip` | 69 SEO landing pages (en/hi/id/es/fr) |
| `seo-rewrite-04-all-languages.zip` | 232 locale variants — every topic × 6 locales |
| `seo-rewrite-00-publish-kit.zip` (this kit) | `content-manifest.csv` (322 rows) + this README |

`content-manifest.csv` columns: `type, slug, locale, seo_title, article_md_path, images_zip_path`.
Paths are relative to the extracted `seo-rewrite/` folder.

## Each article package contains

- `article.md` — full package in a fixed 22-section format. Extract ONLY these:
  1. **SEO Title** (section 1)
  2. **Meta Description** (section 2)
  3. **URL Slug** (section 3) — use verbatim for the page/post URL
  4. **H1** (section 4)
  11. **Full Article** (section 11) — markdown body → render as HTML
  12. **FAQ** (section 12) — render as FAQ accordion + FAQPage JSON-LD
  16. **Image Alt Text** (section 16) — alt text per image
  17. **Schema Recommendation** (section 17) — emit exactly the schemas listed
  13. **Internal Link Suggestions** (section 13) — wire these links between pages
- `<slug>-images.zip` — 2 JPGs per article. Extract to the site's public images
  folder, reference with the alt text from section 16.
- IGNORE sections 5–10 (brief/keywords/outline — planning metadata) and 18–22
  (E-E-A-T notes, QA checklists, fact-check notes — internal, do not publish).

## How to publish (do it in this order, batch by batch)

1. **Confirm the plan first.** Before writing files, reply with: how many
   pages/posts per batch, the URL pattern per locale, and where images go.
   Wait for approval.
2. **Batch 1 — homepage:** `type=homepage`. The 6 homepage packages
   (en + br/es/fr/de/id) are the homepage content per locale.
3. **Batch 2 — blog:** `type=blog`. 30 posts total (5 topics × 6 locales).
   Keep one post per (topic, locale); never merge locales.
4. **Batch 3 — landing pages:** `type=landing-page` + `type=landing-page-locale`.
   One page per (slug, locale). URL slug verbatim from section 3.
5. **After each batch:** build the project and report broken links / missing images.

## Rules

- One (slug, locale) = one page. Never duplicate the same slug in one locale.
- Locale variants are separate pages (e.g. `thesis-br` is the Brazilian
  Portuguese version of the thesis topic) — do not merge them into the English page.
- `hi` locale rows are Hinglish extras for India — publish as-is.
- Keep the site's existing design system, header/footer, and routing.
  Add new pages to sitemap.xml. Do not remove existing core pages
  (About, How It Works, Contact, Legal).
- Images: descriptive filenames already set; use the provided alt text verbatim.
- If any article.md is malformed, report the slug and skip it — don't invent content.
