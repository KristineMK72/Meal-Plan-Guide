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

export default function Navbar({ theme = "light", onToggleTheme }) {
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
          <div className="navbar-logo-mark">M</div>
          <span className="navbar-logo-text">Morgan</span>
        </Link>

        <div className="navbar-top-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

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
      </div>
    </nav>
  );
}
