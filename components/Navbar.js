// /components/Navbar.js
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <div style={styles.logoMark}>M</div>
          <span style={styles.logoText}>Morgan</span>
        </div>

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

      <div className={`navbar-links${open ? " open" : ""}`}>
        <Link href="/" className="navbar-link" onClick={() => setOpen(false)}>
          Plan
        </Link>
        <Link href="/meal-plan" className="navbar-link" onClick={() => setOpen(false)}>
          Meals
        </Link>
        <Link href="/shoplist" className="navbar-link" onClick={() => setOpen(false)}>
          Shop
        </Link>
        <Link href="/mind-diet" className="navbar-link" onClick={() => setOpen(false)}>
          Mind
        </Link>
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
};
