import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    goal: "high-protein fat loss",
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

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function generate(e) {
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
        body: JSON.stringify({
          ...form,
          days: Number(form.days),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
        <textarea name="notes" value={form.notes} onChange={update} placeholder="Extra notes" />
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {plan && (
        <div style={styles.results}>
          <h2>{plan.title}</h2>

          {plan.days?.map((d) => (
            <div key={d.day} style={styles.card}>
              <h3>Day {d.day}</h3>
              <p><strong>Breakfast:</strong> {d.breakfast}</p>
              <p><strong>Lunch:</strong> {d.lunch}</p>
              <p><strong>Dinner:</strong> {d.dinner}</p>
              <p><strong>Snacks:</strong> {d.snacks?.join(", ")}</p>
              <p><strong>Prep Tip:</strong> {d.prep_tip}</p>
            </div>
          ))}

          <h2>🛒 Shopping List</h2>

          {Object.entries(plan.shopping_list || {}).map(([key, items]) => (
            <div key={key}>
              <h4>{key}</h4>
              <ul>
                {items.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const styles = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial",
  },
  title: {
    fontSize: 36,
    marginBottom: 5,
  },
  subtitle: {
    color: "#555",
    marginBottom: 20,
  },
  form: {
    display: "grid",
    gap: 10,
    marginBottom: 30,
  },
  results: {
    marginTop: 20,
  },
  card: {
    border: "1px solid #ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
};
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Meal Plan"}
      <h1 style={styles.title}>🥗 AI Meal Planner</h1>
        <input name="allergies" value={form.allergies} onChange={update} placeholder="Allergies" />
        <input name="budget" value={form.budget} onChange={update} placeholder="Budget" />
      <p style={styles.subtitle}>
        <input name="protein" value={form.protein} onChange={update} placeholder="Protein target" />
        <input name="dislikes" value={form.dislikes} onChange={update} placeholder="Dislikes" />
        Build a personalized meal plan in seconds
      </p>
        <input name="calories" value={form.calories} onChange={update} placeholder="Calories target" />

      <form onSubmit={generate} style={styles.form}>
        <input name="goal" value={form.goal} onChange={update} placeholder="Goal (fat loss, muscle gain...)" />

