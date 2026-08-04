import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const exportRoot = new URL("../dist/client/", import.meta.url);

function htmlFile(pathname = "/") {
  if (pathname === "/") return new URL("index.html", exportRoot);
  if (pathname === "/404") return new URL("404.html", exportRoot);

  const route = pathname.replace(/^\/+|\/+$/g, "");
  return new URL(`${route}/index.html`, exportRoot);
}

function exportedHtml(pathname = "/") {
  return readFile(htmlFile(pathname), "utf8");
}

async function assertRouteNotExported(pathname) {
  const route = pathname.replace(/^\/+|\/+$/g, "");

  for (const file of [`${route}/index.html`, `${route}.html`]) {
    await assert.rejects(access(new URL(file, exportRoot)), { code: "ENOENT" });
  }
}

test("exports the simplified homepage", async () => {
  const html = await exportedHtml();

  assert.match(html, /<title>Research &amp; technical work — Tim Chao<\/title>/i);
  assert.match(html, /<h1>Tim Chao<\/h1>/i);
  assert.doesNotMatch(html, /Hi, I(?:&apos;|&#x27;|')?m/i);
  assert.doesNotMatch(html, /Electrical engineering \+ mathematics/i);
  assert.match(html, /pursuing a combined B\.S\.\/M\.S\. degree/i);
  assert.match(html, /Center for Photonic Communication and Computing/i);
  assert.match(html, /supervision of Professor Prem Kumar/i);
  assert.match(html, /ARPA-E project at MITRE/i);
  assert.match(html, /energy-efficient AI using photonic integrated circuits/i);
  assert.match(html, />Real-Time Polarization Stabilization\s*</);
  assert.match(html, /Conference paper\s*·\s*FIO LS 2026/i);
  assert.match(
    html,
    />Optical-Native Computing and Differentiable Photonic Simulation</,
  );
  assert.match(html, />PyPCL: Learning with Ambiguous Labels/);
  assert.match(
    html,
    /with projected results kept distinct from measured hardware performance/i,
  );
  assert.match(
    html,
    /comparing partial-label and complementary-label learning methods/i,
  );
  assert.match(html, />Publications<\/h2>/i);
  assert.doesNotMatch(html, /Publications\s*(?:&amp;|&)\s*talks/i);

  const selectedWorkStart = html.indexOf('id="selected-work-title"');
  const publicationsStart = html.indexOf('id="publications-title"');
  assert.ok(selectedWorkStart >= 0 && publicationsStart > selectedWorkStart);
  const selectedWorkHtml = html.slice(selectedWorkStart, publicationsStart);
  assert.doesNotMatch(selectedWorkHtml, /Real-time polarization/i);
  assert.match(
    selectedWorkHtml,
    /href="https:\/\/github\.com\/chaotyc\/PyPCL"/i,
  );

  assert.match(html, /aria-label="Professional profiles"/i);
  assert.match(
    html,
    /<button(?=[^>]*class="theme-toggle")(?=[^>]*aria-label="Toggle color theme")(?=[^>]*accesskey="t")[^>]*>/i,
  );
  assert.match(html, /theme-toggle-moon/i);
  assert.match(html, /theme-toggle-sun/i);
  assert.match(html, /localStorage\.getItem\("pref-theme"\)/i);
  assert.match(html, /prefers-color-scheme: dark/i);
  assert.match(html, /href="https:\/\/github\.com\/chaotyc"/i);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/y-cchao"/i);
  assert.match(
    html,
    /href="https:\/\/scholar\.google\.com\/citations\?user=KEgyxv4AAAAJ"/i,
  );
  for (const icon of ["github", "linkedin", "google-scholar"]) {
    assert.match(html, new RegExp(`profile-icon-${icon}`, "i"));
  }
  assert.match(html, /href="\/papers\/real-time-polarization-stabilization\.pdf"/i);
  assert.match(html, /Deliberate-Occlusion-Asymmetry-in-Facial-Expression\.pdf/i);
  assert.match(html, /href="\/tim-chao-resume\.pdf"[^>]*>Resume<\/a>/i);
  assert.doesNotMatch(html, /href="\/cv"/i);
  assert.doesNotMatch(html, /href="\/work\//i);
  assert.doesNotMatch(html, /<h2[^>]*>About<\/h2>/i);
  assert.doesNotMatch(html, /signature-graphic|project-visual/i);
  const footerStart = html.indexOf('<footer class="site-footer"');
  const footerEnd = html.indexOf("</footer>", footerStart);
  assert.ok(footerStart >= 0 && footerEnd > footerStart);
  assert.doesNotMatch(html.slice(footerStart, footerEnd), /<a\b/i);
  assert.match(
    html,
    /<meta(?=[^>]*property="og:image")(?=[^>]*content="https:\/\/chaotyc\.github\.io\/og\.png")[^>]*>/i,
  );
});

test("exports one flat work list with direct PDF and repository links", async () => {
  const html = await exportedHtml("/work");

  assert.equal((html.match(/<section\b/gi) ?? []).length, 1);
  assert.match(html, />Selected Work<\/h2>/);
  assert.match(
    html,
    /Real-Time Polarization Stabilization of Optical Signals in Quantum Networks via Physics-Informed Sequence Modeling/,
  );
  assert.match(
    html,
    /Optical-Native Computing and Differentiable Photonic Simulation/,
  );
  assert.match(html, /PyPCL: Learning with Ambiguous Labels/);
  assert.match(html, /Deliberate Occlusion: Asymmetry in Facial Expression/);
  assert.match(html, /href="\/papers\/real-time-polarization-stabilization\.pdf"/i);
  assert.match(html, /Deliberate-Occlusion-Asymmetry-in-Facial-Expression\.pdf/i);
  assert.match(html, /id="optical-native-computing"/i);
  assert.match(html, /id="pypcl"/i);
  assert.match(html, /href="https:\/\/github\.com\/chaotyc\/PyPCL"/i);
  assert.match(html, /Conference paper\s*·\s*FIO LS 2026/i);
  assert.doesNotMatch(html, /Research paper\s*·\s*FIO 2026/i);
  assert.doesNotMatch(html, /href="\/work\//i);
  assert.doesNotMatch(html, /class="tag"|>#/i);
  assert.equal((html.match(/class="work-entry"/g) ?? []).length, 4);
});

test("exports the simplified About page", async () => {
  const html = await exportedHtml("/about");

  for (const skill of ["Python", "PyTorch", "NumPy", "Qiskit", "LaTeX", "Markdown"]) {
    assert.match(html, new RegExp(`>${skill}<`, "i"));
  }
  assert.match(html, />Skills<\/h2>/);
  assert.doesNotMatch(html, />Tools<\/h2>/);
  assert.equal((html.match(/class="skill-item"/g) ?? []).length, 10);
  assert.match(html, /grew up in Seattle, Beijing, and Taipei/i);
  assert.match(html, /competitive mathematics and programming/i);
  assert.match(html, /basketball has been a constant in my life/i);
  assert.match(html, /building custom mechanical keyboards/i);
  assert.match(html, /algorithmic and quantitative trading/i);
  assert.match(html, /class="about-copy"/i);
  assert.doesNotMatch(
    html,
    /Selected distinctions|>Quick facts<|Selected study areas|Methods &amp; tools|Learning the field is part of the work|>Current interests<|>Education</i,
  );
  assert.match(html, /Based in/i);
  assert.match(html, /Languages/i);
  assert.match(html, /Current home/i);
});

test("uses one shared intro treatment across public HTML pages", async () => {
  for (const pathname of ["/", "/work", "/about", "/404"]) {
    const html = await exportedHtml(pathname);
    assert.equal(
      (html.match(/<header class="page-intro">/g) ?? []).length,
      1,
      pathname,
    );
  }
});

test("does not export hidden or removed routes", async () => {
  for (const pathname of [
    "/notes",
    "/cv",
    "/missing",
    "/work/polarization-tracking",
    "/work/optical-native-computing",
    "/work/pypcl",
    "/work/deliberate-occlusion",
  ]) {
    await assertRouteNotExported(pathname);
  }
});

test("exports a restrained text-only 404 page", async () => {
  const html = await exportedHtml("/404");

  assert.match(html, /<h1>Page not found\.<\/h1>/i);
  assert.match(html, /The page may have moved or may not be public\./i);
  assert.match(
    html,
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex, nofollow")[^>]*>/i,
  );
  assert.match(
    html,
    /<a(?=[^>]*class="text-link")(?=[^>]*href="\/")[^>]*>Return home<\/a>/i,
  );
  assert.doesNotMatch(html, /button-link|not in the notebook/i);
});

test("includes the verified FIO LS 2026 conference paper PDF", async () => {
  const pdf = await readFile(
    new URL("papers/real-time-polarization-stabilization.pdf", exportRoot),
  );
  assert.equal(pdf.subarray(0, 4).toString("ascii"), "%PDF");
});

test("exports the vendored social and theme icons", async () => {
  for (const icon of ["github", "linkedin", "google-scholar", "moon", "sun"]) {
    const svg = await readFile(
      new URL(`icons/${icon}.svg`, exportRoot),
      "utf8",
    );
    assert.match(svg, /^<svg\b/i, icon);
  }
});

test("defines a complete dark color theme", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /--paper:\s*#1d1e20/i);
  assert.match(css, /--body-text:\s*#c4c4c5/i);
  assert.match(css, /\.theme-toggle-moon/);
  assert.match(css, /\.theme-toggle-sun/);
});

test("uses a wider navigation bar with a responsive gutter wordmark", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(
    css,
    /\.site-header\s*\{[^}]*width:\s*min\(100%,\s*920px\)[^}]*\}/s,
  );
  assert.doesNotMatch(
    css,
    /\.site-header\s*\{[^}]*position:\s*sticky/s,
  );
  assert.match(
    css,
    /\.floating-wordmark\s*\{[^}]*position:\s*fixed;[^}]*top:\s*16px;[^}]*right:\s*calc\(50%\s*\+\s*400px\)/s,
  );
  assert.match(
    css,
    /@media\s*\(max-width:\s*1099px\)\s*\{[^}]*\.floating-wordmark\s*\{[^}]*display:\s*none;/s,
  );
});

test("uses the same work-entry typography on Home and Work", async () => {
  const homeHtml = await exportedHtml("/");
  const workHtml = await exportedHtml("/work");
  assert.equal((homeHtml.match(/class="work-entry"/g) ?? []).length, 2);
  assert.equal((workHtml.match(/class="work-entry"/g) ?? []).length, 4);

  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /--font-size-entry-title:\s*1\.15rem/);
  assert.match(css, /--font-weight-entry:\s*600/);
});

test("includes the approved public résumé PDF", async () => {
  const pdf = await readFile(
    new URL("tim-chao-resume.pdf", exportRoot),
  );
  assert.equal(pdf.subarray(0, 4).toString("ascii"), "%PDF");
});

test("exports crawlable robots and a sitemap without project pages", async () => {
  const robots = await readFile(new URL("robots.txt", exportRoot), "utf8");
  assert.match(robots, /Allow: \/$/m);
  assert.doesNotMatch(robots, /Disallow: \/(?:notes|cv)/);
  assert.match(robots, /Sitemap: https:\/\/chaotyc\.github\.io\/sitemap\.xml/i);

  const sitemap = await readFile(new URL("sitemap.xml", exportRoot), "utf8");
  assert.match(sitemap, /<loc>https:\/\/chaotyc\.github\.io\/work\/<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/cv<\/loc>/i);
  assert.doesNotMatch(
    sitemap,
    /<loc>https:\/\/chaotyc\.github\.io\/work\/[^<]+<\/loc>/i,
  );
});
