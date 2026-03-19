import { useState } from "react";
import AppShell from "../components/AppShell";
import PlannerForm from "../components/PlannerForm";
import MealPlanResults from "../components/MealPlanResults";
import ShoppingListCard from "../components/ShoppingListCard";

const presets = [
  "high-protein fat loss",
  "budget-friendly meals",
  "easy meal prep",
  "family dinners",
  "low-carb",
  "brain-friendly meals",
  "muscle gain",
];

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
    pantry: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function applyPreset(preset) {
    setForm((prev) => ({ ...prev, goal: preset }));
  }

  async function generatePlan(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);
    setSavedMessage("");

    try {
      const res = await fetch("/api/meal-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          days: Number(form.days) || 7,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate meal plan");
      }

      if (data.error && data.raw) {
        throw new Error("The AI returned an unexpected format. Please try again.");
      }

      setPlan(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function savePlan() {
    if (!plan) return;

    try {
      const existing = JSON.parse(localStorage.getItem("savedMealPlans") || "[]");
      const next = [
        {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          form,
          plan,
        },
        ...existing,
      ];
      localStorage.setItem("savedMealPlans", JSON.stringify(next));
      setSavedMessage("Plan saved on this device.");
    } catch {
      setSavedMessage("Could not save this plan.");
    }
  }

  return (
    <AppShell>
      <div style={styles.hero}>
        <div style={styles.badge}>Meal Planner App</div>
        <h1 style={styles.title}>AI Meal + Shopping Planner</h1>
        <p style={styles.subtitle}>
          Build a meal plan around your goals, budget, household, and pantry —
          then get a shopping list you can actually use.
        </p>
      </div>

      <div style={styles.grid}>
        <PlannerForm
          form={form}
          presets={presets}
          loading={loading}
          error={error}
          updateField={updateField}
          applyPreset={applyPreset}
          onSubmit={generatePlan}
        />

        <div style={styles.rightColumn}>
          <MealPlanResults plan={plan} onSave={savePlan} savedMessage={savedMessage} />
          <ShoppingListCard shoppingList={plan?.shopping_list} />
        </div>
      </div>
    </AppShell>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #ffffff 0%, #eef7ff 60%, #e8fff5 100%)",
    border: "1px solid #dbeafe",
    borderRadius: 24,
    padding: 28,
    marginBottom: 22,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  badge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0369a1",
    marginBottom: 10,
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: 42,
    lineHeight: 1.05,
    color: "#0f172a",
  },
  subtitle: {
    margin: 0,
    fontSize: 18,
    color: "#475569",
    maxWidth: 760,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.1fr",
    gap: 22,
  },
  rightColumn: {
    display: "grid",
    gap: 22,
  },
};
