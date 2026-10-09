// /components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Plan" },
  { href: "/meal-plan", label: "Meals" },
  { href: "/shoplist", label: "Shop" },
  { href: "/mind-diet", label: "Mind" },
  { href: "/saved", label: "Saved" },
];

export default function Navbar({ theme = "light", onToggleTheme, themeReady }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function isActive(href) {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  }

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-top">
        <Link href="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <div style={styles.logoMark}>M</div>
          <span style={styles.logoText}>Morgan</span>
        </Link>

        <div style={styles.topActions}>
          {themeReady ? (
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          ) : null}

          <button
            type="button"
            className="navbar-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`navbar-links${open ? " open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link${isActive(link.href) ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          className="theme-toggle theme-toggle-desktop"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
    boxShadow: "0 6px 16px rgba(14,165,233,0.4)",
    flexShrink: 0,
  },
  logoText: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  topActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
};
