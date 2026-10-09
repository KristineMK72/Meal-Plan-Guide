export default function MealPlanResults({ plan, onSave, savedMessage, loading }) {
  async function copyPlan() {
    if (!plan?.days) return;

    const lines = [
      plan.title || "Your Meal Plan",
      plan.summary || "",
      "",
      ...plan.days.flatMap((day) => [
        `Day ${day.day}`,
        `Breakfast: ${day.breakfast}`,
        `Lunch: ${day.lunch}`,
        `Dinner: ${day.dinner}`,
        `Snacks: ${(day.snacks || []).join(", ")}`,
        `Prep tip: ${day.prep_tip || ""}`,
        "",
      ]),
    ];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      alert("Meal plan copied to clipboard.");
    } catch {
      alert("Could not copy meal plan.");
    }
  }

  function printPlan() {
    window.print();
  }

  return (
    <section className="glass-panel animate-in animate-in-delay-1" id="meal-results">
      {loading ? (
        <>
          <h2 style={styles.title} className="panel-title-mobile">
            Morgan is building your week…
          </h2>
          <div style={styles.placeholderWrap}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 56 }} />
            ))}
          </div>
        </>
      ) : !plan ? (
        <>
          <h2 style={styles.title} className="panel-title-mobile">
            Your meal plan will appear here
          </h2>
          <p style={styles.emptyLead}>
            Fill in your goals on the left and hit generate. Morgan handles the rest.
          </p>
          <div style={styles.placeholderWrap}>
            <div style={styles.placeholder}>🌅 Breakfast, lunch, dinner, and snacks</div>
            <div style={styles.placeholder}>🧰 Prep tips for each day</div>
            <div style={styles.placeholder}>🛒 Shopping list grouped by category</div>
            <div style={styles.placeholder}>🎯 Meals tailored to your goal and budget</div>
          </div>
        </>
      ) : (
        <>
          <div className="header-row">
            <div>
              <h2 style={styles.title} className="panel-title-mobile">
                {plan.title || "Your Meal Plan"}
              </h2>
              {plan.summary ? <p style={styles.summary}>{plan.summary}</p> : null}
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={onSave} className="action-btn">
                💾 Save
              </button>
              <button type="button" onClick={copyPlan} className="action-btn">
                📋 Copy
              </button>
              <button type="button" onClick={printPlan} className="action-btn">
                🖨️ Print
              </button>
            </div>
          </div>

          {savedMessage ? <p style={styles.saved}>{savedMessage}</p> : null}

          <div style={styles.daysWrap}>
            {plan.days?.map((day, idx) => (
              <div
                key={day.day}
                className="day-card-enter"
                style={{
                  ...styles.dayCard,
                  animationDelay: `${idx * 0.06}s`,
                }}
              >
                <div style={styles.dayHeader}>
                  <h3 style={styles.dayTitle}>Day {day.day}</h3>
                  <span style={styles.dayBadge}>Ready</span>
                </div>
                <p style={styles.row}>
                  <strong>Breakfast:</strong> {day.breakfast}
                </p>
                <p style={styles.row}>
                  <strong>Lunch:</strong> {day.lunch}
                </p>
                <p style={styles.row}>
                  <strong>Dinner:</strong> {day.dinner}
                </p>
                <p style={styles.row}>
                  <strong>Snacks:</strong> {day.snacks?.join(", ")}
                </p>
                {day.prep_tip ? (
                  <p style={styles.tip}>
                    <strong>Prep tip:</strong> {day.prep_tip}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  title: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 28,
    color: "#0f172a",
  },
  emptyLead: {
    marginTop: 0,
    color: "#64748b",
    lineHeight: 1.5,
  },
  summary: {
    marginTop: 0,
    color: "#475569",
  },
  placeholderWrap: {
    display: "grid",
    gap: 12,
  },
  placeholder: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 16,
    background: "#f8fafc",
    color: "#334155",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  saved: {
    color: "#15803d",
    fontWeight: 600,
    marginTop: 0,
  },
  daysWrap: {
    display: "grid",
    gap: 14,
  },
  dayCard: {
    border: "1px solid #dbeafe",
    borderRadius: 18,
    padding: 16,
    background: "#f8fbff",
  },
  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dayTitle: {
    margin: 0,
    fontSize: 20,
    color: "#0f172a",
  },
  dayBadge: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#15803d",
    background: "#dcfce7",
    padding: "4px 8px",
    borderRadius: 999,
  },
  row: {
    margin: "8px 0",
    color: "#334155",
  },
  tip: {
    margin: "10px 0 0",
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(14, 165, 233, 0.08)",
    color: "#0c4a6e",
  },
};
