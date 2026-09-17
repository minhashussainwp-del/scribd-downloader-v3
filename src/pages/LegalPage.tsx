import React, { useState, useEffect } from "react";
import { Shield, Scale } from "lucide-react";
import { PageRoute, SupportedLanguage } from "../types";
import { loadPageContent } from "../data/siteConfig";
import { t } from "../data/translations";

interface LegalPageProps {
  initialTab?: "privacy" | "terms";
  onNavigate: (page: PageRoute) => void;
  currentLang?: SupportedLanguage;
}

export function LegalPage({ initialTab = "privacy", onNavigate, currentLang = "en" }: LegalPageProps) {
  const [pageData, setPageData] = useState<any>(null);
  useEffect(() => {
    const contents = loadPageContent();
    const match =
      contents.find((c) => c.pageKey === "legal" && c.language === currentLang) ||
      contents.find((c) => c.id === `legal-${currentLang}`) ||
      contents.find((c) => c.id === "legal");
    if (match) setPageData(match);
  }, [currentLang]);
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const privacySections = [
    { title: t("legal.p1t", currentLang), desc: t("legal.p1d", currentLang) },
    { title: t("legal.p2t", currentLang), desc: t("legal.p2d", currentLang) },
    { title: t("legal.p3t", currentLang), desc: t("legal.p3d", currentLang) },
    { title: t("legal.p4t", currentLang), desc: t("legal.p4d", currentLang) },
  ];

  const termsSections = [
    { title: t("legal.t1t", currentLang), desc: t("legal.t1d", currentLang) },
    { title: t("legal.t2t", currentLang), desc: t("legal.t2d", currentLang) },
    { title: t("legal.t3t", currentLang), desc: t("legal.t3d", currentLang) },
    { title: t("legal.t4t", currentLang), desc: t("legal.t4d", currentLang) },
  ];

  const isPrivacy = activeTab === "privacy";

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">

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
          <span className="text-slate-900 font-semibold">
            {isPrivacy ? t("legal.crumbPrivacy", currentLang) : t("legal.crumbTerms", currentLang)}
          </span>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {pageData?.title || t("legal.title", currentLang)}
          </h1>
          <p className="text-sm text-slate-600">
            {t("legal.updated", currentLang)}
            {pageData?.subtitle ? ` • ${pageData.subtitle}` : ""}
          </p>
        </div>

        {/* Layout: Sidebar + Document */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left / Legal Navigation */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition ${
                isPrivacy
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>{t("legal.privacyTab", currentLang)}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition ${
                !isPrivacy
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Scale className="w-4 h-4 text-purple-600" />
              <span>{t("legal.termsTab", currentLang)}</span>
            </button>
          </div>

          {/* Right / Document Text */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-6">

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 m-0">
                {isPrivacy ? t("legal.privacyH", currentLang) : t("legal.termsH", currentLang)}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isPrivacy ? t("legal.privacySub", currentLang) : t("legal.termsSub", currentLang)}
              </p>
            </div>

            {pageData?.content && (
              <div className="pb-6 border-b border-slate-100 whitespace-pre-wrap">{pageData.content}</div>
            )}

            {(isPrivacy ? privacySections : termsSections).map((s, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
