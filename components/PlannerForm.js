function Field({ label, children }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function PlannerForm({
  form,
  presets,
  loading,
  error,
  updateField,
  applyPreset,
  onSubmit,
}) {
  return (
    <section className="glass-panel animate-in">
      <h2 style={styles.panelTitle} className="panel-title-mobile">
        Plan your meals
      </h2>

      <div style={styles.presetWrap}>
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => applyPreset(preset)}
            className={`preset-btn${form.goal === preset ? " active" : ""}`}
          >
            {preset}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} style={styles.form}>
        <Field label="Goal">
          <input
            style={styles.input}
            name="goal"
            value={form.goal}
            onChange={updateField}
            placeholder="fat loss, low-carb, family dinners..."
          />
        </Field>

        <div className="form-two-col">
          <Field label="Days">
            <input
              style={styles.input}
              name="days"
              type="number"
              min="1"
              max="14"
              value={form.days}
              onChange={updateField}
            />
          </Field>

          <Field label="Household size">
            <input
              style={styles.input}
              name="household"
              value={form.household}
              onChange={updateField}
              placeholder="1"
            />
          </Field>
        </div>

        <div className="form-two-col">
          <Field label="Calories target">
            <input
              style={styles.input}
              name="calories"
              value={form.calories}
              onChange={updateField}
              placeholder="1800"
            />
          </Field>

          <Field label="Protein target">
            <input
              style={styles.input}
              name="protein"
              value={form.protein}
              onChange={updateField}
              placeholder="140g"
            />
          </Field>
        </div>

        <Field label="Budget">
          <input
            style={styles.input}
            name="budget"
            value={form.budget}
            onChange={updateField}
            placeholder="$80/week"
          />
        </Field>

        <Field label="Dislikes">
          <input
            style={styles.input}
            name="dislikes"
            value={form.dislikes}
            onChange={updateField}
            placeholder="mushrooms, olives, tuna..."
          />
        </Field>

        <Field label="Allergies / restrictions">
          <input
            style={styles.input}
            name="allergies"
            value={form.allergies}
            onChange={updateField}
            placeholder="dairy-free, gluten-free, peanut allergy..."
          />
        </Field>

        <Field label="Pantry ingredients you already have">
          <textarea
            style={styles.textarea}
            name="pantry"
            value={form.pantry}
            onChange={updateField}
            placeholder="rice, eggs, chicken breast, oats, olive oil..."
          />
        </Field>

        <Field label="Extra notes">
          <textarea
            style={styles.textarea}
            name="notes"
            value={form.notes}
            onChange={updateField}
            placeholder="quick lunches, easy prep, picky eaters..."
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="action-btn action-btn-primary"
          style={styles.submitBtn}
        >
          {loading ? (
            <>
              <span className="loading-spinner" aria-hidden="true" />
              Morgan is cooking up your plan…
            </>
          ) : (
            "Generate meal + shopping plan ✨"
          )}
        </button>

        {error ? <p style={styles.error}>{error}</p> : null}

        <p style={styles.note}>
          For planning and inspiration only. Not medical or nutrition advice.
        </p>
      </form>
    </section>
  );
}

const styles = {
  panelTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 28,
    color: "#0f172a",
  },
  presetWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  form: {
    display: "grid",
    gap: 14,
  },
  label: {
    display: "block",
    fontWeight: 700,
    marginBottom: 8,
    fontSize: 14,
    color: "#334155",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
    minHeight: 92,
    resize: "vertical",
  },
  submitBtn: {
    width: "100%",
    padding: "14px 18px",
    fontSize: 16,
    borderRadius: 16,
  },
  error: {
    margin: 0,
    color: "#b91c1c",
    fontWeight: 600,
  },
  note: {
    margin: 0,
    fontSize: 13,
    color: "#64748b",
  },
};
