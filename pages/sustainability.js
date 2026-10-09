import Link from "next/link";
import AppShell from "../components/AppShell";

export default function Sustainability() {
  return (
    <AppShell>
      <section className="glass-dark animate-in" style={{ padding: 24, marginBottom: 28 }}>
        <div className="page-eyebrow" style={{ color: "#86efac" }}>
          Bigger picture
        </div>
        <h1 className="hero-title-mobile" style={{ margin: "0 0 10px", color: "#f8fafc", fontSize: 36 }}>
          Health and the sustainability loop
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6, maxWidth: 640 }}>
          Personal well-being fuels community resilience and long-term economic stability.
        </p>
      </section>

      <section className="glass-panel animate-in" style={{ marginBottom: 16 }}>
        <h2 className="section-heading" style={{ marginTop: 0, textAlign: "left", border: "none", padding: 0 }}>
          Three pillars
        </h2>
        <p className="page-sub">
          Sustainability is often framed as environmental. Human health is the foundation that
          makes the rest possible.
        </p>
      </section>

      <div style={{ display: "grid", gap: 16 }}>
        <article className="glass-panel animate-in animate-in-delay-1">
          <h3 style={{ color: "var(--accent)", marginTop: 0 }}>1. Personal health</h3>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Nourishing food and mental wellness — like the ideas in the{" "}
            <Link href="/mind-diet">MIND diet</Link> — give people the energy and focus to show up
            for work, family, and community.
          </p>
        </article>

        <article className="glass-panel animate-in animate-in-delay-2">
          <h3 style={{ color: "#7c3aed", marginTop: 0 }}>2. Social sustainability</h3>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Healthier people ease strain on families and services, and are more able to volunteer,
            connect, and contribute. Chronic illness at scale weakens that fabric.
          </p>
        </article>

        <article className="glass-panel animate-in animate-in-delay-3">
          <h3 style={{ color: "#16a34a", marginTop: 0 }}>3. Economic sustainability</h3>
          <p className="page-sub">Healthier populations tend to mean:</p>
          <ul style={{ lineHeight: 1.7, color: "var(--text-body)" }}>
            <li>
              <strong>Higher productivity</strong> — fewer sick days, clearer focus
            </li>
            <li>
              <strong>Lower healthcare burden</strong> — fewer lifestyle-driven conditions
            </li>
            <li>
              <strong>Room for growth</strong> — stable communities innovate more easily
            </li>
          </ul>
        </article>
      </div>

      <div style={{ textAlign: "center", marginTop: 28 }}>
        <Link
          href="/mind-diet"
          className="action-btn action-btn-primary"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          See how diet supports brain health 🧠
        </Link>
      </div>
    </AppShell>
  );
}
