import React, { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    goal: "high-protein low-carb",
    days: 7,
    calories: "",
    protein: "",
    dislikes: "",
    allergies: "",
    budget: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function generatePlan(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/meal-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
      <h1>AI Meal Plan Guide</h1>
      <p>
        Build a personalized high-protein meal plan with OpenAI.
      </p>

      <form onSubmit={generatePlan} style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        <input name="goal" value={form.goal} onChange={updateField} placeholder="Goal" />
        <input name="days" type="number" value={form.days} onChange={updateField} placeholder="Days" />
        <input name="calories" value={form.calories} onChange={updateField} placeholder="Calories target" />
        <input name="protein" value={form.protein} onChange={updateField} placeholder="Protein target" />
        <input name="dislikes" value={form.dislikes} onChange={updateField} placeholder="Dislikes" />
        <input name="allergies" value={form.allergies} onChange={updateField} placeholder="Allergies" />
        <input name="budget" value={form.budget} onChange={updateField} placeholder="Budget" />
        <textarea name="notes" value={form.notes} onChange={updateField} placeholder="Extra notes" rows={4} />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate AI Meal Plan"}
        </button>
      </form>

      {error && (
        <p style={{ color: "crimson", marginTop: "1rem" }}>
          {error}
        </p>
      )}

      {plan && (
        <section style={{ marginTop: "2rem" }}>
          <h2>{plan.title}</h2>
          <p>{plan.summary}</p>

          {plan.days?.map((day) => (
            <div
              key={day.day}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <h3>Day {day.day}</h3>
              <p><strong>Breakfast:</strong> {day.breakfast}</p>
              <p><strong>Lunch:</strong> {day.lunch}</p>
              <p><strong>Dinner:</strong> {day.dinner}</p>
              <p><strong>Snacks:</strong> {day.snacks?.join(", ")}</p>

              {day.estimated_macros && (
                <p>
                  <strong>Estimated Macros:</strong>{" "}
                  {day.estimated_macros.calories} calories ·{" "}
                  {day.estimated_macros.protein} protein ·{" "}
                  {day.estimated_macros.carbs} carbs ·{" "}
                  {day.estimated_macros.fat} fat
                </p>
              )}
            </div>
          ))}

          {plan.shopping_list && (
            <div style={{ marginTop: "2rem" }}>
              <h2>Shopping List</h2>

              <h4>Proteins</h4>
              <ul>{plan.shopping_list.proteins?.map((item, i) => <li key={i}>{item}</li>)}</ul>

              <h4>Vegetables</h4>
              <ul>{plan.shopping_list.vegetables?.map((item, i) => <li key={i}>{item}</li>)}</ul>

              <h4>Fruits</h4>
              <ul>{plan.shopping_list.fruits?.map((item, i) => <li key={i}>{item}</li>)}</ul>

              <h4>Pantry</h4>
              <ul>{plan.shopping_list.pantry?.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
          )}

          {plan.prep_tips && (
            <div style={{ marginTop: "2rem" }}>
              <h2>Prep Tips</h2>
              <ul>{plan.prep_tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
