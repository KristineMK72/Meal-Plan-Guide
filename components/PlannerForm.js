function Field({ label, children }) {
  return (
    <div>
      <label className="field-label">{label}</label>
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
      <h2 className="panel-heading panel-title-mobile">Plan your meals</h2>

      <div className="preset-wrap">
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

      <form onSubmit={onSubmit} className="planner-form">
        <Field label="Goal">
          <input
            className="field-input"
            name="goal"
            value={form.goal}
            onChange={updateField}
            placeholder="fat loss, low-carb, family dinners..."
          />
        </Field>

        <div className="form-two-col">
          <Field label="Days">
            <input
              className="field-input"
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
              className="field-input"
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
              className="field-input"
              name="calories"
              value={form.calories}
              onChange={updateField}
              placeholder="1800"
            />
          </Field>

          <Field label="Protein target">
            <input
              className="field-input"
              name="protein"
              value={form.protein}
              onChange={updateField}
              placeholder="140g"
            />
          </Field>
        </div>

        <Field label="Budget">
          <input
            className="field-input"
            name="budget"
            value={form.budget}
            onChange={updateField}
            placeholder="$80/week"
          />
        </Field>

        <Field label="Dislikes">
          <input
            className="field-input"
            name="dislikes"
            value={form.dislikes}
            onChange={updateField}
            placeholder="mushrooms, olives, tuna..."
          />
        </Field>

        <Field label="Allergies / restrictions">
          <input
            className="field-input"
            name="allergies"
            value={form.allergies}
            onChange={updateField}
            placeholder="dairy-free, gluten-free, peanut allergy..."
          />
        </Field>

        <Field label="Pantry ingredients you already have">
          <textarea
            className="field-input field-textarea"
            name="pantry"
            value={form.pantry}
            onChange={updateField}
            placeholder="rice, eggs, chicken breast, oats, olive oil..."
          />
        </Field>

        <Field label="Extra notes">
          <textarea
            className="field-input field-textarea"
            name="notes"
            value={form.notes}
            onChange={updateField}
            placeholder="quick lunches, easy prep, picky eaters..."
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="action-btn action-btn-primary submit-full"
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

        {error ? <p className="form-error">{error}</p> : null}

        <p className="form-note">
          For planning and inspiration only. Not medical or nutrition advice.
        </p>
      </form>
    </section>
  );
}
