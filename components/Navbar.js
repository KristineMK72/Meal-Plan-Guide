// /components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <div style={styles.logoMark}>M</div>
        <span style={styles.logoText}>Morgan</span>
      </div>

      <div style={styles.links}>
        <Link href="/" style={styles.link}>Plan</Link>
        <Link href="/meal-plan" style={styles.link}>Meals</Link>
        <Link href="/shoplist" style={styles.link}>Shop</Link>
        <Link href="/mind-diet" style={styles.link}>Mind</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    marginBottom: 24,

    // ✨ GLASS LOOK
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,

    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

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
  },

  logoText: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.02em",
  },

  links: {
    display: "flex",
    gap: 18,
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: 10,
    transition: "all 0.2s ease",
  },
};
