"use client";

const themeStorageKey = "pref-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      accessKey="t"
      aria-label="Toggle color theme"
      title="Toggle color theme (Alt + T)"
    >
      <span className="theme-toggle-icon theme-toggle-moon" aria-hidden="true" />
      <span className="theme-toggle-icon theme-toggle-sun" aria-hidden="true" />
    </button>
  );
}
