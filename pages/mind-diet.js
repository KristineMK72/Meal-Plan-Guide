import AppShell from "../components/AppShell";

export default function MindDiet() {
  return (
    <AppShell>
      <section className="glass-dark animate-in" style={{ padding: 24, marginBottom: 28 }}>
        <div className="page-eyebrow" style={{ color: "#c4b5fd" }}>
          Brain health
        </div>
        <h1 className="hero-title-mobile" style={{ margin: "0 0 10px", color: "#f8fafc", fontSize: 36 }}>
          Nourish your mind
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6, maxWidth: 640 }}>
          An anti-inflammatory approach designed to support cognitive function and mood.
        </p>
      </section>

      <section className="glass-panel animate-in animate-in-delay-1" style={{ marginBottom: 20 }}>
        <h2 className="section-heading" style={{ marginTop: 0, textAlign: "left", border: "none", padding: 0 }}>
          The gut–brain axis
        </h2>
        <p className="page-sub" style={{ marginBottom: 0 }}>
          Your gut and brain talk constantly. A diverse microbiome helps produce neurotransmitters
          and lower systemic inflammation — which supports clearer thinking and steadier mood.
        </p>
      </section>

      <section className="glass-panel animate-in animate-in-delay-2" style={{ marginBottom: 20 }}>
        <h2 className="section-heading" style={{ marginTop: 0, textAlign: "left", border: "none", padding: 0 }}>
          MIND diet principles
        </h2>
        <p className="page-sub">
          The <strong>MIND</strong> diet blends Mediterranean and DASH eating patterns with a focus
          on foods linked to brain health.
        </p>

        <div className="two-col-grid" style={{ marginTop: 20 }}>
          <div className="day-card-surface">
            <h3 style={{ color: "#16a34a", marginTop: 0 }}>✅ Embrace</h3>
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
              <li>
                <strong>Leafy greens</strong> — daily
              </li>
              <li>
                <strong>Berries</strong> — at least twice a week
              </li>
              <li>
                <strong>Nuts</strong> — daily
              </li>
              <li>
                <strong>Olive oil</strong> — primary cooking fat
              </li>
              <li>
                <strong>Oily fish</strong> — weekly
              </li>
              <li>
                <strong>Poultry</strong> — a couple times a week
              </li>
            </ul>
          </div>
          <div className="day-card-surface">
            <h3 style={{ color: "#ef4444", marginTop: 0 }}>❌ Limit</h3>
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
              <li>
                <strong>Red meat</strong> — under 4 servings/week
              </li>
              <li>
                <strong>Butter / margarine</strong> — under 1 tbsp/day
              </li>
              <li>
                <strong>Cheese</strong> — under 1 serving/week
              </li>
              <li>
                <strong>Sweets</strong> — under 5 servings/week
              </li>
              <li>
                <strong>Fried / fast food</strong> — under 1 serving/week
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-panel animate-in animate-in-delay-3">
        <h2 className="section-heading section-heading--purple" style={{ marginTop: 0, textAlign: "left", border: "none", padding: 0 }}>
          Sample MIND day
        </h2>
        <div className="day-card-surface">
          <p>
            <strong>Breakfast:</strong> Oatmeal with mixed berries and walnuts
          </p>
          <p>
            <strong>Lunch:</strong> Spinach salad with chicken, olive oil, almonds
          </p>
          <p>
            <strong>Dinner:</strong> Baked salmon, broccoli, brown rice
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Snack:</strong> Apple + a handful of mixed nuts
          </p>
        </div>
        <p className="page-sub" style={{ marginTop: 16, marginBottom: 0, fontSize: 13 }}>
          For cognitive support ideas only. Talk with a clinician or dietitian before major diet
          changes.
        </p>
      </section>
    </AppShell>
  );
}
