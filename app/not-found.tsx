import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader } from "./ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="editorial-main">
        <PageIntro>
          <h1>Page not found.</h1>
          <p className="page-intro-lede">
            The page may have moved or may not be public.
          </p>
          <Link className="text-link" href="/">Return home</Link>
        </PageIntro>
      </main>
      <SiteFooter />
    </div>
  );
}
