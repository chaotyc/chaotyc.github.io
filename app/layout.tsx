import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./site-url";

const title = "Tim Chao — Research & Technical Work";
const description =
  "Research, software, and technical work across machine learning, photonics, and quantum systems by Tim Chao.";

const themeInitScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("pref-theme");
      var theme = storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — Tim Chao",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tim Chao",
    title,
    description,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1731,
        height: 909,
        alt: "Tim Chao — research and technical work across machine learning, photonics, and quantum systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og.png`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim Chao",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Northwestern University",
    },
    knowsAbout: [
      "Machine learning",
      "Photonics",
      "Quantum communications",
      "Differentiable simulation",
      "Distributed inference",
    ],
    sameAs: [
      "https://github.com/chaotyc",
      "https://www.linkedin.com/in/y-cchao",
      "https://scholar.google.com/citations?user=KEgyxv4AAAAJ",
      "https://x.com/chaotycc",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
