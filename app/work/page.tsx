import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader, WorkEntry } from "../ui";
import { workItems } from "../work-items";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Research, software, and publications by Tim Chao across machine learning, photonics, and quantum systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="site-shell">
      <SiteHeader current="work" />
      <main id="main-content" className="editorial-main">
        <PageIntro>
          <h1>Work</h1>
          <p className="page-intro-lede">
            Research, software, publications, and technical exploration across
            machine learning, photonics, and quantum systems.
          </p>
        </PageIntro>

        <section className="archive-group" aria-labelledby="all-work">
          <h2 id="all-work">All Work</h2>
          <div className="work-entry-list">
            {workItems.map((item) => (
              <WorkEntry key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
