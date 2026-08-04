import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tim Chao, a Northwestern student whose interests span photonics, computing, algorithms, basketball, cooking, and quantitative trading.",
  alternates: { canonical: "/about" },
};

const skills = [
  "Python",
  "C++",
  "PyTorch",
  "NumPy",
  "TensorFlow",
  "Qiskit",
  "Assembly",
  "Verilog",
  "LaTeX",
  "Markdown",
];

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader current="about" />
      <main id="main-content" className="editorial-main">
        <PageIntro>
          <h1>About Me</h1>
          <p className="page-intro-lede">
            I grew up in Seattle, Beijing, and Taipei and now study electrical
            engineering and mathematics at Northwestern University in Chicago.
          </p>
        </PageIntro>

        <div className="about-grid">
          <article className="article-body">
            <section className="about-copy" aria-label="About Tim Chao">
              <p>
                I enjoy solving technically challenging problems, especially in
                fast-paced environments. I first developed that interest through
                competitive mathematics and programming; I now pursue it through
                research in photonics, computing, and algorithms. I am still
                exploring what I want to work on in the long term.
              </p>
              <p>
                Outside of academics, basketball has been a constant in my life
                and a way to connect with people wherever I have lived. I also
                enjoy cooking, both as a creative outlet and because I find the
                process itself rewarding. My other interests include running,
                building custom mechanical keyboards, and algorithmic and
                quantitative trading.
              </p>
            </section>

            <section>
              <h2>Skills</h2>
              <ul className="skill-list" aria-label="Technical skills">
                {skills.map((skill) => (
                  <li className="skill-item" key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="about-aside" aria-label="Personal details">
            <dl className="fact-list">
              <div>
                <dt>Based in</dt>
                <dd>Evanston, Illinois</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>English and Chinese</dd>
              </div>
              <div>
                <dt>Current home</dt>
                <dd>Northwestern University</dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
