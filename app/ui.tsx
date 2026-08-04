import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="Tim Chao, home">
      Tim Chao
    </Link>
  );
}

export function SiteHeader({
  current,
}: {
  current?: "home" | "work" | "about";
}) {
  return (
    <>
      <div className="floating-wordmark">
        <Wordmark />
      </div>
      <header className="site-header">
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            <ul className="site-nav">
              <li>
                <Link href="/" aria-current={current === "home" ? "page" : undefined}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" aria-current={current === "work" ? "page" : undefined}>
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" aria-current={current === "about" ? "page" : undefined}>
                  About
                </Link>
              </li>
              <li>
                <a href="/tim-chao-resume.pdf">Resume</a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Tim Chao</span>
    </footer>
  );
}

export function PageIntro({ children }: { children: ReactNode }) {
  return <header className="page-intro">{children}</header>;
}

export function WorkEntry({
  id,
  title,
  summary,
  meta,
  href,
  linkLabel,
}: {
  id?: string;
  title: string;
  summary: string;
  meta: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article className="work-entry" id={id}>
      <h3 className="work-entry-title">
        {href ? (
          <a href={href}>
            {title}{" "}
            {linkLabel ? <span className="link-label">({linkLabel})</span> : null}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="work-entry-summary">{summary}</p>
      <p className="work-entry-meta">{meta}</p>
    </article>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list" aria-label="Topics">
      {tags.map((tag) => (
        <li className="tag" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
