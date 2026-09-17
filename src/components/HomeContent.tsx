import React, { useState } from "react";
import {
  Link,
  ClipboardPaste,
  Download,
  Zap,
  ShieldCheck,
  Monitor,
  CreditCard,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { BlogPost, PageRoute, SupportedLanguage, PageContent } from "../types";
import { t } from "../data/translations";
import { HomeArticle } from "./HomeArticle";

interface HomeContentProps {
  onNavigate: (page: PageRoute) => void;
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  currentLang?: SupportedLanguage;
  pageContent?: PageContent;
}

// Lightweight inline markdown: **bold**, *italic*, `code`, [text](url)
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let idx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-in${idx++}`;
    if (tok.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-bold text-slate-900">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-sm font-mono"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith("[")) {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (lm) {
        parts.push(
          <a
            key={key}
            href={lm[2]}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {lm[1]}
          </a>
        );
      } else {
        parts.push(tok);
      }
    } else {
      parts.push(<em key={key}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Renders one content block: headings, images, lists, or paragraphs
function renderContentBlock(block: string, i: number): React.ReactNode {
  const trimmed = block.trim();
  if (!trimmed) return null;

  // Standalone image: ![alt](src)
  const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
  if (imgMatch) {
    return (
      <figure key={i} className="my-2">
        <img
          src={imgMatch[2]}
          alt={imgMatch[1]}
          loading="lazy"
          className="w-full rounded-2xl border border-slate-100 shadow-sm"
        />
        {imgMatch[1] && (
          <figcaption className="mt-2 text-center text-xs text-slate-500 font-medium">
            {imgMatch[1]}
          </figcaption>
        )}
      </figure>
    );
  }

  if (trimmed.startsWith("## ")) {
    const lines = trimmed.split("\n");
    const headingText = lines[0].replace("## ", "").trim();
    const bodyText = lines.slice(1).join("\n").trim();
    return (
      <React.Fragment key={i}>
        <h3 className="text-xl font-bold text-slate-900 pt-3">
          {renderInline(headingText, `h${i}`)}
        </h3>
        {bodyText && (
          <p className="text-slate-700 font-medium leading-relaxed m-0">
            {renderInline(bodyText, `hb${i}`)}
          </p>
        )}
      </React.Fragment>
    );
  }
  if (trimmed.startsWith("### ")) {
    const lines = trimmed.split("\n");
    const headingText = lines[0].replace("### ", "").trim();
    const bodyText = lines.slice(1).join("\n").trim();
    return (
      <React.Fragment key={i}>
        <h4 className="text-lg font-bold text-slate-800 pt-2">
          {renderInline(headingText, `sh${i}`)}
        </h4>
        {bodyText && (
          <p className="text-slate-700 font-medium leading-relaxed m-0">
            {renderInline(bodyText, `shb${i}`)}
          </p>
        )}
      </React.Fragment>
    );
  }

  const lines = trimmed.split("\n");
  // Bullet list
  if (lines.length > 1 && lines.every((l) => /^\s*[-•]\s+/.test(l))) {
    return (
      <ul key={i} className="list-disc pl-6 space-y-2 text-slate-700 font-medium leading-relaxed m-0">
        {lines.map((l, j) => (
          <li key={j}>{renderInline(l.replace(/^\s*[-•]\s+/, ""), `bl${i}-${j}`)}</li>
        ))}
      </ul>
    );
  }
  // Numbered list
  if (lines.length > 1 && lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
    return (
      <ol key={i} className="list-decimal pl-6 space-y-2 text-slate-700 font-medium leading-relaxed m-0">
        {lines.map((l, j) => (
          <li key={j}>{renderInline(l.replace(/^\s*\d+[.)]\s+/, ""), `nl${i}-${j}`)}</li>
        ))}
      </ol>
    );
  }

  return (
    <p key={i} className="text-slate-700 font-medium leading-relaxed m-0">
      {renderInline(trimmed, `p${i}`)}
    </p>
  );
}

export function HomeContent({
  onNavigate,
  posts,
  onSelectPost,
  currentLang = "en",
  pageContent,
}: HomeContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic FAQs based on current language
  const faqs = [
    { q: t("faq.q1", currentLang), a: t("faq.a1", currentLang) },
    { q: t("faq.q2", currentLang), a: t("faq.a2", currentLang) },
    { q: t("faq.q3", currentLang), a: t("faq.a3", currentLang) },
    { q: t("faq.q4", currentLang), a: t("faq.a4", currentLang) },
    { q: t("faq.q5", currentLang), a: t("faq.a5", currentLang) },
    { q: t("faq.q6", currentLang), a: t("faq.a6", currentLang) },
    { q: t("faq.q7", currentLang), a: t("faq.a7", currentLang) },
    { q: t("faq.q8", currentLang), a: t("faq.a8", currentLang) },
  ];

  // Filter posts matching current language, with fallback
  const langPosts = posts.filter(
    (p) => (p.language || "en") === currentLang && p.status !== "draft"
  );
  const displayPosts = langPosts.length > 0 ? langPosts : posts.filter((p) => p.status !== "draft");

  return (
    <div className="w-full">
      {/* How It Works Section */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
            {t("how.title", currentLang)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-slate-200 z-0" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-[#eff4ff] text-[#3b5998] rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-xs border border-[#d0ddff]">
                1
              </div>
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-xs">
                <Link className="w-7 h-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t("how.step1", currentLang)}
              </h3>
              <p className="text-slate-600 font-medium">
                {t("how.step1Desc", currentLang)}
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-[#eff4ff] text-[#3b5998] rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-xs border border-[#d0ddff]">
                2
              </div>
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-xs">
                <ClipboardPaste className="w-7 h-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t("how.step2", currentLang)}
              </h3>
              <p className="text-slate-600 font-medium">
                {t("how.step2Desc", currentLang)}
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-[#eff4ff] text-[#3b5998] rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-xs border border-[#d0ddff]">
                3
              </div>
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-xs">
                <Download className="w-7 h-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t("how.step3", currentLang)}
              </h3>
              <p className="text-slate-600 font-medium">
                {t("how.step3Desc", currentLang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#f8fafc] py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
            {t("benefits.title", currentLang)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t("benefits.fastTitle", currentLang)}
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                {t("benefits.fastDesc", currentLang)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t("benefits.safeTitle", currentLang)}
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                {t("benefits.safeDesc", currentLang)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t("benefits.devicesTitle", currentLang)}
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                {t("benefits.devicesDesc", currentLang)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t("benefits.freeTitle", currentLang)}
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                {t("benefits.freeDesc", currentLang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area (Two Columns) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Content Column (Main Guide / Editable Page Content) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center md:justify-start">
                  <span className="inline-flex px-3 py-1 text-xs font-black uppercase tracking-wider text-[#3b5998] bg-[#e6edff] rounded-md">
                    {t("guide.badge", currentLang)}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {pageContent?.title || t("guide.title", currentLang)}
                </h2>
                {pageContent?.subtitle && (
                  <p className="text-base text-slate-600 font-medium">
                    {pageContent.subtitle}
                  </p>
                )}
                <p className="text-sm text-slate-500 font-medium">
                  {t("guide.editionNote", currentLang)}
                </p>
              </div>

              {/* Guide Content Display */}
              <div className="prose prose-slate max-w-none space-y-6">
                {pageContent?.content ? (
                  <div className="font-sans text-slate-700 text-base leading-relaxed space-y-4">
                    {pageContent.content.split("\n\n").map((block, i) => renderContentBlock(block, i))}
                  </div>
                ) : (
                  <>
                    <p className="text-slate-700 font-medium leading-relaxed m-0">
                      {t("guide.p1", currentLang)}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 m-0 mt-8">
                      {t("guide.subheading", currentLang)}
                    </h3>
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {t("guide.step1Title", currentLang)}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {t("guide.step1Desc", currentLang)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {t("guide.step2Title", currentLang)}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {t("guide.step2Desc", currentLang)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {t("guide.step3Title", currentLang)}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {t("guide.step3Desc", currentLang)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* FAQ Accordion */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {t("faq.title", currentLang)}
                </h3>
                <div className="border-t border-slate-200">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-slate-200">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      >
                        <span className="font-bold text-slate-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform ${
                            openFaq === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="pb-4 text-slate-600 font-medium text-sm leading-relaxed pr-8">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Info Box */}
              <div className="bg-[#eff4ff] border border-[#d0ddff] rounded-xl p-5">
                <h4 className="text-sm font-bold text-[#1e3a8a] mb-1">
                  {t("guide.badge", currentLang)}
                </h4>
                <p className="text-sm text-[#3b5998] font-medium leading-relaxed">
                  {t("hero.check1", currentLang)} • {t("hero.check2", currentLang)} • {t("hero.check3", currentLang)}
                </p>
              </div>

              {/* Related Articles in Current Language */}
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t("blog.previewTitle", currentLang)}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {t("blog.previewSubtitle", currentLang)}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {displayPosts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="cursor-pointer group p-3 rounded-xl border border-slate-100 hover:border-indigo-200 transition bg-white shadow-2xs"
                      onClick={() => {
                        onSelectPost(post);
                        onNavigate("blog-article");
                      }}
                    >
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {post.featured && (
                          <div className="absolute top-1 right-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-bold text-indigo-600">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mb-1">
                        <span className="font-bold text-indigo-600">{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-indigo-600 line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <span className="text-[11px] font-bold text-indigo-600 group-hover:underline">
                        {t("blog.readArticle", currentLang)} →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick CTA Box */}
              <div className="bg-indigo-600 rounded-2xl p-6 text-center text-white shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  {t("blog.quickCtaTitle", currentLang)}
                </h3>
                <p className="text-indigo-100 text-sm font-medium mb-6">
                  {t("blog.quickCtaDesc", currentLang)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    const input = document.getElementById("hero-url-input") as HTMLInputElement;
                    input?.focus();
                  }}
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition shadow-xs cursor-pointer"
                >
                  {t("blog.quickCtaBtn", currentLang)} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long-form pillar article (English only for now) */}
      {currentLang === "en" && <HomeArticle />}
    </div>
  );
}
