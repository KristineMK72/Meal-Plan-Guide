import { useState } from "react";

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontWeight: 600,
  marginBottom: 8,
};

export default function Home() {
  const [form, setForm] = useState({
    goal: "high-protein fat loss",
    days: 7,
    calories: "",
    protein: "",
    dislikes: "",
    allergies: "",
    budget: "",
    household: "1",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          days: Number(form.days) || 7,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.warning && data.raw) {
        throw new Error("The AI returned an unexpected format. Try again.");
      }

      setPlan(data);
    } catch (err) {
      setError(err.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7fbff 0%, #eef6ff 45%, #f8fafc 100%)",
        padding: "32px 16px 60px",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <section
          style={{
            ...card,
            padding: "28px",
            background:
              "linear-gradient(135deg, #ffffff 0%, #f0f7ff 60%, #e0f2fe 100%)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "#0369a1",
            }}
          >
            Meal Plan Guide + OpenAI
          </p>

          <h1 style={{ margin: "10px 0 12px", fontSize: 42, lineHeight: 1.05 }}>
            AI Meal Planner
          </h1>

          <p style={{ margin: 0, fontSize: 18, color: "#374151", maxWidth: 720 }}>
            Generate a personalized meal plan, daily meals, simple prep tips,
            and a grouped shopping list in seconds.
          </p>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1.35fr",
            gap: 22,
            marginTop: 22,
          }}
        >
          <section style={card}>
            <h2 style={{ marginTop: 0 }}>Tell the AI what you want</h2>

            <form onSubmit={generatePlan} style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={labelStyle}>Goal</label>
                <input
                  style={inputStyle}
                  name="goal"
                  value={form.goal}
                  onChange={updateField}
                  placeholder="high-protein, weight loss, family meals..."
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>Days</label>
                  <input
                    style={inputStyle}
                    name="days"
                    type="number"
                    min="1"
                    max="14"
                    value={form.days}
                    onChange={updateField}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Calories</label>
                  <input
                    style={inputStyle}
                    name="calories"
                    value={form.calories}
                    onChange={updateField}
                    placeholder="1800"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Protein</label>
                  <input
                    style={inputStyle}
                    name="protein"
                    value={form.protein}
                    onChange={updateField}
                    placeholder="140g"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Dislikes</label>
                <input
                  style={inputStyle}
                  name="dislikes"
                  value={form.dislikes}
                  onChange={updateField}
                  placeholder="mushrooms, tuna, olives..."
                />
              </div>

              <div>
                <label style={labelStyle}>Allergies / restrictions</label>
                <input
                  style={inputStyle}
                  name="allergies"
                  value={form.allergies}
                  onChange={updateField}
                  placeholder="gluten-free, dairy-free, peanut allergy..."
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>Budget</label>
                  <input
                    style={inputStyle}
                    name="budget"
                    value={form.budget}
                    onChange={updateField}
                    placeholder="$80/week"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Household size</label>
                  <input
                    style={inputStyle}
                    name="household"
                    value={form.household}
                    onChange={updateField}
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Extra notes</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                  name="notes"
                  value={form.notes}
                  onChange={updateField}
                  placeholder="cheap meals, fast lunches, gym-friendly snacks..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  background: loading
                    ? "#93c5fd"
                    : "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                  color: "#fff",
                }}
              >
                {loading ? "Generating your meal plan..." : "Generate AI Meal Plan"}
              </button>

              {error ? (
                <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>
              ) : null}

              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                For planning and inspiration only. Not medical or nutrition advice.
              </p>
            </form>
          </section>

          <section style={card}>
            {!plan ? (
              <div>
                <h2 style={{ marginTop: 0 }}>What you’ll get</h2>
                <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18 }}>
                  <li>Breakfast, lunch, dinner, and snack ideas for each day</li>
                  <li>Estimated daily macros</li>
                  <li>Prep tips that actually save time</li>
                  <li>A grouped shopping list</li>
                  <li>Plans tailored to your goals, dislikes, and budget</li>
                </ul>
              </div>
            ) : (
              <div>
                <h2 style={{ marginTop: 0 }}>{plan.title}</h2>
                <p style={{ color: "#4b5563" }}>{plan.summary}</p>

                <div style={{ display: "grid", gap: 14 }}>
                  {plan.days?.map((day) => (
                    <div
                      key={day.day}
                      style={{
                        border: "1px solid #dbeafe",
                        borderRadius: 14,
                        padding: 16,
                        background: "#f8fbff",
                      }}
                    >
                      <h3 style={{ marginTop: 0 }}>Day {day.day}</h3>
                      <p><strong>Breakfast:</strong> {day.breakfast}</p>
                      <p><strong>Lunch:</strong> {day.lunch}</p>
                      <p><strong>Dinner:</strong> {day.dinner}</p>
                      <p><strong>Snacks:</strong> {day.snacks?.join(", ")}</p>
                      <p>
                        <strong>Macros:</strong>{" "}
                        {day.estimated_macros?.calories} calories ·{" "}
                        {day.estimated_macros?.protein} protein ·{" "}
                        {day.estimated_macros?.carbs} carbs ·{" "}
                        {day.estimated_macros?.fat} fat
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        <strong>Prep tip:</strong> {day.prep_tip}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24 }}>
                  <h2>Shopping List</h2>

                  <ShoppingSection title="Proteins" items={plan.shopping_list?.proteins} />
                  <ShoppingSection title="Vegetables" items={plan.shopping_list?.vegetables} />
                  <ShoppingSection title="Fruits" items={plan.shopping_list?.fruits} />
                  <ShoppingSection
                    title="Grains & Starches"
                    items={plan.shopping_list?.grains_and_starches}
                  />
                  <ShoppingSection
                    title="Dairy / Alternatives"
                    items={plan.shopping_list?.dairy_or_alternatives}
                  />
                  <ShoppingSection title="Pantry" items={plan.shopping_list?.pantry} />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ShoppingSection({ title, items }) {
  if (!items?.length) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <ul style={{ marginTop: 0, paddingLeft: 18 }}>
        {items.map((item, i) => (
          <li key={`${title}-${i}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
