import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader, WorkEntry } from "./ui";
import { selectedWorkItems } from "./work-items";

export const metadata: Metadata = {
  title: "Research & technical work",
  description:
    "Tim Chao is a Northwestern undergraduate pursuing a combined B.S./M.S. in Electrical Engineering and Mathematics and researching photonic systems.",
  alternates: { canonical: "/" },
};

const socialProfiles = [
  {
    label: "GitHub",
    accessibleLabel: "Tim Chao on GitHub",
    href: "https://github.com/chaotyc",
    icon: "github",
    rel: "me",
  },
  {
    label: "LinkedIn",
    accessibleLabel: "Tim Chao on LinkedIn",
    href: "https://www.linkedin.com/in/y-cchao",
    icon: "linkedin",
    rel: "me",
  },
  {
    label: "Google Scholar",
    accessibleLabel: "Tim Chao on Google Scholar",
    href: "https://scholar.google.com/citations?user=KEgyxv4AAAAJ",
    icon: "google-scholar",
    rel: "me",
  },
] as const;

const deliberateOcclusionPdf =
  "https://www.researchgate.net/profile/Chan-Hung-Tse-2/publication/376227413_Deliberate_Occlusion_Asymmetry_in_Facial_Expression/links/660a3b18b839e05a20b52621/Deliberate-Occlusion-Asymmetry-in-Facial-Expression.pdf";

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader current="home" />

      <main id="main-content" className="home-main">
        <PageIntro>
          <h1>Tim Chao</h1>
          <p className="page-intro-lede">
            I am an undergraduate student at Northwestern University pursuing a
            combined B.S./M.S. degree in Electrical Engineering and Mathematics,
            expected to graduate in 2028. At Northwestern’s Center for Photonic
            Communication and Computing, I conduct research on fiber-optic
            networks under the supervision of Professor Prem Kumar. I also
            participate in developing and simulating photonic-native algorithms
            for an ARPA-E project at MITRE focused on energy-efficient AI using
            photonic integrated circuits.
          </p>
          <p className="home-location">Evanston, Illinois</p>
          <ul className="profile-links" aria-label="Professional profiles">
            {socialProfiles.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  aria-label={profile.accessibleLabel}
                  title={profile.label}
                  rel={"rel" in profile ? profile.rel : undefined}
                >
                  <span
                    className={`profile-icon profile-icon-${profile.icon}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </PageIntro>

        <section className="home-section" aria-labelledby="selected-work-title">
          <div className="home-section-heading">
            <h2 id="selected-work-title">Selected Work</h2>
            <Link href="/work">All Work</Link>
          </div>

          <div className="work-entry-list">
            {selectedWorkItems.map((item) => (
              <WorkEntry key={item.id} {...item} />
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="publications-title">
          <div className="home-section-heading">
            <h2 id="publications-title">Publications</h2>
          </div>

          <div className="entry-list">
            <article className="entry-row publication-entry">
              <h3>
                <a href={deliberateOcclusionPdf}>
                  Deliberate Occlusion: Asymmetry in Facial Expression{" "}
                  <span className="link-label">(PDF)</span>
                </a>
              </h3>
              <p>
                Hung-Tse Chan, Yen-Chun Chao, and Chih-Hsien Hsia. 2023 IEEE
                6th International Conference on Knowledge Innovation and
                Invention, pp. 338–341.
              </p>
              <p className="entry-meta">Conference paper · ICKII 2023</p>
            </article>

            <article className="entry-row publication-entry">
              <h3>
                <a href="/papers/real-time-polarization-stabilization.pdf">
                  Real-Time Polarization Stabilization{" "}
                  <span className="link-label">(PDF)</span>
                </a>
              </h3>
              <p>
                Physics-informed sequence modeling for real-time polarization
                stabilization in quantum networks.
              </p>
              <p className="entry-meta">Conference paper · FIO LS 2026</p>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
