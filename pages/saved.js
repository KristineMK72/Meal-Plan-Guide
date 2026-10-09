import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "../components/AppShell";

export default function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("savedMealPlans") || "[]");
      setPlans(existing);
    } catch {
      setPlans([]);
    }
    setLoaded(true);
  }, []);

  function persist(next) {
    setPlans(next);
    localStorage.setItem("savedMealPlans", JSON.stringify(next));
  }

  function deletePlan(id) {
    if (!confirm("Delete this saved plan?")) return;
    persist(plans.filter((p) => p.id !== id));
    if (expanded === id) setExpanded(null);
  }

  function clearAll() {
    if (!confirm("Delete all saved plans?")) return;
    persist([]);
    setExpanded(null);
  }

  async function copyPlan(entry) {
    const plan = entry.plan;
    if (!plan?.days) return;

    const lines = [
      plan.title || "Saved Meal Plan",
      plan.summary || "",
      `Saved: ${new Date(entry.createdAt).toLocaleString()}`,
      "",
      ...plan.days.flatMap((day) => [
        `Day ${day.day}`,
        `Breakfast: ${day.breakfast}`,
        `Lunch: ${day.lunch}`,
        `Dinner: ${day.dinner}`,
        `Snacks: ${(day.snacks || []).join(", ")}`,
        day.prep_tip ? `Prep tip: ${day.prep_tip}` : "",
        "",
      ]),
    ];

    try {
      await navigator.clipboard.writeText(lines.filter(Boolean).join("\n"));
      alert("Plan copied to clipboard.");
    } catch {
      alert("Could not copy plan.");
    }
  }

  return (
    <AppShell>
      <section className="glass-panel animate-in" style={{ marginBottom: 24 }}>
        <div className="header-row">
          <div>
            <div className="page-eyebrow">Your library</div>
            <h1 className="page-title panel-title-mobile" style={{ margin: "0 0 8px" }}>
              Saved plans
            </h1>
            <p className="page-sub" style={{ margin: 0 }}>
              Plans stay on this device. Open one, copy it, or clear space when you’re ready.
            </p>
          </div>
          {plans.length > 0 ? (
            <button type="button" className="action-btn" onClick={clearAll}>
              Clear all
            </button>
          ) : null}
        </div>
      </section>

      {!loaded ? (
        <div className="glass-panel">
          <div className="skeleton" style={{ height: 80, marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 80 }} />
        </div>
      ) : plans.length === 0 ? (
        <section className="glass-panel animate-in">
          <h2 className="panel-title-mobile" style={{ marginTop: 0 }}>
            Nothing saved yet
          </h2>
          <p className="page-sub">
            Generate a plan on the home page and hit <strong>Save</strong>. Morgan keeps it here for
            next time.
          </p>
          <Link href="/" className="action-btn action-btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
            Build a plan ✨
          </Link>
        </section>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {plans.map((entry, idx) => {
            const plan = entry.plan || {};
            const isOpen = expanded === entry.id;
            return (
              <article
                key={entry.id}
                className="glass-panel animate-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="header-row">
                  <div>
                    <h2 className="panel-title-mobile" style={{ margin: "0 0 6px", fontSize: 22 }}>
                      {plan.title || "Untitled plan"}
                    </h2>
                    <p className="page-sub" style={{ margin: 0, fontSize: 14 }}>
                      {new Date(entry.createdAt).toLocaleString()}
                      {entry.form?.goal ? ` · ${entry.form.goal}` : ""}
                      {entry.form?.days ? ` · ${entry.form.days} days` : ""}
                    </p>
                    {plan.summary ? (
                      <p style={{ margin: "10px 0 0", color: "var(--text-muted)" }}>
                        {plan.summary}
                      </p>
                    ) : null}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => setExpanded(isOpen ? null : entry.id)}
                    >
                      {isOpen ? "Hide" : "View"}
                    </button>
                    <button type="button" className="action-btn" onClick={() => copyPlan(entry)}>
                      Copy
                    </button>
                    <button type="button" className="action-btn" onClick={() => deletePlan(entry.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                {isOpen && plan.days ? (
                  <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                    {plan.days.map((day) => (
                      <div key={day.day} className="day-card-surface">
                        <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>Day {day.day}</h3>
                        <p style={mealLine}>
                          <strong>Breakfast:</strong> {day.breakfast}
                        </p>
                        <p style={mealLine}>
                          <strong>Lunch:</strong> {day.lunch}
                        </p>
                        <p style={mealLine}>
                          <strong>Dinner:</strong> {day.dinner}
                        </p>
                        {day.snacks?.length ? (
                          <p style={mealLine}>
                            <strong>Snacks:</strong> {day.snacks.join(", ")}
                          </p>
                        ) : null}
                        {day.prep_tip ? (
                          <p className="prep-tip-box">
                            <strong>Prep tip:</strong> {day.prep_tip}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

const mealLine = { margin: "6px 0", color: "var(--text-body)" };
