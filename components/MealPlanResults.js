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
          <h2 className="panel-heading panel-title-mobile">Morgan is building your week…</h2>
          <div className="stack-gap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 56 }} />
            ))}
          </div>
        </>
      ) : !plan ? (
        <>
          <h2 className="panel-heading panel-title-mobile">Your meal plan will appear here</h2>
          <p className="muted-text">
            Fill in your goals on the left and hit generate. Morgan handles the rest.
          </p>
          <div className="stack-gap">
            <div className="placeholder-card">🌅 Breakfast, lunch, dinner, and snacks</div>
            <div className="placeholder-card">🧰 Prep tips for each day</div>
            <div className="placeholder-card">🛒 Shopping list grouped by category</div>
            <div className="placeholder-card">🎯 Meals tailored to your goal and budget</div>
          </div>
        </>
      ) : (
        <>
          <div className="header-row">
            <div>
              <h2 className="panel-heading panel-title-mobile">
                {plan.title || "Your Meal Plan"}
              </h2>
              {plan.summary ? <p className="muted-text">{plan.summary}</p> : null}
            </div>

            <div className="action-row">
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

          {savedMessage ? <p className="success-text">{savedMessage}</p> : null}

          <div className="stack-gap">
            {plan.days?.map((day, idx) => (
              <div
                key={day.day}
                className="day-card-surface day-card-enter"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="day-header">
                  <h3 className="day-title">Day {day.day}</h3>
                  <span className="day-badge">Ready</span>
                </div>
                <p className="meal-line">
                  <strong>Breakfast:</strong> {day.breakfast}
                </p>
                <p className="meal-line">
                  <strong>Lunch:</strong> {day.lunch}
                </p>
                <p className="meal-line">
                  <strong>Dinner:</strong> {day.dinner}
                </p>
                <p className="meal-line">
                  <strong>Snacks:</strong> {day.snacks?.join(", ")}
                </p>
                {day.prep_tip ? (
                  <p className="prep-tip-box">
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
