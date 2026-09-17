import React, { useState, useEffect } from "react";
import { ShieldCheck, Zap, FileDown, Globe, CheckCircle2, XCircle, Scale } from "lucide-react";
import { PageRoute, SupportedLanguage } from "../types";
import { loadPageContent } from "../data/siteConfig";
import { t } from "../data/translations";

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onCtaClick: () => void;
  currentLang?: SupportedLanguage;
}

export function AboutPage({ onNavigate, onCtaClick, currentLang = "en" }: AboutPageProps) {
  const [pageData, setPageData] = useState<any>(null);
  useEffect(() => {
    const contents = loadPageContent();
    const match =
      contents.find((c) => c.pageKey === "about" && c.language === currentLang) ||
      contents.find((c) => c.id === `about-${currentLang}`) ||
      contents.find((c) => c.id === "about");
    if (match) setPageData(match);
  }, [currentLang]);

  const values = [
    { icon: Zap, title: t("about.v1t", currentLang), desc: t("about.v1d", currentLang) },
    { icon: ShieldCheck, title: t("about.v2t", currentLang), desc: t("about.v2d", currentLang) },
    { icon: FileDown, title: t("about.v3t", currentLang), desc: t("about.v3d", currentLang) },
    { icon: Globe, title: t("about.v4t", currentLang), desc: t("about.v4d", currentLang) },
  ];

  const doesList = [t("about.does1", currentLang), t("about.does2", currentLang), t("about.does3", currentLang)];
  const dontList = [t("about.dont1", currentLang), t("about.dont2", currentLang), t("about.dont3", currentLang)];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="hover:text-indigo-600 transition"
          >
            {t("nav.home", currentLang)}
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{t("about.crumb", currentLang)}</span>
        </div>

        {/* Hero & Mission Statement */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            {t("about.badge", currentLang)}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {pageData?.title || "About Scribd Downloader"}
          </h1>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-wrap text-left sm:text-center">
            {pageData?.content || ""}
          </div>
        </div>

        {/* Value Props Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t("about.vTitle", currentLang)}
            </h2>
            <p className="text-sm text-slate-600">
              {t("about.vSub", currentLang)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Does / Doesn't */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">{t("about.doesTitle", currentLang)}</h3>
            <ul className="space-y-3">
              {doesList.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">{t("about.dontTitle", currentLang)}</h3>
            <ul className="space-y-3">
              {dontList.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fair Use Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-slate-900">{t("about.fairTitle", currentLang)}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t("about.fairDesc", currentLang)}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-indigo-600/15 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">{t("about.ctaTitle", currentLang)}</h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-lg mx-auto">
            {t("about.ctaDesc", currentLang)}
          </p>
          <button
            type="button"
            onClick={() => {
              onNavigate("home");
              setTimeout(onCtaClick, 100);
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-900 font-bold text-xs sm:text-sm transition shadow-lg active:scale-95 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>{t("about.ctaBtn", currentLang)}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
