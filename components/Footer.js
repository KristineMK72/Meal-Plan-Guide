// /components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <Link href="/">Plan</Link>
        <Link href="/meal-plan">Meals</Link>
        <Link href="/shoplist">Shop</Link>
        <Link href="/mind-diet">Mind</Link>
        <Link href="/sustainability">Sustainability</Link>
      </div>
      <p style={{ margin: "0 0 6px" }}>
        <strong>Morgan</strong> — meal plans that fit real life
      </p>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Powered by Resilience. For inspiration only — not medical advice.
      </p>
    </footer>
  );
}
