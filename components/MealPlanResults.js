export default function MealPlanResults({ plan, onSave, savedMessage }) {
  return (
    <section style={styles.panel}>
      {!plan ? (
        <>
          <h2 style={styles.title}>Your meal plan will appear here</h2>
          <div style={styles.placeholderWrap}>
            <div style={styles.placeholder}>Breakfast, lunch, dinner, and snacks</div>
            <div style={styles.placeholder}>Prep tips for each day</div>
            <div style={styles.placeholder}>A shopping list grouped by category</div>
            <div style={styles.placeholder}>Meals tailored to your goal and budget</div>
          </div>
        </>
      ) : (
        <>
          <div style={styles.headerRow}>
            <div>
              <h2 style={styles.title}>{plan.title || "Your Meal Plan"}</h2>
              {plan.summary ? <p style={styles.summary}>{plan.summary}</p> : null}
            </div>

            <button type="button" onClick={onSave} style={styles.saveBtn}>
              Save Plan
            </button>
          </div>

          {savedMessage ? <p style={styles.saved}>{savedMessage}</p> : null}

          <div style={styles.daysWrap}>
            {plan.days?.map((day) => (
              <div key={day.day} style={styles.dayCard}>
                <h3 style={styles.dayTitle}>Day {day.day}</h3>
                <p style={styles.row}><strong>Breakfast:</strong> {day.breakfast}</p>
                <p style={styles.row}><strong>Lunch:</strong> {day.lunch}</p>
                <p style={styles.row}><strong>Dinner:</strong> {day.dinner}</p>
                <p style={styles.row}><strong>Snacks:</strong> {day.snacks?.join(", ")}</p>
                <p style={styles.row}><strong>Prep tip:</strong> {day.prep_tip}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  panel: {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: 28,
  padding: 22,
  boxShadow: "0 18px 50px rgba(15, 23, 42, 0.08)",
},
  title: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 28,
    color: "#0f172a",
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
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "start",
    marginBottom: 12,
  },
  saveBtn: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
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
  dayTitle: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 20,
    color: "#0f172a",
  },
  row: {
    margin: "8px 0",
    color: "#334155",
  },
};
