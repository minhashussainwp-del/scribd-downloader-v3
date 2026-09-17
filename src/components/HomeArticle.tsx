import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Long-form pillar article for the homepage (English).
// Primary keyword: "scribd downloader".
// Written per content-writing-guidelines.md: simple conversational English,
// direct answers up front for AI search, semantic entity coverage,
// internal links to cluster pages, FAQ block.

export const HOME_ARTICLE_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "Is this Scribd downloader really free?",
    answer:
      "Yes. You can use it without an account, a subscription, or any payment. Paste a link, get your file, done.",
  },
  {
    question: "Do I need a Scribd account to download?",
    answer:
      "No. The tool works in your browser and never asks you to log in to Scribd or to this site.",
  },
  {
    question: "What file format do I get?",
    answer:
      "You get a PDF file. It opens on phones, tablets, and computers, and you can print it or read it offline.",
  },
  {
    question: "Can I download Scribd documents on my phone?",
    answer:
      "Yes. It works in the mobile browser on both iPhone and Android — no app to install.",
  },
  {
    question: "Is it safe to use an online Scribd downloader?",
    answer:
      "You install nothing and share no personal details. Temporary working files are cleaned up automatically, and your downloads are never published or shared.",
  },
];

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-indigo-600 font-semibold hover:underline">
      {children}
    </a>
  );
}

const p = "text-slate-700 font-medium leading-relaxed m-0";
const h2 = "text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight pt-4";

export function HomeArticle() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <article className="bg-white py-16 sm:py-20 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center md:justify-start mb-4">
          <span className="inline-flex px-3 py-1 text-xs font-black uppercase tracking-wider text-[#3b5998] bg-[#e6edff] rounded-md">
            In-depth guide
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8">
          Scribd Downloader: The Complete Guide to Saving Scribd Documents
        </h2>

        <div className="space-y-6">
          {/* 1. Definition — direct answer up front (GEO snippet) */}
          <section>
            <h3 className={h2}>What Is a Scribd Downloader?</h3>
            <p className={p + " mt-4"}>
              A <strong className="font-bold text-slate-900">Scribd downloader</strong> is a
              free online tool that saves publicly visible Scribd documents as PDF files on
              your device. You paste the document's link, the tool reads its pages, and you
              get a clean file you can open anywhere. No account, no app install, and no
              payment needed.
            </p>
            <p className={p + " mt-4"}>
              Scribd hosts millions of documents shared by its users: lecture notes,
              research papers, presentations, manuals, sheet music, and books. Many are free
              to read in the browser, but keeping a personal copy for offline reading,
              printing, or study is where a downloader helps. Students save lecture slides
              before exams, researchers keep papers for reference, and professionals grab
              manuals they need on the job.
            </p>
            <p className={p + " mt-4"}>
              One honest note: a downloader works with documents that are publicly visible.
              Private uploads and paywalled content stay protected — no tool on this site
              can or should open those.
            </p>
            <figure className="my-6">
              <img
                src="/images/home-download-guide.jpg"
                alt="Scribd downloader tool saving a Scribd document as a PDF on a laptop"
                loading="lazy"
                className="w-full rounded-2xl border border-slate-100 shadow-sm"
              />
              <figcaption className="mt-2 text-center text-xs text-slate-500 font-medium">
                Paste a Scribd link and save the document as a clean PDF.
              </figcaption>
            </figure>
          </section>

          {/* 2. Why people use it */}
          <section>
            <h3 className={h2}>Why People Use a Scribd Downloader</h3>
            <p className={p + " mt-4"}>
              Different people come here for different reasons. The common ones:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">Students</strong> save lecture
                slides and study guides before exams, so they can revise without an
                internet connection.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Researchers</strong> keep
                papers and references in one folder instead of hunting for the same link
                twice.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Professionals</strong> grab
                manuals, templates, and reports they need on the job — often on a work
                computer where they can't install apps.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Readers</strong> move long
                documents to their e-reader or tablet for comfortable reading on the go.
              </li>
            </ul>
            <p className={p + " mt-4"}>
              In every case the appeal is the same: no signup forms, no software, no
              waiting. You get the file and get on with your day.
            </p>
          </section>

          {/* 3. How it works */}
          <section>
            <h3 className={h2}>How to Download Scribd Documents</h3>
            <p className={p + " mt-4"}>
              Downloading takes less than a minute. Here is the whole process:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">Copy the link.</strong> Open
                the Scribd document in your browser and copy its URL from the address bar.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Paste it above.</strong> Paste
                the link into the download box at the top of this page and start the
                download.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Save the PDF.</strong> Wait a
                few seconds while the pages are read, then download your file.
              </li>
            </ol>
            <p className={p + " mt-4"}>
              Want more detail? Read the <InlineLink href="/how-it-works">step-by-step guide</InlineLink>{" "}
              that walks through each part of the process. If a download ever fails, the{" "}
              <InlineLink href="/scribd-downloader-not-working">troubleshooting guide</InlineLink>{" "}
              covers the fixes that actually work.
            </p>
          </section>

          {/* 3. Document types — semantic entity coverage */}
          <section>
            <h3 className={h2}>What Can You Download from Scribd?</h3>
            <p className={p + " mt-4"}>
              Scribd is more than just one kind of file. A good downloader handles the
              formats people actually look for. You get a PDF either way — a format that
              keeps the layout intact and opens on any device without special software.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">PDF documents</strong> — the
                most common format: lecture notes, reports, study guides, and manuals.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Presentations</strong> — slides
                and decks, saved so you can review them offline. See{" "}
                <InlineLink href="/presentations">downloading Scribd presentations</InlineLink>{" "}
                and <InlineLink href="/ppt">PPT files</InlineLink>.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Ebooks</strong> — books and
                long reads you want on your reader. See{" "}
                <InlineLink href="/epub">the EPUB guide</InlineLink>.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Research papers</strong> —
                academic papers and journal articles for study and reference. See{" "}
                <InlineLink href="/research-papers">research papers</InlineLink>.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Theses</strong> — bachelor's
                and master's theses shared by students. See{" "}
                <InlineLink href="/thesis">downloading a thesis</InlineLink>.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Sheet music</strong> — scores
                and tabs for practice. See <InlineLink href="/sheet-music">sheet music</InlineLink>.
              </li>
            </ul>
          </section>

          {/* 4. Devices */}
          <section>
            <h3 className={h2}>Use a Scribd Downloader on Any Device</h3>
            <p className={p + " mt-4"}>
              There is nothing to install, so the tool works wherever your browser works:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">iPhone</strong> — works in
                Safari. Paste the link, download, and open the PDF in Files.{" "}
                <InlineLink href="/iphone">iPhone guide</InlineLink>
              </li>
              <li>
                <strong className="font-bold text-slate-900">Android</strong> — works in
                Chrome or any mobile browser.{" "}
                <InlineLink href="/android">Android guide</InlineLink>
              </li>
              <li>
                <strong className="font-bold text-slate-900">Desktop</strong> — Windows,
                Mac, and Linux, in any modern browser.{" "}
                <InlineLink href="/desktop">Desktop guide</InlineLink>
              </li>
            </ul>
          </section>

          {/* 5. Comparison — honest, no invented claims */}
          <section>
            <h3 className={h2}>Scribd Downloader vs Other Options</h3>
            <p className={p + " mt-4"}>
              You have a few ways to keep a Scribd document. Here is how they compare:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">Scribd's own app</strong> —
                official, but offline reading needs a paid subscription. If you only need
                one or two documents, that monthly cost is hard to justify.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Other free tools</strong> —
                several exist, and quality varies. Some are slow, some cover your screen in
                pop-ups. We compared the well-known ones in{" "}
                <InlineLink href="/alternatives">Scribd downloader alternatives</InlineLink>.
              </li>
              <li>
                <strong className="font-bold text-slate-900">This tool</strong> — free, no
                login, no install. Paste a link and get a PDF. It does one job and stays
                out of your way.
              </li>
            </ul>
          </section>

          {/* 6. Legality — fair use */}
          <section>
            <h3 className={h2}>Is It Legal to Download from Scribd?</h3>
            <p className={p + " mt-4"}>
              Short answer: it depends on what you download and why. Keep copies of your
              own uploads, public-domain works, and documents shared freely by their
              authors. Respect copyright — don't re-upload someone else's work as your own,
              and don't sell copies of things you didn't create.
            </p>
            <p className={p + " mt-4"}>
              Saving a document for personal study or research usually falls under fair use,
              but the exact rules differ by country, and fair use has limits. When in
              doubt, check the source and the author's terms. Read the{" "}
              <InlineLink href="/fair-use">fair use guide</InlineLink> for the full picture.
            </p>
          </section>

          {/* 7. Troubleshooting */}
          <section>
            <h3 className={h2}>Common Problems and Quick Fixes</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                <strong className="font-bold text-slate-900">Download not working?</strong>{" "}
                Check that the link is a full scribd.com document URL, then try again. The{" "}
                <InlineLink href="/scribd-downloader-not-working">troubleshooting guide</InlineLink>{" "}
                covers every common fix.
              </li>
              <li>
                <strong className="font-bold text-slate-900">File looks wrong?</strong>{" "}
                Some documents take longer to render. Wait for the process to finish before
                downloading.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Link not recognized?</strong>{" "}
                Make sure you copied the document page URL, not a search or library page.
              </li>
              <li>
                <strong className="font-bold text-slate-900">Download is slow?</strong>{" "}
                Long documents take longer — a 200-page book needs more time than a
                10-slide deck. Give it a minute before retrying.
              </li>
            </ul>
          </section>

          {/* Tips */}
          <section>
            <h3 className={h2}>Tips for Better Downloads</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium leading-relaxed mt-4">
              <li>
                Copy the link from the document's own page, not from Google results —
                that avoids broken or shortened URLs.
              </li>
              <li>
                On phones, download over Wi-Fi for large files so you don't eat through
                mobile data.
              </li>
              <li>
                Rename the file right after downloading. "scribd-doc.pdf" is hard to find
                later; "marketing-plan-2026.pdf" is not.
              </li>
              <li>
                Keep your own library: one folder for study, one for work. Future you will
                say thanks.
              </li>
            </ul>
          </section>

          {/* 8. FAQ */}
          <section>
            <h3 className={h2}>Scribd Downloader FAQ</h3>
            <div className="border-t border-slate-200 mt-4">
              {HOME_ARTICLE_FAQS.map((faq, i) => (
                <div key={i} className="border-b border-slate-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="pb-4 text-slate-600 font-medium text-sm leading-relaxed pr-8">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
