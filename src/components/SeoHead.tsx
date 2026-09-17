import { useEffect } from "react";
import { PageRoute, BlogPost, CustomPage, SupportedLanguage } from "../types";
import { t } from "../data/translations";
import { HOME_ARTICLE_FAQS } from "./HomeArticle";

interface SeoHeadProps {
  page: PageRoute;
  post?: BlogPost | null;
  customPage?: CustomPage | null;
  customTitle?: string;
  customDescription?: string;
  lang?: SupportedLanguage;
}

export function SeoHead({ page, post, customPage, customTitle, customDescription, lang = "en" }: SeoHeadProps) {
  useEffect(() => {
    let title = "Scribd Downloader – Download Scribd Documents Free, No Login";
    let description =
      "Free Scribd downloader to save Scribd documents, presentations & research papers as clean PDFs. No login, no signup.";

    if (customTitle) {
      title = customTitle;
    } else if (page === "how-it-works") {
      title = "How It Works - Scribd Document Extraction Architecture & Guide";
      description = "Learn how our multi-threaded Node.js engine extracts high-resolution vector tiles and compiles unified standard PDF documents.";
    } else if (page === "blog") {
      title = "Scribd Document Tips, Tutorials & Guides - Official Blog";
      description = "Read comprehensive guides, tips, and step-by-step tutorials for downloading, converting, and reading Scribd documents offline.";
    } else if (page === "blog-article" && post) {
      title = `${post.title} | Scribd Downloader Blog`;
      description = post.excerpt;
    } else if (page === "about") {
      title = "About Scribd Downloader - Our Mission & Engineering Lab";
      description = "Discover our open-access educational document conversion utility, mission, privacy guarantees, and tech stack.";
    } else if (page === "contact") {
      title = "Contact Us & Document Extraction Support";
      description = "Get in touch with our engineering team for troubleshooting, bug reports, or feature requests.";
    } else if (page === "privacy") {
      title = "Privacy Policy - Scribd Downloader";
      description = "Learn about our strict zero-retention data privacy guarantees. All temp files purged automatically.";
    } else if (page === "terms") {
      title = "Terms of Service & Fair Use - Scribd Downloader";
      description = "Review our terms of service, fair-use guidelines, and DMCA copyright policies.";
    } else if (page === "admin") {
      title = "Admin Dashboard | Scribd Downloader Control Center";
      description = "Administrative management system for blog articles, pages, advertisements, and system analytics.";
    }

    if (customDescription) {
      description = customDescription;
    }

    document.title = title;

    // Update or insert meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update Open Graph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setOgTag("og:title", title);
    setOgTag("og:description", description);
    setOgTag("og:type", page === "blog-article" ? "article" : "website");
    setOgTag("og:url", window.location.href);

    // Dynamic JSON-LD Schema markup injection
    const existingSchema = document.getElementById("jsonld-dynamic-schema");
    if (existingSchema) existingSchema.remove();

    const script = document.createElement("script");
    script.id = "jsonld-dynamic-schema";
    script.type = "application/ld+json";

    const schemaGraph: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Scribd Downloader",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free web tool to convert and download public Scribd documents and presentations into clean high-resolution PDF files."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": page.charAt(0).toUpperCase() + page.slice(1),
            "item": window.location.href
          }
        ]
      }
    ];

    if (page === "blog-article" && post) {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author.name
        }
      });

      // FAQPage schema when the post carries FAQs (guidelines: mandatory)
      if (post.faqs && post.faqs.length > 0) {
        schemaGraph.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": post.faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        });
      }
    }

    // Custom landing pages: WebPage + FAQPage schema when FAQs present
    if (page === "custom-page" && customPage) {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": customPage.title,
        "description": customPage.metaDescription,
      });
      if (customPage.faqs && customPage.faqs.length > 0) {
        schemaGraph.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": customPage.faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        });
      }
    }

    // Homepage: FAQPage + HowTo schema for the guide + FAQ sections
    if (page === "home") {
      const faqPairs: Array<[string, string]> = [
        ["faq.q1", "faq.a1"],
        ["faq.q2", "faq.a2"],
        ["faq.q3", "faq.a3"],
        ["faq.q4", "faq.a4"],
        ["faq.q5", "faq.a5"],
        ["faq.q6", "faq.a6"],
        ["faq.q7", "faq.a7"],
        ["faq.q8", "faq.a8"],
      ];
      const mainEntity = faqPairs.map(([qk, ak]) => ({
        "@type": "Question",
        "name": t(qk, lang),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t(ak, lang)
        }
      }));
      // Long-form article FAQs (rendered on the homepage for English only)
      if (lang === "en") {
        for (const f of HOME_ARTICLE_FAQS) {
          mainEntity.push({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          });
        }
      }
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": mainEntity
      });
      // Article schema for the long-form homepage guide (English only)
      if (lang === "en") {
        schemaGraph.push({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Scribd Downloader: The Complete Guide to Saving Scribd Documents",
          "description": "A complete guide to the free Scribd downloader: what it is, how to save Scribd documents as PDF in 3 steps, supported formats and devices, legality, and fixes for common problems.",
          "image": "/images/home-download-guide.jpg",
          "datePublished": "2026-09-17",
          "dateModified": "2026-09-17",
          "author": {
            "@type": "Organization",
            "name": "Scribd Downloader"
          }
        });
      }
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": t("how.title", lang),
        "step": [1, 2, 3].map((n) => ({
          "@type": "HowToStep",
          "position": n,
          "name": t(`how.step${n}`, lang),
          "text": t(`how.step${n}Desc`, lang)
        }))
      });
    }

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph
    });

    document.head.appendChild(script);
  }, [page, post, customTitle, customDescription, lang]);

  return null;
}
